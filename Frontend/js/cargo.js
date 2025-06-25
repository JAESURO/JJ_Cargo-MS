const API_URL = API_ENDPOINTS.CARGO;

const cargoTableBody = document.querySelector('#cargo-table tbody');
const cargoForm = document.getElementById('cargo-form');
const cargoIdInput = document.getElementById('cargo-id');
const cargoNameInput = document.getElementById('cargo-name');
const cargoDescriptionInput = document.getElementById('cargo-description');
const cargoCancelBtn = document.getElementById('cargo-cancel');
const cargoCategoryInput = document.getElementById('cargo-category');
const cargoWeightInput = document.getElementById('cargo-weight');

function loadCargo() {
  fetch(API_URL, {
    headers: getAuthHeaders()
  })
    .then(handleApiResponse)
    .then(data => {
      if (!data) return;
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

function loadCategories() {
  fetch(API_ENDPOINTS.CATEGORY, {
    headers: getAuthHeaders()
  })
    .then(handleApiResponse)
    .then(data => {
      if (!data) return;
      cargoCategoryInput.innerHTML = '';
      data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        cargoCategoryInput.appendChild(option);
      });
    });
}

cargoForm.onsubmit = function(e) {
  e.preventDefault();
  const id = cargoIdInput.value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;
  fetch(url, {
    method,
    headers: getAuthHeadersWithContent(),
    body: JSON.stringify({
      name: cargoNameInput.value,
      categoryId: Number(cargoCategoryInput.value),
      weight: Number(cargoWeightInput.value)
    })
  })
    .then(handleApiResponse)
    .then(data => {
      if (data !== null) {
        loadCargo();
        cargoForm.reset();
        cargoIdInput.value = '';
        cargoCancelBtn.style.display = 'none';
      }
    });
};

window.editCargo = function(id, name, description) {
  cargoIdInput.value = id;
  cargoNameInput.value = name;
  cargoDescriptionInput.value = description;
  cargoCancelBtn.style.display = 'inline-block';
};

cargoCancelBtn.onclick = function() {
  cargoForm.reset();
  cargoIdInput.value = '';
  cargoCancelBtn.style.display = 'none';
};

window.deleteCargo = function(id) {
  if (confirm('Delete this cargo?')) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
      .then(handleApiResponse)
      .then(data => {
        if (data !== null) {
          loadCargo();
        }
      });
  }
};

loadCategories();
loadCargo(); 