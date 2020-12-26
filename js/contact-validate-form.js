// ==================== variables ===================
const form = document.querySelector('#form'),
  userName = document.querySelector('#username'),
  userEmail = document.querySelector('#useremail'),
  subject = document.querySelector('#subject'),
  usermessage = document.querySelector('#usermessage');

// ================== eventlistener =================
form.addEventListener('submit', validateForm);
// ==================== function ====================

function validateForm(e) {
  e.preventDefault();
  if (userName.value === '') {
    showError(
      'نام خود را وارد کنید',
      'alert1 text-danger text-center ',
      1,
      userName
    );
  }
  if (userEmail.value === '') {
    showError(
      'ایمیل خود را وارد کنید',
      'alert2 text-danger text-center',
      2,
      userEmail
    );
  } else {
    validateEmail(userEmail.value);
  }
  if (subject.value === '') {
    showError(
      'عنوان پیام را بنویسید',
      'alert3 text-danger text-center',
      3,
      subject
    );
  }
  if (usermessage.value === '') {
    showError(
      'پیام خود را بنویسید',
      'alert4 text-danger text-center',
      4,
      usermessage
    );
  }
}

// show error message for user
function showError(message, classname, num, element) {
  const alert = document.querySelector(`.alert${num}`);
  if (alert) {
    document.querySelector(`.alert${num}`).remove();
  }
  const span = document.createElement('span');
  span.className = classname;
  span.appendChild(document.createTextNode(message));
  element.style.border = '1px dotted #ff0000';
  document.querySelector(`.message${num}`).appendChild(span);
  setTimeout(() => {
    element.style.border = '1px dotted #bbb';
    document.querySelector(`.alert${num}`).style.display = 'none';
  }, 3000);
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (
    re.test(email) &&
    userName.value !== '' &&
    userEmail.value !== '' &&
    subject.value !== '' &&
    usermessage.value !== ''
  ) {
    showSpinner();
    return true;
  } else {
    showError(
      'ایمیل خود را وارد کنید',
      'alert2 text-danger text-center',
      2,
      userEmail
    );
  }
}

//show loader for user
function showSpinner() {
  document.querySelector('#spinner').classList.remove('d-none');
  setTimeout(() => {
    document.querySelector('#spinner').classList.add('d-none');
    form.reset();
    showError(
      'پیام شما ارسال شد',
      'alert5 text-success text-center',
      5,
      document.querySelector('#spinner')
    );
  }, 2000);
}
