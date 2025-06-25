function initRegister() {
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

    registerError.textContent = 'Registering...';
    
    console.log('Attempting to register with URL:', API_ENDPOINTS.AUTH.REGISTER);
    
    fetch(API_ENDPOINTS.AUTH.REGISTER, {
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
        return response.text();
      })
      .then(data => {
        console.log('Response data:', data);
        if (data.includes('successful')) {
          registerError.textContent = 'Registration successful! Redirecting...';
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 1000);
        } else {
          registerError.textContent = data || 'Registration failed.';
        }
      })
      .catch(error => {
        console.error('Registration error:', error);
        if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
          registerError.textContent = 'Network error: Cannot connect to server. Please check your internet connection and try again.';
        } else {
          registerError.textContent = 'Registration failed. Please try again. Error: ' + error.message;
        }
      });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRegister);
} else {
  setTimeout(initRegister, 100);
} 