const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make API_BASE_URL available to all views
app.locals.API_BASE_URL = API_BASE_URL;

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Computer Products Shop',
        apiUrl: API_BASE_URL
    });
});

app.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products - Computer Shop',
        apiUrl: API_BASE_URL
    });
});

app.get('/products/new', (req, res) => {
    res.render('product-form', {
        title: 'Add New Product - Computer Shop',
        apiUrl: API_BASE_URL,
        mode: 'create'
    });
});

app.get('/products/edit/:id', (req, res) => {
    res.render('product-form', {
        title: 'Edit Product - Computer Shop',
        apiUrl: API_BASE_URL,
        mode: 'edit',
        productId: req.params.id
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'ui-service' });
});

// Error handling
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Page Not Found',
        apiUrl: API_BASE_URL
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Error',
        error: err,
        apiUrl: API_BASE_URL
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`\n🚀 UI Server is running!`);
    console.log(`📱 Local:            http://localhost:${PORT}`);
    console.log(`🔌 API Backend:      ${API_BASE_URL}`);
    console.log(`🌍 Environment:      ${process.env.NODE_ENV || 'development'}`);
    console.log(`\n✨ Open http://localhost:${PORT} in your browser\n`);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Error: Port ${PORT} is already in use!`);
        console.error(`\n💡 To fix this, you can:`);
        console.error(`   1. Kill the process using port ${PORT}: lsof -ti:${PORT} | xargs kill`);
        console.error(`   2. Or set a different port: PORT=3001 make dev\n`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
        process.exit(1);
    }
});
