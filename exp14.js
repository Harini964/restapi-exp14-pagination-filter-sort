// exp14.js

// Sample products
const products = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  name: "Product " + (i + 1),
  price: (Math.random() * 100).toFixed(2)
}));

let currentPage = 1;
let pageSize = 10;
let filterText = "";
let sortOption = "";

// Create elements
const productListEl = document.createElement("div");
const paginationEl = document.createElement("div");
const filterInput = document.createElement("input");
const sortSelect = document.createElement("select");
const pageSizeSelect = document.createElement("select");

// Append elements
document.body.appendChild(filterInput);
document.body.appendChild(sortSelect);
document.body.appendChild(pageSizeSelect);
document.body.appendChild(productListEl);
document.body.appendChild(paginationEl);

// Setup filter input
filterInput.placeholder = "Filter by name...";

// Setup sort dropdown
sortSelect.innerHTML = `
  <option value="">Sort By</option>
  <option value="name-asc">Name ↑</option>
  <option value="name-desc">Name ↓</option>
  <option value="price-asc">Price ↑</option>
  <option value="price-desc">Price ↓</option>
`;

// Setup page size dropdown
pageSizeSelect.innerHTML = `
  <option value="5">5 per page</option>
  <option value="10" selected>10 per page</option>
  <option value="20">20 per page</option>
`;

function renderProducts() {
  // Filtering
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Sorting
  if (sortOption) {
    const [key, order] = sortOption.split("-");
    filtered.sort((a, b) => {
      if (key === "name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (key === "price") {
        return order === "asc"
          ? parseFloat(a.price) - parseFloat(b.price)
          : parseFloat(b.price) - parseFloat(a.price);
      }
    });
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  if (currentPage > totalPages) currentPage = totalPages || 1;
  const start = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  // Render product list
  productListEl.innerHTML = paginated
    .map(p => `<div>${p.name} - $${p.price}</div>`)
    .join("");

  // Render pagination
  paginationEl.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) {
      btn.style.background = "blue";
      btn.style.color = "white";
    }
    btn.addEventListener("click", () => {
      currentPage = i;
      renderProducts();
    });
    paginationEl.appendChild(btn);
  }
}

// Event listeners
filterInput.addEventListener("input", e => {
  filterText = e.target.value;
  currentPage = 1;
  renderProducts();
});

sortSelect.addEventListener("change", e => {
  sortOption = e.target.value;
  currentPage = 1;
  renderProducts();
});

pageSizeSelect.addEventListener("change", e => {
  pageSize = parseInt(e.target.value);
  currentPage = 1;
  renderProducts();
});

// Initial render
renderProducts();
