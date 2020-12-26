// ================== variables =====================

const form = document.querySelector('#form');
const username = document.querySelector('#username');

const email = document.querySelector('#email');

const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// ==================== functions =====================

username.addEventListener('blur', function () {
  const label = document.querySelector('label[for=username');
  if (username.value !== '') {
    label.style.animation = 'move .01s forwards';
  }
});
email.addEventListener('blur', function () {
  const label2 = document.querySelector('label[for=email');
  if (email.value !== '') {
    label2.style.animation = 'move .01s forwards';
  }
});
password.addEventListener('blur', function () {
  const label3 = document.querySelector('label[for=password');
  if (password.value !== '') {
    label3.style.animation = 'move .01s forwards';
  }
});
password2.addEventListener('blur', function () {
  const label4 = document.querySelector('label[for=password2');
  if (password2.value !== '') {
    label4.style.animation = 'move .01s forwards';
  }
});

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value)) {
    showSuccess(email);
  } else {
    showError(email, 'Email is note valid');
  }
  return re.test(String(email).toLowerCase());
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordMatch(input, input2) {
  if (input.value !== input2.value) {
    showError(input2, 'password do note match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//======================= Event listeners======================
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);

  checkLength(password, 6, 25);
  validateEmail(email);
  checkPasswordMatch(password, password2);
});
