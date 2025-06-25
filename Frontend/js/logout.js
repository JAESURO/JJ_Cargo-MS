function logout() {
  fetch(API_ENDPOINTS.AUTH.LOGOUT, {
    method: 'POST',
    headers: getAuthHeaders()
  })
  .then(() => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
  })
  .catch(() => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar-nav');
  if (navbar) {
    const logoutItem = document.createElement('li');
    logoutItem.className = 'nav-item';
    logoutItem.innerHTML = '<a class="nav-link" href="#" onclick="logout()">Logout</a>';
    navbar.appendChild(logoutItem);
  }
}); 