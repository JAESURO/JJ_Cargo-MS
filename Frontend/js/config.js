const API_BASE_URL = 'https://jj-cargo-ms.onrender.com';

const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`
    },
    CARGO: `${API_BASE_URL}/cargo`,
    CATEGORY: `${API_BASE_URL}/category`,
    LOCATION: `${API_BASE_URL}/location`,
    SHIPMENT: `${API_BASE_URL}/shipment`
}; 