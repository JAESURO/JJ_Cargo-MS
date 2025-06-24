const API_URL = 'http://localhost:8080/shipment';
const shipmentTableBody = document.querySelector('#shipment-table tbody');
const shipmentForm = document.getElementById('shipment-form');
const shipmentNameInput = document.getElementById('shipment-name');
const shipmentCargoInput = document.getElementById('shipment-cargo');
const shipmentDepartureLocationInput = document.getElementById('shipment-departure-location');
const shipmentArrivalLocationInput = document.getElementById('shipment-arrival-location');
const shipmentStatusInput = document.getElementById('shipment-status');
const shipmentDepartureTimeInput = document.getElementById('shipment-departure-time');
const shipmentArrivalTimeInput = document.getElementById('shipment-arrival-time');
const shipmentDistanceInput = document.getElementById('shipment-distance');
const shipmentSuccessInput = document.getElementById('shipment-success');

let locationsCache = [];

function loadShipments() {
  fetch(API_URL, {
    headers: getAuthHeaders()
  })
    .then(handleApiResponse)
    .then(data => {
      if (!data) return;
      shipmentTableBody.innerHTML = '';
      data.forEach(shipment => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${shipment.id}</td>
          <td>${shipment.name || ''}</td>
          <td>${shipment.cargo && shipment.cargo.name ? shipment.cargo.name : ''}</td>
          <td>${shipment.departureLocation && shipment.departureLocation.name ? shipment.departureLocation.name : ''}</td>
          <td>${shipment.arrivalLocation && shipment.arrivalLocation.name ? shipment.arrivalLocation.name : ''}</td>
          <td>${shipment.status || ''}</td>
          <td>${shipment.departureTime ? new Date(shipment.departureTime).toLocaleString() : ''}</td>
          <td>${shipment.arrivalTime ? new Date(shipment.arrivalTime).toLocaleString() : ''}</td>
          <td>${shipment.distance || ''}</td>
          <td>${shipment.success ? 'Yes' : 'No'}</td>
        `;
        shipmentTableBody.appendChild(row);
      });
    });
}

function loadCargos() {
  fetch('http://localhost:8080/cargo', {
    headers: getAuthHeaders()
  })
    .then(handleApiResponse)
    .then(data => {
      if (!data) return;
      shipmentCargoInput.innerHTML = '';
      data.forEach(cargo => {
        const option = document.createElement('option');
        option.value = cargo.id;
        option.textContent = cargo.name;
        shipmentCargoInput.appendChild(option);
      });
    });
}

function loadLocations() {
  fetch('http://localhost:8080/location', {
    headers: getAuthHeaders()
  })
    .then(handleApiResponse)
    .then(data => {
      if (!data) return;
      locationsCache = data;
      shipmentDepartureLocationInput.innerHTML = '';
      shipmentArrivalLocationInput.innerHTML = '';
      data.forEach(location => {
        const option1 = document.createElement('option');
        option1.value = location.id;
        option1.textContent = location.name;
        shipmentDepartureLocationInput.appendChild(option1);
        const option2 = document.createElement('option');
        option2.value = location.id;
        option2.textContent = location.name;
        shipmentArrivalLocationInput.appendChild(option2);
      });
      updateLocationDropdowns();
    });
}

function getLatLngById(id) {
  const loc = locationsCache.find(l => l.id == id);
  return loc ? { lat: loc.latitude, lng: loc.longitude } : null;
}

function updateDistanceField() {
  const depId = shipmentDepartureLocationInput.value;
  const arrId = shipmentArrivalLocationInput.value;
  if (!depId || !arrId || depId === arrId) return;
  const dep = getLatLngById(depId);
  const arr = getLatLngById(arrId);
  if (!dep || !arr) return;
  const apiKey = 'AIzaSyA8bcRXARx-ENtEqu1UG6xTt4Jo5EhkXjg';
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${dep.lat},${dep.lng}&destinations=${arr.lat},${arr.lng}&key=${apiKey}`;
  fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(data => {
      if (data.rows && data.rows[0] && data.rows[0].elements && data.rows[0].elements[0].distance) {
        const km = data.rows[0].elements[0].distance.value / 1000;
        shipmentDistanceInput.value = km;
      }
    });
}

function updateLocationDropdowns() {
  const depId = shipmentDepartureLocationInput.value;
  const arrId = shipmentArrivalLocationInput.value;
  Array.from(shipmentDepartureLocationInput.options).forEach(opt => opt.disabled = false);
  Array.from(shipmentArrivalLocationInput.options).forEach(opt => opt.disabled = false);
  if (arrId) {
    const depOpt = shipmentDepartureLocationInput.querySelector(`option[value='${arrId}']`);
    if (depOpt) depOpt.disabled = true;
  }
  if (depId) {
    const arrOpt = shipmentArrivalLocationInput.querySelector(`option[value='${depId}']`);
    if (arrOpt) arrOpt.disabled = true;
  }
}

shipmentDepartureLocationInput.addEventListener('change', () => {
  updateLocationDropdowns();
  updateDistanceField();
});
shipmentArrivalLocationInput.addEventListener('change', () => {
  updateLocationDropdowns();
  updateDistanceField();
});

shipmentForm.onsubmit = function(e) {
  e.preventDefault();
  fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeadersWithContent(),
    body: JSON.stringify({
      name: shipmentNameInput.value,
      cargo: { id: Number(shipmentCargoInput.value) },
      departureLocation: { id: Number(shipmentDepartureLocationInput.value) },
      arrivalLocation: { id: Number(shipmentArrivalLocationInput.value) },
      status: shipmentStatusInput.value,
      departureTime: new Date(shipmentDepartureTimeInput.value).toISOString(),
      arrivalTime: new Date(shipmentArrivalTimeInput.value).toISOString(),
      distance: Number(shipmentDistanceInput.value),
      success: shipmentSuccessInput.value === 'true'
    })
  })
    .then(handleApiResponse)
    .then(data => {
      if (data !== null) {
        loadShipments();
        shipmentForm.reset();
      }
    });
};

loadCargos();
loadLocations();
loadShipments(); 