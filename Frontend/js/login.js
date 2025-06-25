// Wait for both DOM and config.js to load
function initLogin() {
  // Check if config is loaded
  if (typeof API_ENDPOINTS === 'undefined') {
    console.error('API_ENDPOINTS not found. Make sure config.js is loaded.');
    return;
  }

  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');

  if (!loginForm) {
    console.error('Login form not found');
    return;
  }

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

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
      loginError.textContent = 'Please fill in all fields.';
      return;
    }
    
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
      })
      .catch(error => {
        console.error('Login error:', error);
        loginError.textContent = 'Login failed. Please try again.';
      });
  });
}

// Try to initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLogin);
} else {
  // DOM is already loaded, wait a bit for config.js
  setTimeout(initLogin, 100);
} 