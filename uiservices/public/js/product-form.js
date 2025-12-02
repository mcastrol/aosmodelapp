// Product Form JavaScript (Create & Edit)

let specifications = {};

document.addEventListener('DOMContentLoaded', async () => {
    initializeForm();

    if (MODE === 'edit' && typeof PRODUCT_ID !== 'undefined') {
        await loadProductData(PRODUCT_ID);
    }
});

function initializeForm() {
    const form = document.getElementById('product-form');
    const addSpecBtn = document.getElementById('add-spec');

    form.addEventListener('submit', handleSubmit);
    addSpecBtn.addEventListener('click', addSpecificationRow);

    // Add initial spec row
    addSpecificationRow();
}

async function loadProductData(id) {
    showLoading(true);

    try {
        const product = await api.getProduct(id);

        // Populate form fields
        document.getElementById('product_name').value = product.product_name;
        document.getElementById('description').value = product.description;
        document.getElementById('category').value = product.category;
        document.getElementById('brand').value = product.brand;
        document.getElementById('price').value = product.price;
        document.getElementById('stock_quantity').value = product.stock_quantity;
        document.getElementById('unit_of_measure').value = product.unit_of_measure;

        // Load specifications
        if (product.specifications) {
            specifications = product.specifications;
            renderSpecifications();
        }

        showLoading(false);
    } catch (error) {
        showLoading(false);
        showError('Failed to load product data: ' + error.message);
        console.error('Error loading product:', error);
    }
}

function addSpecificationRow(key = '', value = '') {
    const container = document.getElementById('specifications-container');
    const rowId = `spec-${Date.now()}`;

    const row = document.createElement('div');
    row.className = 'spec-row';
    row.id = rowId;

    row.innerHTML = `
        <input type="text"
               placeholder="Key (e.g., processor)"
               value="${escapeHtml(key)}"
               data-spec-key>
        <input type="text"
               placeholder="Value (e.g., Intel i7)"
               value="${escapeHtml(value)}"
               data-spec-value>
        <button type="button" class="btn-icon delete" onclick="removeSpecRow('${rowId}')">
            🗑️
        </button>
    `;

    container.appendChild(row);
}

function removeSpecRow(rowId) {
    const row = document.getElementById(rowId);
    if (row) {
        row.remove();
    }
}

function renderSpecifications() {
    const container = document.getElementById('specifications-container');
    container.innerHTML = '';

    Object.entries(specifications).forEach(([key, value]) => {
        addSpecificationRow(key, value);
    });

    // Add one empty row
    addSpecificationRow();
}

function collectSpecifications() {
    const specs = {};
    const rows = document.querySelectorAll('.spec-row');

    rows.forEach(row => {
        const keyInput = row.querySelector('[data-spec-key]');
        const valueInput = row.querySelector('[data-spec-value]');

        const key = keyInput.value.trim();
        const value = valueInput.value.trim();

        if (key && value) {
            specs[key] = value;
        }
    });

    return specs;
}

async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = MODE === 'create' ? 'Creating...' : 'Updating...';

    // Hide any previous error messages
    document.getElementById('error-message').style.display = 'none';

    try {
        // Collect form data
        const formData = {
            product_name: document.getElementById('product_name').value.trim(),
            description: document.getElementById('description').value.trim(),
            category: document.getElementById('category').value,
            brand: document.getElementById('brand').value.trim(),
            price: parseFloat(document.getElementById('price').value),
            stock_quantity: parseInt(document.getElementById('stock_quantity').value),
            unit_of_measure: document.getElementById('unit_of_measure').value,
            specifications: collectSpecifications()
        };

        // Validate
        if (!validateForm(formData)) {
            throw new Error('Please fill in all required fields correctly');
        }

        // Submit to API
        let result;
        if (MODE === 'create') {
            result = await api.createProduct(formData);
        } else {
            result = await api.updateProduct(PRODUCT_ID, formData);
        }

        // Success - redirect to products page
        window.location.href = '/products';

    } catch (error) {
        showError('Failed to save product: ' + error.message);
        console.error('Error saving product:', error);

        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

function validateForm(data) {
    // Required field validation
    if (!data.product_name || data.product_name.length === 0) {
        return false;
    }

    if (!data.description || data.description.length === 0) {
        return false;
    }

    if (!data.category) {
        return false;
    }

    if (!data.brand || data.brand.length === 0) {
        return false;
    }

    if (!data.price || data.price <= 0) {
        return false;
    }

    if (data.stock_quantity < 0) {
        return false;
    }

    if (!data.unit_of_measure) {
        return false;
    }

    // Length validation
    if (data.product_name.length > 200) {
        return false;
    }

    if (data.description.length > 1000) {
        return false;
    }

    if (data.brand.length > 100) {
        return false;
    }

    return true;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
