const API_BASE_URL = 'https://jj-cargo-ms.onrender.com';

const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
        LOGOUT: `${API_BASE_URL}/auth/logout`
    },
    CARGO: `${API_BASE_URL}/cargo`,
    CATEGORY: `${API_BASE_URL}/category`,
    LOCATION: `${API_BASE_URL}/location`,
    SHIPMENT: `${API_BASE_URL}/shipment`,
    MAPS: `${API_BASE_URL}/maps`
};

function checkBackendAvailability() {
    fetch(`${API_BASE_URL}/auth/login`, {
        method: 'OPTIONS',
        headers: {
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type'
        }
    })
    .then(() => {
        console.log('Backend is available');
    })
    .catch(error => {
        console.error('Backend is not available:', error);
        const warningDiv = document.createElement('div');
        warningDiv.className = 'alert alert-warning';
        warningDiv.textContent = 'Warning: Cannot connect to server. Please check your internet connection.';
        document.body.insertBefore(warningDiv, document.body.firstChild);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkBackendAvailability);
} else {
    checkBackendAvailability();
} 