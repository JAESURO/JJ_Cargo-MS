const API_URL = API_ENDPOINTS.CATEGORY;
const categoryTableBody = document.querySelector('#category-table tbody');
const categoryForm = document.getElementById('category-form');
const categoryNameInput = document.getElementById('category-name');

function loadCategories() {
  fetch(API_URL, {
    headers: getAuthHeaders()
  })
    .then(handleApiResponse)
    .then(data => {
      if (!data) return;
      categoryTableBody.innerHTML = '';
      data.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${category.id}</td>
          <td>${category.name}</td>
        `;
        categoryTableBody.appendChild(row);
      });
    });
}

categoryForm.onsubmit = function(e) {
  e.preventDefault();
  fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeadersWithContent(),
    body: JSON.stringify({ name: categoryNameInput.value })
  })
    .then(handleApiResponse)
    .then(data => {
      if (data !== null) {
        loadCategories();
        categoryForm.reset();
      }
    });
};

loadCategories(); 