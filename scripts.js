document.addEventListener("DOMContentLoaded", function () {
  const timeSlotSelect = document.getElementById("timeSlot");
  const selectedTimeSlotsSpan = document.getElementById("selectedTimeSlots");
  const totalChargesSpan = document.getElementById("totalCharges");
  const totalTicketsSpan = document.getElementById("totalTickets");
  const pricingList = document.getElementById("pricingList");
  const clearButton = document.getElementById("clearButton");
  const proceedButton = document.getElementById("proceedButton");

  const normalRates = {
    foreignerAdult: 10,
    foreignerChild: 5,
    slAdult: 4,
    slChild: 2,
    infant: 0
  };

  const peakRates = {
    foreignerAdult: 13,
    foreignerChild: 8,
    slAdult: 6,
    slChild: 3,
    infant: 0
  };

  // Populate time slot options
  const timeSlots = Array.from({ length: 12 }, (_, index) => index + 7); // 7 to 18 (1-hour slots)
  for (const slot of timeSlots) {
    const option = document.createElement("option");
    option.value = slot;
    option.textContent = getTimeSlotLabel(slot, isPeakHour(slot));
    timeSlotSelect.appendChild(option);
  }

  let selectedSlots = [];
  let ticketCounts = {
    foreignerAdult: 0,
    foreignerChild: 0,
    slAdult: 0,
    slChild: 0,
    infant: 0
  };

  // Load stored data from local storage if available
  const storedSlots = localStorage.getItem("selectedSlots");
  const storedTicketCounts = localStorage.getItem("ticketCounts");
  if (storedSlots) {
    selectedSlots = JSON.parse(storedSlots);
    ticketCounts = JSON.parse(storedTicketCounts);
    updateSelectedTimeSlotsDisplay(selectedSlots);
    calculateCharges(selectedSlots);
    updatePricingList(selectedSlots);
    updateTotalTickets(ticketCounts);
    updateSummaryTable();
  }

  // Add event listener to calculate charges when time slot is selected and update selected time slots display
  timeSlotSelect.addEventListener("change", function () {
    const selectedSlot = parseInt(timeSlotSelect.value);

    if (selectedSlot === 0) {
      selectedSlots = [];
      pricingList.innerHTML = "";
    } else {
      if (selectedSlots.includes(selectedSlot)) {
        selectedSlots = selectedSlots.filter(slot => slot !== selectedSlot);
      } else {
        const lastIndex = selectedSlots.length - 1;
        if (lastIndex >= 0 && selectedSlots[lastIndex] !== selectedSlot - 1) {
          alert("Please select consecutive time slots.");
          return;
        }
        selectedSlots.push(selectedSlot);
      }
    }

    updateSelectedTimeSlotsDisplay(selectedSlots);
    calculateCharges(selectedSlots);
    updatePricingList(selectedSlots);
    updateTotalTickets(ticketCounts);
    updateSummaryTable();
  });

  // Event listeners for increment and decrement buttons
  document.querySelectorAll(".control-button.increment").forEach(button => {
    button.addEventListener("click", function () {
      const category = this.closest(".ticket-category");
      const input = category.querySelector("input");
      const ticketType = input.id;
      updateTicketCount(input, 1, ticketType);
      updateSummaryTable();
    });
  });

  document.querySelectorAll(".control-button.decrement").forEach(button => {
    button.addEventListener("click", function () {
      const category = this.closest(".ticket-category");
      const input = category.querySelector("input");
      const ticketType = input.id;
      updateTicketCount(input, -1, ticketType);
      updateSummaryTable();
    });
  });

  // Clear button functionality
  clearButton.addEventListener("click", function () {
    selectedSlots = [];
    ticketCounts = {
      foreignerAdult: 0,
      foreignerChild: 0,
      slAdult: 0,
      slChild: 0,
      infant: 0
    };
    pricingList.innerHTML = "";
    totalTicketsSpan.textContent = "0";
    selectedTimeSlotsSpan.textContent = "None";
    totalChargesSpan.textContent = "0.00";
    updateSummaryTable();
    localStorage.removeItem("selectedSlots");
    localStorage.removeItem("ticketCounts");
    localStorage.removeItem("selectedDate"); // Clear selected date as well
  });

  // Proceed button functionality
  proceedButton.addEventListener("click", function () {
    if (!isFormValid()) {
      alert("Please fill in all the required fields.");
    } else {
      // Store additional summary data in local storage
      localStorage.setItem("summaryDate", localStorage.getItem("selectedDate"));
      localStorage.setItem("summarytableTimeSlots", selectedSlots.join(", "));
      localStorage.setItem("summaryTotalTickets", getTotalTicketCount(ticketCounts));
      localStorage.setItem("summaryTotalCharges", calculateTotalCharges(selectedSlots, ticketCounts));
      localStorage.setItem("summaryTicketCategories", getSelectedTicketCategories(ticketCounts).join(", "));
      localStorage.setItem("ticketTypes", JSON.stringify(getSelectedTicketTypes(ticketCounts)));



      // Redirect to details page
      window.location.href = "details.html"; // Replace with your actual details page URL
    }
  });

  function getTimeSlotLabel(slot, peak) {
    return `${peak ? "Peak " : ""}${slot}:00 - ${slot + 1}:00`;
  }

  function isPeakHour(slot) {
    return (slot >= 10 && slot < 13) || (slot >= 15 && slot < 18);
  }

  function calculateCharges(selectedSlots) {
    let totalCharges = 0;

    selectedSlots.forEach(slot => {
      totalCharges += calculateTotalCharges([slot], ticketCounts);
    });

    totalChargesSpan.textContent = totalCharges.toFixed(2);
  }

  function calculateTotalCharges(slots, counts) {
    let totalCharges = 0;

    slots.forEach(slot => {
      const isPeak = isPeakHour(slot);

      for (const ticketType in counts) {
        totalCharges += counts[ticketType] * (isPeak ? peakRates[ticketType] : normalRates[ticketType]);
      }
    });

    return totalCharges;
  }

  function updateSelectedTimeSlotsDisplay(selectedSlots) {
    if (selectedSlots.length === 0) {
      selectedTimeSlotsSpan.textContent = "None";
    } else {
      selectedTimeSlotsSpan.textContent = selectedSlots.map(slot => getTimeSlotLabel(slot, isPeakHour(slot))).join(", ");
    }
  }

  function updatePricingList(selectedSlots) {
    pricingList.innerHTML = "";

    selectedSlots.forEach(slot => {
      const isPeak = isPeakHour(slot);

      const pricingItem = document.createElement("li");
      pricingItem.innerHTML = `
        <p>${getTimeSlotLabel(slot, isPeak)}</p>
        <p>Foreigner Adult: $${isPeak ? peakRates.foreignerAdult : normalRates.foreignerAdult}</p>
        <p>Foreigner Child: $${isPeak ? peakRates.foreignerChild : normalRates.foreignerChild}</p>
        <p>SL Adult: $${isPeak ? peakRates.slAdult : normalRates.slAdult}</p>
        <p>SL Child: $${isPeak ? peakRates.slChild : normalRates.slChild}</p>
        <p>Infant: $${isPeak ? peakRates.infant : normalRates.infant}</p>
      `;

      pricingList.appendChild(pricingItem);
    });
  }

  function updateTicketCount(input, change, ticketType) {
    const currentValue = parseInt(input.value);
    const newValue = Math.max(currentValue + change, 0);

    input.value = newValue;
    ticketCounts[ticketType] = newValue;

    calculateCharges(selectedSlots);
    updateTotalTickets(ticketCounts);
  }

  function updateTotalTickets(ticketCounts) {
    let totalTickets = 0;
    for (const ticketType in ticketCounts) {
      totalTickets += ticketCounts[ticketType];
    }
    totalTicketsSpan.textContent = totalTickets;
  }

  function isFormValid() {
    if (localStorage.getItem("selectedDate") === null) {
      return false;
    }

    for (const ticketType in ticketCounts) {
      if (ticketCounts[ticketType] > 0) {
        return true;
      }
    }

    return false;
  }

  function updateSummaryTable() {
    const summaryDateElement = document.getElementById("summaryDate");
    const summarytableTimeSlotsElement = document.getElementById("summarytableTimeSlots");
    const summaryTicketCategoriesElement = document.getElementById("summaryTicketCategories");
    const summaryTotalTicketsElement = document.getElementById("summaryTotalTickets");
    const summaryTotalChargesElement = document.getElementById("summaryTotalCharges");
    const summaryTicketTypesElement = document.getElementById("summaryTicketTypes");
    

    summaryDateElement.textContent = localStorage.getItem("selectedDate") || "-";
    summarytableTimeSlotsElement.textContent = selectedSlots.length > 0 ? selectedSlots.map(slot => getTimeSlotLabel(slot, isPeakHour(slot))).join(", ") : "-";
    summaryTicketCategoriesElement.textContent = getSelectedTicketCategories(ticketCounts).join(", ");
    summaryTotalTicketsElement.textContent = getTotalTicketCount(ticketCounts) || "-";
    summaryTotalChargesElement.textContent = calculateTotalCharges(selectedSlots, ticketCounts).toFixed(2) || "-";
    summaryTicketTypesElement.textContent = getSelectedTicketTypes(ticketCounts).join(", ");
  }

  function getTotalTicketCount(ticketCounts) {
    let totalTickets = 0;
    for (const ticketType in ticketCounts) {
      totalTickets += ticketCounts[ticketType];
    }
    return totalTickets;
  }

  function getSelectedTicketCategories(ticketCounts) {
    const selectedCategories = [];
    for (const ticketType in ticketCounts) {
      if (ticketCounts[ticketType] > 0) {
        selectedCategories.push(getTicketCategoryLabel(ticketType)); 
      }
    }
    return selectedCategories;
  }
  
  function getTicketCategoryLabel(ticketType) {
    switch (ticketType) {
      case "foreignerAdult":
        return "Foreigner Adult";
      case "foreignerChild":
        return "Foreigner Child";
      case "slAdult":
        return "SL Adult";
      case "slChild":
        return "SL Child";
      case "infant":
        return "Infant";
      default:
        return "";
    }
  }
  
  
 
  
  
  
  
  
});








proceedButton.addEventListener("click", function () {
  if (!isFormValid()) {
    alert("Please fill in all the required fields.");
  } else {
    // Store summary data in local storage
    const ticketSummary = {
      selectedDate: localStorage.getItem("selectedDate"),
      selectedSlots: JSON.parse(localStorage.getItem("selectedSlots")),
      ticketCounts: JSON.parse(localStorage.getItem("ticketCounts")),
      totalTickets: getTotalTicketCount(ticketCounts),
      totalCharges: calculateTotalCharges(selectedSlots, ticketCounts),
      selectedCategories: getSelectedTicketCategories(ticketCounts),
      ticketTypes: getSelectedTicketTypes(ticketCounts)
    };
    
    localStorage.setItem("ticketSummary", JSON.stringify(ticketSummary));

    // Redirect to confirmation page
    window.location.href = "confirmation.html";
  }
});


