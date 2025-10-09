const usernameMinLength = 5;
const passwordMinLength = 8;

var submitted = false;

var elForm = document.getElementById('account');
var elUsername = document.getElementById('username');
var elPassword = document.getElementById('password');
var elFeedbackUsername = document.getElementById('feedback-username');
var elFeedbackPassword = document.getElementById('feedback-password');
var chkSeePw = document.getElementById('seePassword');
var submitButton = document.getElementById('submit');

submitButton.disabled = true;
submitButton.classList.add('disabled');

function checkInputLength(inputElement, feedbackElement, minLength) {
    if (inputElement.value.length < minLength) {
        feedbackElement.textContent = 'Must be ' + minLength + ' characters or more';
    } else {
        feedbackElement.textContent = '';
    }
}

function validateForm() {
    if (submitButton.disabled && elUsername.value.length >= usernameMinLength && elPassword.value.length >= passwordMinLength) {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    } 
    if (!submitButton.disabled && (elUsername.value.length < usernameMinLength || elPassword.value.length < passwordMinLength)) {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    }
}

// Event listeners
elUsername.addEventListener('input', () => {
    checkInputLength(elUsername, elFeedbackUsername, usernameMinLength);
    validateForm();
}, false);

elPassword.addEventListener('input', () => {
    checkInputLength(elPassword, elFeedbackPassword, passwordMinLength);
    validateForm();
}, false);

chkSeePw.addEventListener('change', (event) => {
    var target = event.target;
    try {
        if (target.checked) {
            elPassword.type = 'text';
        }
        else {
            elPassword.type = 'password';
        }
    } catch (error) {
        alert('This browser cannot switch type');
    }
}, false);

elForm.addEventListener('submit', (event) => {
    var target = event.target;
    if(target.disabled || submitted)
    
    event.preventDefault();
    alert('Form submitted');
}, false);

