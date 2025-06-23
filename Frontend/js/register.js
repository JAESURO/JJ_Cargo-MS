const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');

registerForm.onsubmit = function(e) {
  e.preventDefault();
  fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    })
  })
    .then(res => res.text())
    .then(msg => {
      if (msg.includes('successful')) {
        window.location.href = 'login.html';
      } else {
        registerError.textContent = msg;
      }
    });
}; 