// Products Page JavaScript

let allProducts = [];
let filteredProducts = [];
let deleteProductId = null;

document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    initializeFilters();
    initializeModal();
});

async function loadProducts() {
    showLoading(true);
    const errorContainer = document.getElementById('error-message');
    errorContainer.style.display = 'none';

    try {
        allProducts = await api.getAllProducts();
        filteredProducts = [...allProducts];

        // Populate brand filter
        populateBrandFilter();

        // Display products
        displayProducts(filteredProducts);
        showLoading(false);
    } catch (error) {
        showLoading(false);
        showError('Failed to load products: ' + error.message);
        console.error('Error loading products:', error);
    }
}

function populateBrandFilter() {
    const brandFilter = document.getElementById('brand-filter');
    const brands = [...new Set(allProducts.map(p => p.brand))].sort();

    // Clear existing options except "All Brands"
    brandFilter.innerHTML = '<option value="">All Brands</option>';

    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

function displayProducts(products) {
    const grid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');

    if (products.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-header">
                <span class="product-category" style="background-color: ${getCategoryColor(product.category)}">
                    ${formatCategory(product.category)}
                </span>
                <span class="product-stock ${product.stock_quantity < 10 ? 'low-stock' : ''}">
                    ${product.stock_quantity} in stock
                </span>
            </div>

            <h3 class="product-name">${escapeHtml(product.product_name)}</h3>
            <p class="product-brand">by ${escapeHtml(product.brand)}</p>
            <p class="product-description">${escapeHtml(product.description)}</p>

            ${product.specifications && Object.keys(product.specifications).length > 0 ? `
                <div class="product-specs">
                    <strong>Specs:</strong>
                    ${Object.entries(product.specifications).slice(0, 3).map(([key, value]) =>
                        `${key}: ${value}`
                    ).join(' • ')}
                </div>
            ` : ''}

            <div class="product-footer">
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn-icon edit" onclick="editProduct(${product.id})" title="Edit">
                        ✏️
                    </button>
                    <button class="btn-icon delete" onclick="confirmDelete(${product.id}, '${escapeHtml(product.product_name)}')" title="Delete">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function initializeFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const brandFilter = document.getElementById('brand-filter');
    const sortFilter = document.getElementById('sort-filter');
    const clearButton = document.getElementById('clear-filters');

    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    brandFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    clearButton.addEventListener('click', clearFilters);
}

function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const brand = document.getElementById('brand-filter').value;
    const sort = document.getElementById('sort-filter').value;

    // Filter
    filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.product_name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm) ||
                            product.brand.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        const matchesBrand = !brand || product.brand === brand;

        return matchesSearch && matchesCategory && matchesBrand;
    });

    // Sort
    filteredProducts.sort((a, b) => {
        switch (sort) {
            case 'name-asc':
                return a.product_name.localeCompare(b.product_name);
            case 'name-desc':
                return b.product_name.localeCompare(a.product_name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'stock-asc':
                return a.stock_quantity - b.stock_quantity;
            case 'stock-desc':
                return b.stock_quantity - a.stock_quantity;
            default:
                return 0;
        }
    });

    displayProducts(filteredProducts);
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('brand-filter').value = '';
    document.getElementById('sort-filter').value = 'name-asc';
    applyFilters();
}

function editProduct(id) {
    window.location.href = `/products/edit/${id}`;
}

function confirmDelete(id, name) {
    deleteProductId = id;
    const modal = document.getElementById('delete-modal');
    const productInfo = document.getElementById('delete-product-info');

    productInfo.innerHTML = `<strong>${escapeHtml(name)}</strong>`;
    modal.classList.add('active');
}

function initializeModal() {
    const modal = document.getElementById('delete-modal');
    const cancelBtn = document.getElementById('cancel-delete');
    const confirmBtn = document.getElementById('confirm-delete');

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        deleteProductId = null;
    });

    confirmBtn.addEventListener('click', async () => {
        if (deleteProductId) {
            await deleteProduct(deleteProductId);
            modal.classList.remove('active');
            deleteProductId = null;
        }
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            deleteProductId = null;
        }
    });
}

async function deleteProduct(id) {
    try {
        await api.deleteProduct(id);

        // Remove from local array
        allProducts = allProducts.filter(p => p.id !== id);
        applyFilters();

        // Show success message temporarily
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Product deleted successfully!';
        document.querySelector('.page-content').insertBefore(
            successDiv,
            document.querySelector('.filters-section')
        );

        setTimeout(() => successDiv.remove(), 3000);
    } catch (error) {
        showError('Failed to delete product: ' + error.message);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
