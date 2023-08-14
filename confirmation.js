document.addEventListener("DOMContentLoaded", () => {
    const summaryDateElement = document.getElementById("summaryDate");
    const summarytableTimeSlotsElement = document.getElementById("summarytableTimeSlots");
    const summaryTicketCategoriesElement = document.getElementById("summaryTicketCategories");
    const summaryTotalTicketsElement = document.getElementById("summaryTotalTickets");
    const summaryTotalChargesElement = document.getElementById("summaryTotalCharges");
    const summaryFullNameElement = document.getElementById("summaryFullName");
    const summaryMobileNumberElement = document.getElementById("summaryMobileNumber");
    const summaryEmailElement = document.getElementById("summaryEmail");
    const summaryConfirmedEmailElement = document.getElementById("summaryConfirmedEmail");

    // Load stored data from local storage if available
    const storedSelectedDate = localStorage.getItem("summaryDate");
    const storedSelectedTimeSlots = localStorage.getItem("summarytableTimeSlots");
    const storedSelectedTicketCategories = localStorage.getItem("summaryTicketCategories");
    const storedTotalTickets = localStorage.getItem("summaryTotalTickets");
    const storedTotalCharges = localStorage.getItem("summaryTotalCharges");
    const storedFullName = localStorage.getItem("fullName");
    const storedMobileNumber = localStorage.getItem("mobileNumber");
    const storedEmail = localStorage.getItem("email");
    const storedConfirmedEmail = localStorage.getItem("confirmEmail");

    // Display stored data in the summary table
    summaryFullNameElement.textContent = storedFullName || "-";
    summaryMobileNumberElement.textContent = storedMobileNumber || "-";
    summaryEmailElement.textContent = storedEmail || "-";
    summaryConfirmedEmailElement.textContent = storedConfirmedEmail || "-";
    summaryDateElement.textContent = storedSelectedDate || "-";
    summarytableTimeSlotsElement.textContent = storedSelectedTimeSlots || "-";
    summaryTicketCategoriesElement.textContent = storedSelectedTicketCategories || "-";
    summaryTotalTicketsElement.textContent = storedTotalTickets || "-";
    summaryTotalChargesElement.textContent = storedTotalCharges || "-";
});




