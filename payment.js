document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("payment-form");
    const payButton = document.getElementById("payButton");
    const payAmount = document.getElementById("payAmount");
    const expiryDateInput = document.getElementById("expiryDate");
    const cvcInput = document.getElementById("cvc");
    const nameOnCardInput = document.getElementById("nameOnCard");
    const cardNumberInput = document.getElementById("cardNumber");
    const summaryTotalChargesElement = document.getElementById("summaryTotalCharges");

    


    
    // Apply card number masking
    $(cardNumberInput).inputmask("9999-9999-9999-9999");

    // Apply expiry date masking
    $(expiryDateInput).inputmask("99/99");

    // Load summary table values from localStorage
    const storedTotalCharges = localStorage.getItem("summaryTotalCharges");
    const formattedTotalCharges = parseFloat(storedTotalCharges).toFixed(2);
    const summaryDate = localStorage.getItem("summaryDate");
    const summaryTime = localStorage.getItem("summaryTime");
    const summaryDuration = localStorage.getItem("summaryDuration");
    const summaryTickets = localStorage.getItem("summaryTickets");
    const summaryTotal = localStorage.getItem("summaryTotal");

    // Populate the summary table on the Payment page
    const summaryTable = document.querySelector(".summary-section");
    summaryTable.innerHTML = `
        <h2>Summary</h2>
        <table>
            <tr>
                <td>Date</td>
                <td>${summaryDate || "-"}</td>
            </tr>
            <tr>
                <td>Time</td>
                <td>${summaryTime || "-"}</td>
            </tr>
            <tr>
                <td>Duration</td>
                <td>${summaryDuration || "-"}</td>
            </tr>
            <tr>
                <td>Tickets</td>
                <td>${summaryTickets || "-"}</td>
            </tr>
            <tr>
                <td>Total Payable</td>
                <td>${summaryTotal || "-"}</td>
            </tr>
        </table>
    `;

    // Disable the Pay button if the summary table is empty
    //if (summaryTotal === null) {
      //  payButton.disabled = true;
    //}

    // Event listener to handle form input changes
    paymentForm.addEventListener("input", updatePayButtonState);

    // Update the Pay button state based on form validity
    function updatePayButtonState() {
        const isFormValid = paymentForm.checkValidity();
        payButton.disabled = !isFormValid;

        // Update the amount displayed on the Pay button
        const formattedAmount = parseFloat(payAmount.value).toFixed(2);
        payButton.textContent = `Pay $${formattedAmount}`;
    }



    
});





  // Load stored data from local storage if available
  const storedSelectedDate = localStorage.getItem("summaryDate");
  const storedSelectedTimeSlots = localStorage.getItem("summarytableTimeSlots");
  const storedSelectedTicketCategories = localStorage.getItem("summaryTicketCategories");
  const storedTotalTickets = localStorage.getItem("summaryTotalTickets");
  const storedTotalCharges = localStorage.getItem("summaryTotalCharges");
  const summaryTicketTypesElement = document.getElementById("summaryTicketTypes");
  const storedFullName = localStorage.getItem("fullName");
  const storedMobileNumber = localStorage.getItem("mobileNumber");
  const storedEmail = localStorage.getItem("email");
  const storedConfirmedEmail = localStorage.getItem("confirmEmail");


  // Display stored data in the summary table
  const summaryDateElement = document.getElementById("summaryDate");
  const summarytableTimeSlotsElement = document.getElementById("summarytableTimeSlots");
  const summaryTicketCategoriesElement = document.getElementById("summaryTicketCategories");
  const summaryTotalTicketsElement = document.getElementById("summaryTotalTickets");
  const summaryTotalChargesElement = document.getElementById("summaryTotalCharges");
  const summaryFullNameElement = document.getElementById("summaryFullName");
  const summaryMobileNumberElement = document.getElementById("summaryMobileNumber");
  const summaryEmailElement = document.getElementById("summaryEmail");
  const summaryConfirmedEmailElement = document.getElementById("summaryConfirmedEmail");
  

  summaryFullNameElement.textContent = storedFullName || "-";
  summaryMobileNumberElement.textContent = storedMobileNumber || "-";
  summaryEmailElement.textContent = storedEmail || "-";
  summaryConfirmedEmailElement.textContent = storedConfirmedEmail || "-";
  summaryDateElement.textContent = storedSelectedDate || "-";
  summarytableTimeSlotsElement.textContent = storedSelectedTimeSlots || "-";
  summaryTicketCategoriesElement.textContent = storedSelectedTicketCategories || "-";
  summaryTotalTicketsElement.textContent = storedTotalTickets || "-";
  summaryTotalChargesElement.textContent = storedTotalCharges || "-";