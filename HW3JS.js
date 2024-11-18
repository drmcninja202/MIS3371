// Program name: HW3JS.js
// Author: Mark Blanchard 1791151
// Date created: 11/3/24
// Date last edited: 11/17/24
// Version: 2.55
// Description: Homework 3 medical input form

// Utility function to show error messages
function showError(fieldId, message) {
    document.getElementById(`${fieldId}Error`).textContent = message;
}

// Utility function to clear error messages
function clearError(fieldId) {
    document.getElementById(`${fieldId}Error`).textContent = '';
}

// Name validation (1-30 characters, letters, apostrophes, dashes only)
function validateName() {
    const name = document.getElementById('fname').value;
    const valid = /^[A-Za-z'-]{1,30}$/.test(name);
    if (!valid) {
        showError('fname', 'First name must be 1-30 characters and only letters, apostrophes, and dashes.');
    } else {
        clearError('fname');
    }
    return valid;
}

// Middle Initial validation (optional, 1 letter only)
function validateMiddleInitial() {
    const initial = document.getElementById('mname').value;
    const valid = /^[A-Za-z]?$/.test(initial);
    if (!valid) {
        showError('mname', 'Middle initial must be 1 letter or blank.');
    } else {
        clearError('mname');
    }
    return valid;
}

// Last Name validation (1-30 characters, letters, apostrophes, dashes only)
function validateLastName() {
    const lastName = document.getElementById('lname').value;
    const valid = /^[A-Za-z'-]{1,30}$/.test(lastName);
    if (!valid) {
        showError('lname', 'Last name must be 1-30 characters and only letters, apostrophes, and dashes.');
    } else {
        clearError('lname');
    }
    return valid;
}

// Date of Birth validation (not in the future, not more than 120 years ago)
function validateDOB() {
    const dob = new Date(document.getElementById('DOB').value);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    const valid = dob <= today && dob >= minDate;
    if (!valid) {
        showError('DOB', 'Date of Birth must be a valid date within the last 120 years and not in the future.');
    } else {
        clearError('DOB');
    }
    return valid;
}

// SSN validation and formatting (9 digits, formatted as ###-##-####)
function formatAndValidateSSN() {
    const ssn = document.getElementById('SSN').value.replace(/\D/g, '');
    const valid = /^\d{9}$/.test(ssn);
    if (valid) {
        document.getElementById('SSN').value = `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5)}`;
        clearError('SSN');
    } else {
        showError('SSN', 'SSN must be 9 digits, formatted as ###-##-####.');
    }
    return valid;
}

// Address validation (required, 2-30 characters)
function validateAddress() {
    const address = document.getElementById('Address').value;
    const valid = /^.{2,30}$/.test(address);
    if (!valid) {
        showError('Address', 'Address must be 2-30 characters.');
    } else {
        clearError('Address');
    }
    return valid;
}

// Address Line 2 validation (optional, 2-30 characters if filled)
function validateAddress2() {
    const address2 = document.getElementById('Address2').value;
    const valid = address2 === '' || /^.{2,30}$/.test(address2);
    if (!valid) {
        showError('Address2', 'Address Line 2 must be 2-30 characters if provided.');
    } else {
        clearError('Address2');
    }
    return valid;
}

// City validation (required, 2-30 characters)
function validateCity() {
    const city = document.getElementById('City').value;
    const valid = /^[A-Za-z\s]{2,30}$/.test(city);
    if (!valid) {
        showError('City', 'City must be 2-30 characters and only letters and spaces.');
    } else {
        clearError('City');
    }
    return valid;
}

// State validation (required, must be selected)
function validateState() {
    const state = document.getElementById('State').value;
    const valid = state !== '';
    if (!valid) {
        showError('State', 'Please select a state.');
    } else {
        clearError('State');
    }
    return valid;
}

// Zip Code validation (5 digits)
function validateZip() {
    const zip = document.getElementById('Zip').value;
    const valid = /^\d{5}(-\d{4})?$/.test(zip);
    if (!valid) {
        showError('Zip', 'Zip Code must be 5 digits or 9 digits with ZIP+4 format.');
    } else {
        clearError('Zip');
    }
    return valid;
}

// Email validation (format: name@domain.tld)
function validateEmail() {
    const email = document.getElementById('email').value.toLowerCase();
    const valid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);
    if (!valid) {
        showError('email', 'Email must be in the format name@domain.tld.');
    } else {
        clearError('email');
    }
    return valid;
}

// Username validation (5-20 characters, letters, numbers, underscores, no special characters or leading numbers)
function validateUsername() {
    const username = document.getElementById('Username').value;
    const valid = /^[A-Za-z][A-Za-z0-9_-]{4,19}$/.test(username);
    if (!valid) {
        showError('Username', 'Username must be 5-20 characters, start with a letter, and contain no special characters.');
    } else {
        clearError('Username');
    }
    return valid;
}
// Function to validate the password as the user types
function validatePasswordOnInput() {
    const password = document.getElementById('Password').value;
    const confirmPassword = document.getElementById('ConfirmPassword').value;
    const feedback = document.getElementById('passwordFeedback');
    const confirmFeedback = document.getElementById('confirmPasswordFeedback');

    // Password validation criteria
    const lengthValid = password.length >= 8 && password.length <= 30;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /\d/.test(password);
    const specialCharValid = /[!@#%^&*()_+]/.test(password);

    // Generate feedback
    let feedbackMessage = '<ul>';
    feedbackMessage += `<li>${lengthValid ? '✅' : '❌'} Password length (8-30 characters)</li>`;
    feedbackMessage += `<li>${uppercaseValid ? '✅' : '❌'} At least one uppercase letter</li>`;
    feedbackMessage += `<li>${lowercaseValid ? '✅' : '❌'} At least one lowercase letter</li>`;
    feedbackMessage += `<li>${numberValid ? '✅' : '❌'} At least one number</li>`;
    feedbackMessage += `<li>${specialCharValid ? '✅' : '❌'} At least one special character</li>`;
    feedbackMessage += '</ul>';

    // Show feedback
    feedback.innerHTML = feedbackMessage;

    // Check if passwords match
    if (confirmPassword.length > 0) {
        confirmFeedback.textContent = password === confirmPassword ? '✅ Passwords match' : '❌ Passwords do not match';
    } else {
        confirmFeedback.textContent = '';
    }
}


// Function to display slider value and show error if pain level is above 0
function showSliderValue(value) {
    const sliderDisplay = document.getElementById('sliderValueDisplay');
    const painError = document.getElementById('painError');
    sliderDisplay.textContent = value;

    if (value > 0) {
        painError.textContent = 'You should not give blood if you are in pain.';
        return true;
    } else {
        painError.textContent = 'I\'m glad you are feeling well today!';
        return false;
    }
}

// Function to validate all fields and toggle the submit button visibility
function validateAllFields() {
    let isValid = true;
    
    // Run validation functions for each field
    isValid = validateName() && isValid;
    isValid = validateMiddleInitial() && isValid;
    isValid = validateLastName() && isValid;
    isValid = validateDOB() && isValid;
    isValid = formatAndValidateSSN() && isValid;
    isValid = validateAddress() && isValid;
    isValid = validateCity() && isValid;
    isValid = validateState() && isValid;
    isValid = validateZip() && isValid;
    isValid = validateEmail() && isValid;
    isValid = validateUsername() && isValid;

    // Toggle submit button visibility based on form validity
    document.getElementById("submitButton").style.display = isValid ? "inline" : "none";
    return isValid;
}

function submitForm() {
    window.location.replace("./Thankyou.html")
}

function foot() {
    window.location.replace("./redirectblood.html")
}


function reviewForm() {
    const form = document.forms['userForm'];

    //getting form values for review section
    let firstName = form['fname'].value;
    let middleInitial = form['mname'].value;
    let lastName = form['lname'].value;
    let dob = form['DOB'].value;
    let email = form['email'].value;
    let address = form['Address'].value;
    let city = form['City'].value;
    let state = form['State'].value;
    let zip = form['Zip'].value;
    let username = form['Username'].value;
    let bloodType = form.querySelector('input[name="Blood"]:checked')?.value || 'Not provided';
    let insurance = form.querySelector('input[name="Insurance"]:checked')?.value === '1' ? 'Yes' : 'No';
    username = username.toLowerCase(username);
    let symptoms = [];
    if (form['symptom1'].checked) symptoms.push('Chicken Pox');
    if (form['symptom2'].checked) symptoms.push('Covid');
    if (form['symptom3'].checked) symptoms.push('Measles');

    //displaying review section of the form
    let reviewContent = `
        <strong>First Name:</strong> ${firstName}<br>
        <strong>Middle Initial:</strong> ${middleInitial || 'Not provided'}<br>
        <strong>Last Name:</strong> ${lastName}<br>
        <strong>Date of Birth:</strong> ${dob}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Address:</strong> ${address}, ${city}, ${state}, ${zip}<br>
        <strong>Blood Type:</strong> ${bloodType}<br>
        <strong>Insurance:</strong> ${insurance}<br>
        <strong>Symptoms:</strong> ${symptoms.length > 0 ? symptoms.join(', ') : 'None'}<br>
        <strong>Username:</strong> ${username}<br>
    `;

    document.getElementById('reviewContent').innerHTML = reviewContent;
    document.getElementById('reviewSection').style.display = 'block';
}
