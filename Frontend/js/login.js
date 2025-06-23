const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.onsubmit = function(e) {
  e.preventDefault();
  fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        window.location.href = 'index.html';
      } else {
        loginError.textContent = data.error || 'Login failed.';
      }
    });
}; 