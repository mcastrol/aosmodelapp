// Home Page JavaScript

document.addEventListener('DOMContentLoaded', async () => {
    await checkAPIStatus();
    await loadStats();
});

async function checkAPIStatus() {
    const statusBadge = document.getElementById('api-status');

    try {
        await api.checkHealth();
        statusBadge.textContent = 'Online';
        statusBadge.className = 'status-badge online';
    } catch (error) {
        statusBadge.textContent = 'Offline';
        statusBadge.className = 'status-badge offline';
        console.error('API is offline:', error);
    }
}

async function loadStats() {
    try {
        const products = await api.getAllProducts();

        // Total products
        const totalProducts = products.length;
        document.getElementById('total-products').textContent = totalProducts;

        // Unique categories
        const categories = new Set(products.map(p => p.category));
        document.getElementById('total-categories').textContent = categories.size;

        // Total stock
        const totalStock = products.reduce((sum, p) => sum + p.stock_quantity, 0);
        document.getElementById('total-stock').textContent = totalStock.toLocaleString();

    } catch (error) {
        console.error('Error loading stats:', error);
        document.getElementById('total-products').textContent = 'N/A';
        document.getElementById('total-categories').textContent = 'N/A';
        document.getElementById('total-stock').textContent = 'N/A';
    }
}
