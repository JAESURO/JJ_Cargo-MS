// Wait for both DOM and config.js to load
function initRegister() {
  // Check if config is loaded
  if (typeof API_ENDPOINTS === 'undefined') {
    console.error('API_ENDPOINTS not found. Make sure config.js is loaded.');
    return;
  }

  const registerForm = document.getElementById('register-form');
  const registerError = document.getElementById('register-error');

  if (!registerForm) {
    console.error('Register form not found');
    return;
  }

  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
      registerError.textContent = 'Please fill in all fields.';
      return;
    }
    
    fetch(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.text())
      .then(data => {
        if (data.includes('successful')) {
          window.location.href = 'login.html';
        } else {
          registerError.textContent = data || 'Registration failed.';
        }
      })
      .catch(error => {
        console.error('Registration error:', error);
        registerError.textContent = 'Registration failed. Please try again.';
      });
  });
}

// Try to initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRegister);
} else {
  // DOM is already loaded, wait a bit for config.js
  setTimeout(initRegister, 100);
} 