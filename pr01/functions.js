/* This is the JavaScript file for pr01 by Caio Albuquerque */ 

/*

EDIT:
I was able to fix the issues I stated in the comments of my submission on Apollo
That is... I got toastr to work and removed the two alert() messages I had 

*/

/* Variables to control dates */
var datein;
var dateout;

/* Dropdown menu with options from 1-10 for selection of adults */
$(function () {
  var $select = $("#dropdownmenu");
  for (i = 1; i <= 10; i++) {
    $select.append($("<option></option>").val(i).html(i));
  }
});

/* Allows user to change dates */
/* Checkin */
$("#pickcheckin").on("change", function () {
  datein = $("#checkindate").val();
  dateout = $("#checkoutdate").val();
  let days = moment(dateout).diff(moment(datein), "days");
  if (isNaN(days)) {
    return false;
  }
  $("#numdays").val(days);
  let adults = $("#dropdownmenu").val();
  $("#numcost").val("$" + adults * 150 * days);
});
/* Checkout */
$("#pickcheckout").on("change", function () {
  dateout = $("#checkoutdate").val();
  datein = $("#checkindate").val();
  let days = moment(dateout).diff(moment(datein), "days");
  if (isNaN(days)) {
    return false;
  }

  $("#numdays").val(days);
  let adults = $("#dropdownmenu").val();
  $("#numcost").val("$" + adults * 150 * days);
});

/* Allows user to change dropdown
Calculates cost of stay based on # of adults and # of days */
$("#dropdownmenu").on("change", function () {
  dateout = $("#checkoutdate").val();
  datein = $("#checkindate").val();
  let days = moment(dateout).diff(moment(datein), "days");
  let adults = $("#dropdownmenu").val();
  if (isNaN(days)) {
    return false;
  }
  $("#numdays").val(days);
  $("#numcost").val("$" + adults * 150 * days);
});

/* Submit Function for Submit Button */
function submit() {
  /* Variables for User */
  let uservalid;
  let user_name = true;
  let first_name = true;
  let last_name = true;
  /* Variables for Contact */
  let contactvalid;
  let phone_number = true;
  let fax_number = true;
  let email = true;
  /* Variables for cost */
  let costvalid = false;
  let costpositive = true;
  let user_form = document.getElementById("userform");
  user_form.classList.add("was-validated");
  uservalid = document.getElementById("userform").checkValidity();
  /* Switch cases to check if the values in user are working */
  if (!uservalid) {
    user_name = document.getElementById("usernameinput").value;
    first_name = document.getElementById("firstnameinput").value;
    last_name = document.getElementById("lastnameinput").value;
    switch (user_name) {
      case "":
        user_name = false;
        break;
      default:
        user_name = true;
        break;
    }
    switch (first_name) {
      case "":
        first_name = false;
        break;
      default:
        first_name = true;
        break;
    }
    switch (last_name) {
      case "":
        last_name = false;
        break;
      default:
        last_name = true;
        break;
    }
  }
  let contactform = document.getElementById("contactform");
  contactform.classList.add("was-validated");
  contactvalid = document.getElementById("contactform").checkValidity();
  /* Switch cases to check if the values in contact are working */
  if (!contactvalid) {
    phone_number = document.getElementById("phoneinput").value;
    fax_number = document.getElementById("faxinput").value;
    email = document.getElementById("emailinput").value;
    switch (phone_number) {
      case "":
        phone_number = false;
        break;
      default:
        phone_number = true;
        break;
    }
    switch (fax_number) {
      case "":
        fax_number = false;
        break;
      default:
        fax_number = true;
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
  /*  Ensures the cost has a value */
  numcost = document.getElementById("numcost").value;
  if (numcost != "") {
    costvalid = true;
  }
  let cost = numcost;
  cost = cost.substring(1);
  /* Ensures cost is not negative */
  cost = parseInt(cost);
  if (cost <= 0) {
    costpositive = false;
  }
  if (uservalid && contactvalid && costvalid && costpositive) {
    /* Form can be submitted */
    toastr.success("Form has been successfully submitted");
  } 
  else {
    /* Checks to see if issue is in User */
    if (!uservalid) {
      if (!user_name) {
        toastr.error("Username is required");
      }
      if (!first_name) {
        toastr.error("First name is required");
      }
      if (!last_name) {
        toastr.error("Last name is required");
      }
    }
    /* Checks to see if issue is in Contact */
    if (!contactvalid) {
      if (!phone_number) {
        toastr.error("Phone# is required");
      }
      if (!fax_number) {
        toastr.error("Fax# is required");
      }
      if (!email) {
        toastr.error("E-mail is required");
      }
    }
    /* Checks to see if issue is in Cost 
    Either negative OR values for adults, check-in, and/or check-out are incorrect */
    if (!costvalid) {
      toastr.error("Cost cannot be calculated");
    }
    if (!costpositive) {
      toastr.error("Invalid cost");
    }
  }
}

/* Reset Function for Reset Button */
function reset() {
  /* Inputs for User */
  document.getElementById("usernameinput").value = "";
  document.getElementById("firstnameinput").value = "";
  document.getElementById("lastnameinput").value = "";
  /* Inputs for Contact */
  document.getElementById("phoneinput").value = "";
  document.getElementById("faxinput").value = "";
  document.getElementById("emailinput").value = "";
  /* Inputs for Schedule */
  document.getElementById("checkindate").value = "";
  document.getElementById("checkoutdate").value = "";
  document.getElementById("dropdownmenu").value = 1;
  document.getElementById("numdays").value = "";
  document.getElementById("numcost").value = "";
  /* Inputs for Other */
  document.getElementById("messageinput").value = "";
  document.getElementById("low").checked = false;
  document.getElementById("med").checked = false;
  document.getElementById("high").checked = false;
  document.getElementById("userform").classList.remove("was-validated");
  document.getElementById("contactform").classList.remove("was-validated");
  /* Tells the user that information has been reset */
  toastr.info("Information has been reset");
}


/* This is the JavaScript file for pr01 by Caio Albuquerque */
