// Helper to get JWT token from localStorage
function getToken() {
  return localStorage.getItem('jwtToken');
}

// API base URL
const API_URL = 'http://localhost:8080/cargo';

// DOM elements
const cargoTableBody = document.querySelector('#cargo-table tbody');
const cargoForm = document.getElementById('cargo-form');
const cargoIdInput = document.getElementById('cargo-id');
const cargoNameInput = document.getElementById('cargo-name');
const cargoDescriptionInput = document.getElementById('cargo-description');
const cargoCancelBtn = document.getElementById('cargo-cancel');
const cargoCategoryInput = document.getElementById('cargo-category');
const cargoWeightInput = document.getElementById('cargo-weight');

// Fetch and display cargo list
function loadCargo() {
  fetch(API_URL, {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  })
    .then(res => res.json())
    .then(data => {
      cargoTableBody.innerHTML = '';
      data.forEach(cargo => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${cargo.id}</td>
          <td>${cargo.name}</td>
          <td>${cargo.description || ''}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="editCargo(${cargo.id}, '${cargo.name}', '${cargo.description || ''}')">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteCargo(${cargo.id})">Delete</button>
          </td>
        `;
        cargoTableBody.appendChild(row);
      });
    });
}

// Fetch and populate categories
function loadCategories() {
  fetch('http://localhost:8080/category', {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  })
    .then(res => res.json())
    .then(data => {
      cargoCategoryInput.innerHTML = '';
      data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        cargoCategoryInput.appendChild(option);
      });
    });
}

// Add or update cargo
cargoForm.onsubmit = function(e) {
  e.preventDefault();
  const id = cargoIdInput.value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    },
    body: JSON.stringify({
      name: cargoNameInput.value,
      categoryId: Number(cargoCategoryInput.value),
      weight: Number(cargoWeightInput.value)
    })
  })
    .then(() => {
      loadCargo();
      cargoForm.reset();
      cargoIdInput.value = '';
      cargoCancelBtn.style.display = 'none';
    });
};

// Edit cargo
window.editCargo = function(id, name, description) {
  cargoIdInput.value = id;
  cargoNameInput.value = name;
  cargoDescriptionInput.value = description;
  cargoCancelBtn.style.display = 'inline-block';
};

// Cancel edit
cargoCancelBtn.onclick = function() {
  cargoForm.reset();
  cargoIdInput.value = '';
  cargoCancelBtn.style.display = 'none';
};

// Delete cargo
window.deleteCargo = function(id) {
  if (confirm('Delete this cargo?')) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    })
      .then(() => loadCargo());
  }
};

// Initial load
loadCategories();
loadCargo(); 