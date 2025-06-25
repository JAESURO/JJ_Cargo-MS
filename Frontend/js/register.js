const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  fetch(API_ENDPOINTS.AUTH.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'login.html';
      } else {
        registerError.textContent = data.error || 'Registration failed.';
      }
    });
}); 