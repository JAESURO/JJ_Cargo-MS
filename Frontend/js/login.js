function initLogin() {
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

    loginError.textContent = 'Logging in...';
    
    console.log('Attempting to login with URL:', API_ENDPOINTS.AUTH.LOGIN);
    
    fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        if (data.token) {
          localStorage.setItem('jwtToken', data.token);
          loginError.textContent = 'Login successful! Redirecting...';
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1000);
        } else {
          loginError.textContent = data.error || 'Login failed.';
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
          loginError.textContent = 'Network error: Cannot connect to server. Please check your internet connection and try again.';
        } else {
          loginError.textContent = 'Login failed. Please try again. Error: ' + error.message;
        }
      });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLogin);
} else {
  setTimeout(initLogin, 100);
} 