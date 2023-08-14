// Function to update the Continue button based on form validity
function ValidatedetailsPage() {
  let fullNameInput = document.getElementById("fullName").value;
  let mobileNumberInput = document.getElementById("mobileNumber").value;
  let emailInput = document.getElementById("email").value;
  let confirmEmailInput = document.getElementById("confirmEmail").value;
  let genderInput = document.getElementById("gender").value;

  let isFormValid = true;

  if (fullNameInput.trim() === "") {
      isFormValid = false;
  }
  if (mobileNumberInput.trim() === "") {
      isFormValid = false;
  }
  if (emailInput.trim() === "") {
      isFormValid = false;
  }
  if (confirmEmailInput.trim() === "") {
      isFormValid = false;
  }
  if (genderInput.trim() === "") {
      isFormValid = false;
  }
  if (!isEmailValid(emailInput)) {
      isFormValid = false;
  }
  if (emailInput !== confirmEmailInput) {
      isFormValid = false;
  }
  if (isFormValid) {
      // Store user inputs in local storage
      localStorage.setItem("fullName", fullNameInput);
      localStorage.setItem("mobileNumber", mobileNumberInput);
      localStorage.setItem("email", emailInput);
      localStorage.setItem("confirmEmail", confirmEmailInput);
      localStorage.setItem("gender", genderInput);

// Load stored data from local storage if available
function fulLname(){
  var name=document.getElementById("fullName").value;
  localStorage.setItem("name", name);
}

function mobilenumber(){
  var number=document.getElementById("mobileNumber").value;
  localStorage.setItem("number", number);
}

function email(){
  var email=document.getElementById("email").value;
  localStorage.setItem("email", email);
}

function confirmemail(){  
  var confirmemail=document.getElementById("confirmEmail").value;
  localStorage.setItem("confirmemail", confirmemail);
}


      // Redirect to payment page
      window.location.href = "payment.html";
  } else {
      alert("Please fill in all required fields.");
  }
}

// Function to validate email format
function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


  

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

  

