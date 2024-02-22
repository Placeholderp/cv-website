/*Allows the project duration slider to change the number of days*/
const slider = document.getElementById("project-duration");
const output = document.getElementById("output");
slider.addEventListener("input", function() {
    const days = this.value;
    /*appends days to the end of the text box*/
    output.textContent = `${days} days`;
});

function validateForm() {
    /*Initalises all values in the form to make them easy to access*/
    let fname = document.forms["contact-form"]["fname"].value;
    let phone = document.forms["contact-form"]["phone"].value;
    let email = document.forms["contact-form"]["email"].value;
    let confirm = document.forms["contact-form"]["confirm-email"].value;
    let description = document.forms["contact-form"]["project-description"].value;
    let pdate = document.forms["contact-form"]["project-date"].value;
    let duration = document.forms["contact-form"]["project-duration"].value;
    let method = document.forms["contact-form"]["contact-method"].value;

    if (!checkEmails(email, confirm)) return false;
    if (!checkDate(pdate)) return false;

    /*checks that there is each form input has a value, if not directs user to which is needed*/
    if (fname == "") {
        alert("Name must be filled out");
        return false;
    }

    if (phone == "") {
        alert("Phone must be filled out");
        return false;
    }

    if (description == "") {
        alert("Project description must be filled out");
        return false;
    }

    if (duration == "") {
        alert("Project-duration must be filled out");
        return false;
    }

    if (method == "") {
        alert("Contact method must be filled out");
        return false;
    }
    sendEmail();
    return true;
}

function checkEmails(email, confirm) {
    /*checks that email and confirm email are the same*/
    if (email !== confirm) {
        alert("Email and confirm email should be the same");
        return false;
    }
    return true;
}

function checkDate(pdate) {
    /*checks that project date is at least 1 day in the future*/
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); /*resets time to midnight*/

    let selectedDate = new Date(pdate); /*This is the selected project date*/

    if (selectedDate <= currentDate) {
        alert("Please select a date that is at least one day in the future.");
        return false;
    }
    return true;
}

function sendEmail() {
    let fname = document.forms["contact-form"]["fname"].value;
    let phone = document.forms["contact-form"]["phone"].value;
    let email = document.forms["contact-form"]["email"].value;
    let description = document.forms["contact-form"]["project-description"].value;
    let pdate = document.forms["contact-form"]["project-date"].value;
    let duration = document.forms["contact-form"]["project-duration"].value;
    let method = document.forms["contact-form"]["contact-method"].value;

    let emailBody = `Name: ${fname}\nPhone: ${phone}\nEmail: ${email}\nProject Description: ${description}\nProject Date: ${pdate}\nProject Duration: ${duration} days\nContact Method: ${method}`;

    let confirmationMessage = `Please confirm the following details:\n\n${emailBody}`;

    /*Does a confirm with all the form data before making a email draft to my email*/
    if (confirm(confirmationMessage)) {
        window.location.href = `mailto:230163795@aston.ac.uk?subject=Form Submission&body=${encodeURIComponent(emailBody)}`;
    } else {
        /* Do nothing if they cancels*/
    }
}