// API Client for Computer Products Backend

class ProductAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);

            // Handle 204 No Content
            if (response.status === 204) {
                return { success: true };
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || `HTTP ${response.status}: ${response.statusText}`);
            }

            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    // Health Check
    async checkHealth() {
        return this.request('/health');
    }

    // Get all products
    async getAllProducts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/products/?${queryString}` : '/products/';
        return this.request(endpoint);
    }

    // Get product by ID
    async getProduct(id) {
        return this.request(`/products/${id}`);
    }

    // Create new product
    async createProduct(productData) {
        return this.request('/products/', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }

    // Update product
    async updateProduct(id, productData) {
        return this.request(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }

    // Delete product
    async deleteProduct(id) {
        return this.request(`/products/${id}`, {
            method: 'DELETE'
        });
    }

    // Search products
    async searchProducts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/products/search/?${queryString}`);
    }
}

// Initialize API client
const api = new ProductAPI(API_URL);

// Utility Functions

function showError(message, containerId = 'error-message') {
    const container = document.getElementById(containerId);
    if (container) {
        container.textContent = message;
        container.style.display = 'block';
        setTimeout(() => {
            container.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message, containerId = 'success-message') {
    const container = document.getElementById(containerId);
    if (container) {
        container.textContent = message;
        container.style.display = 'block';
        setTimeout(() => {
            container.style.display = 'none';
        }, 3000);
    }
}

function showLoading(show = true, containerId = 'loading') {
    const container = document.getElementById(containerId);
    if (container) {
        container.style.display = show ? 'block' : 'none';
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function formatCategory(category) {
    const categoryMap = {
        'computer': 'Computer',
        'laptop': 'Laptop',
        'keyboard': 'Keyboard',
        'mouse': 'Mouse',
        'monitor': 'Monitor',
        'disk': 'Storage',
        'ram': 'RAM',
        'processor': 'Processor',
        'graphics_card': 'Graphics Card',
        'other': 'Other'
    };
    return categoryMap[category] || category;
}

function getCategoryColor(category) {
    const colors = {
        'computer': '#3b82f6',
        'laptop': '#8b5cf6',
        'keyboard': '#ec4899',
        'mouse': '#f59e0b',
        'monitor': '#10b981',
        'disk': '#6366f1',
        'ram': '#14b8a6',
        'processor': '#ef4444',
        'graphics_card': '#a855f7',
        'other': '#64748b'
    };
    return colors[category] || '#64748b';
}
