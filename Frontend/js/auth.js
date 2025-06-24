function getToken() {
  return localStorage.getItem('jwtToken');
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
  const token = getToken();
  if (isTokenExpired(token)) {
    localStorage.removeItem('jwtToken');
    if (window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
      window.location.href = 'login.html';
    }
    return false;
  }
  return true;
}

function handleApiResponse(response) {
  if (response.status === 401) {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
    return null;
  }
  return response.json();
}

function getAuthHeaders() {
  return { 'Authorization': 'Bearer ' + getToken() };
}

function getAuthHeadersWithContent() {
  return { 
    'Authorization': 'Bearer ' + getToken(),
    'Content-Type': 'application/json'
  };
}

document.addEventListener('DOMContentLoaded', function() {
  checkTokenAndRedirect();
}); 