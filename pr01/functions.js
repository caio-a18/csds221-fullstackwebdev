/* This is the JavaScript file for pr01 by Caio Albuquerque */

/* Variables for the dates */
var datecheckin;
var datecheckout;
style = "height: 100%";

/* Function to display dropdown menu for adults from 1-10 */
$(function () {
  var $select = $("#adults");
  for (i = 1; i <= 10; i++) {
    $select.append($("<option></option>").val(i).html(i));
  }
});

/* Uses dateselector to change checkin date using #checkinpick */
$("#checkinpick").on("change", function () {
  datecheckin = $("#checkin").val();
  datecheckout = $("#checkout").val();
  let days = moment(datecheckout).diff(moment(datecheckin), "days");
  if (isNaN(days)) {
    return false;
  }

  $("#days").val(days);
  let adults = $("#adults").val();
  $("#cost").val("$" + adults * 150 * days);
});

/* Uses moment and dateselector to change checkout date using #checkoutpick */
$("#checkoutpick").on("change", function () {
  datecheckout = $("#checkout").val();
  datecheckin = $("#checkin").val();
  let days = moment(datecheckout).diff(moment(datecheckin), "days");
  if (isNaN(days)) {
    return false;
  }

  $("#days").val(days);
  let adults = $("#adults").val();
  $("#cost").val("$" + adults * 150 * days);
});

/* Uses moment to change date in case user wants to change date */
$("#adults").on("change", function () {
  datecheckout = $("#checkout").val();
  datecheckin = $("#checkin").val();
  let days = moment(datecheckout).diff(moment(datecheckin), "days");
  let adults = $("#adults").val();
  if (isNaN(days)) {
    return false;
  }
  $("#days").val(days);
  $("#cost").val("$" + adults * 150 * days);
});

/* Function for the submit button... checks if it properly works or not */
function submit() {
  let user;
  let contact;
  let username = true;
  let firstName = true;
  let lastName = true;
  let phoneNumber = true;
  let faxNumber = true;
  let email = true;
  let costvalid = false;
  let costpositive = true;
  
  /* UserForm */
  let userForm = document.getElementById("userform");
  userForm.classList.add("was-validated");
  user = document.getElementById("userform").checkValidity();
  /* Uses switch cases to see if the user is correct */
  if (!user) {
    username = document.getElementById("username").value;
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    switch (username) {
      case "":
        username = false;
        break;
      default:
        username = true;
        break;
    }
    switch (firstName) {
      case "":
        firstName = false;
        break;
      default:
        firstName = true;
        break;
    }
    switch (lastName) {
      case "":
        lastName = false;
        break;
      default:
        lastName = true;
        break;
    }
  }
  /* ContactForm */
  let contactForm = document.getElementById("contactform");
  contactForm.classList.add("was-validated");
  contact = document.getElementById("contactform").checkValidity();
  /* Uses switch cases to see if the contact is correct */
  if (!contact) {
    phoneNumber = document.getElementById("phone").value;
    faxNumber = document.getElementById("fax").value;
    email = document.getElementById("email").value;
    switch (phoneNumber) {
      case "":
        phoneNumber = false;
        break;
      default:
        phoneNumber = true;
        break;
    }
    switch (faxNumber) {
      case "":
        faxNumber = false;
        break;
      default:
        faxNumber = true;
        break;
    }
    switch (email) {
      case "":
        email = false;
        break;
      default:
        email = true;
        break;
    }
  }
  /* Ensures that the cost is not negative and is a valid number */
  let numcost = document.getElementById("cost").value;
  if (numcost != "") {
    costvalid = true;
  }
  let cost = numcost;
  cost = cost.substring(1);

  cost = parseInt(cost);
  if (cost <= 0) {
    costpositive = false;
  }
  
  /* Uses toastr to see if user, contact, and cost values were successful */
  if (user && contact && costvalid && costpositive) {
    alert("Form has been submitted!");
  } else {
    /* Checks if the issue is in user */
    if (!user) {
      if (!username) {
        toastr.error("Must enter a username");
      }
      if (!firstName) {
        toastr.error("Must enter a first name");
      }
      if (!lastName) {
        toastr.error("Must enter a last name");
      }
    }
    /* Checks if the issue is in contact */
    if (!contact) {
      if (!phoneNumber) {
        toastr.error("Must enter a phone #");
      }
      if (!faxNumber) {
        toastr.error("Must enter a fax #");
      }
      if (!email) {
        toastr.error("Must enter an e-mail");
      }
    /* Next two if statements check if the issue is in cost */
    if (!costvalid) {
      toastr.error("Cost was not succesfully calculated");
    }
    if (!costpositive) {
      toastr.error("Cost is negative")
    }
   }
  }
}

/* Resets the form */
function reset() {
  document.getElementById("username").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("message").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("fax").value = "";
  document.getElementById("email").value = "";
  document.getElementById("adults").value = 1;
  document.getElementById("high").checked = false;
  document.getElementById("med").checked = false;
  document.getElementById("low").checked = false;
  document.getElementById("checkin").value = "";
  document.getElementById("checkout").value = "";
  document.getElementById("days").value = "";
  document.getElementById("cost").value = "";
  document.getElementById("userform").classList.remove("was-validated");
  document.getElementById("contactform").classList.remove("was-validated");
  alert("Form has been reset...");
}

/* This is the JavaScript file for pr01 by Caio Albuquerque */
