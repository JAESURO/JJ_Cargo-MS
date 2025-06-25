const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

function isTokenExpired(token) {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}

function checkTokenAndRedirect() {
  const token = localStorage.getItem('jwtToken');
  if (isTokenExpired(token)) {
    localStorage.removeItem('jwtToken');
    if (window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
      window.location.href = 'login.html';
    }
  }
}

checkTokenAndRedirect();

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  fetch(API_ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password
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
}); 