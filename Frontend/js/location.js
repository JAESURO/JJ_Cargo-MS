const API_URL = 'http://localhost:8080/location';
const locationTableBody = document.querySelector('#location-table tbody');
const locationForm = document.getElementById('location-form');
const locationNameInput = document.getElementById('location-name');
const locationLatitudeInput = document.getElementById('location-latitude');
const locationLongitudeInput = document.getElementById('location-longitude');
const locationMessage = document.createElement('div');
locationMessage.className = 'text-center text-muted mt-3';
locationTableBody.parentElement.parentElement.appendChild(locationMessage);

function loadLocations() {
  fetch(API_URL, {
    headers: getAuthHeaders()
  })
    .then(handleApiResponse)
    .then(data => {
      if (!data) return;
      locationTableBody.innerHTML = '';
      if (data.length === 0) {
        locationMessage.textContent = 'No locations found for your account.';
      } else {
        locationMessage.textContent = '';
        data.forEach(location => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${location.id}</td>
            <td>${location.name}</td>
          `;
          locationTableBody.appendChild(row);
        });
      }
    });
}

function initMap() {
  const defaultLatLng = { lat: 0, lng: 0 };
  const map = new google.maps.Map(document.getElementById('map'), {
    center: defaultLatLng,
    zoom: 2
  });
  let marker = null;

  map.addListener('click', function(e) {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    locationLatitudeInput.value = lat;
    locationLongitudeInput.value = lng;
    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({ position: { lat, lng }, map });
  });
}

window.initMap = initMap;

locationForm.onsubmit = function(e) {
  e.preventDefault();
  fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeadersWithContent(),
    body: JSON.stringify({
      name: locationNameInput.value,
      latitude: Number(locationLatitudeInput.value),
      longitude: Number(locationLongitudeInput.value)
    })
  })
    .then(handleApiResponse)
    .then(data => {
      if (data !== null) {
        loadLocations();
        locationForm.reset();
      }
    });
};

loadLocations();

window.addEventListener('DOMContentLoaded', () => {
  if (window.google && window.google.maps) {
    initMap();
  } else {
    setTimeout(initMap, 1000);
  }
}); 