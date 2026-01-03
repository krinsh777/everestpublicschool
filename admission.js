// Form validation function
function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());

    // Reset all fields to normal state
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => input.classList.remove('error'));

    // Validate First Name and Last Name
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');

    if (!nameRegex.test(firstName.value.trim())) {
        showError(firstName, 'Please enter a valid first name (2-30 characters, letters only)');
        isValid = false;
    }

    if (!nameRegex.test(lastName.value.trim())) {
        showError(lastName, 'Please enter a valid last name (2-30 characters, letters only)');
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Phone Number
    const phone = document.getElementById('phone');
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, 'Please enter a valid 10-digit phone number');
        isValid = false;
    }

    // Validate GPA
    const gpa = document.getElementById('gpa');
    if (gpa.value < 0 || gpa.value > 4) {
        showError(gpa, 'GPA must be between 0 and 4');
        isValid = false;
    }

    // Validate File Uploads
    const transcript = document.getElementById('transcript');
    const photo = document.getElementById('photo');

    if (transcript.files.length === 0) {
        showError(transcript, 'Please upload your transcript');
        isValid = false;
    }

    if (photo.files.length === 0) {
        showError(photo, 'Please upload your photo');
        isValid = false;
    }

    // If form is valid, allow submission
    if (isValid) {
        return true;
    }

    return false;
}

// Function to display error messages
function showError(input, message) {
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerText = message;
    input.parentNode.appendChild(errorDiv);
}

// Function to show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    `;
    successDiv.innerText = 'Application submitted successfully!';
    document.body.appendChild(successDiv);

    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Real-time validation for specific fields
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('admissionForm');

    // Real-time email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value.trim())) {
            showError(this, 'Please enter a valid email address');
        }
    });

    // Real-time phone validation
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('blur', function () {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(this.value.trim())) {
            showError(this, 'Please enter a valid 10-digit phone number');
        }
    });

    // Clear error messages when user starts typing
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('error');
            const errorMessage = this.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
});
