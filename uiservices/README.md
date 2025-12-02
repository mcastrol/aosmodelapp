# Computer Products Shop - UI Service

A modern, responsive web interface for managing computer products inventory. Built with Node.js, Express, and vanilla JavaScript.

## Features

- **Product Management**: Full CRUD operations for computer products
- **Search & Filter**: Find products by name, category, or brand
- **Sorting**: Sort products by name, price, or stock quantity
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Dynamic UI updates without page reloads
- **Modern UI**: Clean, professional interface with smooth animations
- **Category-based Organization**: Products categorized by type (laptops, monitors, etc.)
- **Stock Tracking**: Visual indicators for low stock items

## Project Structure

```
uiservices/
├── server.js              # Express server
├── package.json           # Node.js dependencies
├── .env                   # Environment variables
├── Makefile              # Build automation
├── views/                # EJS templates
│   ├── index.ejs         # Home page
│   ├── products.ejs      # Product listing
│   ├── product-form.ejs  # Create/Edit form
│   └── 404.ejs           # Error page
└── public/               # Static assets
    ├── css/
    │   └── styles.css    # All styles
    └── js/
        ├── api.js        # API client
        ├── home.js       # Home page logic
        ├── products.js   # Product list logic
        └── product-form.js # Form handling
```

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Running API backend (see apiservices folder)

## Quick Start

### 1. Install Dependencies

Using Make (recommended):

```bash
make install
```

Manual installation:

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` if needed:

```bash
PORT=3000
API_BASE_URL=http://localhost:8000
NODE_ENV=development
```

### 3. Start the Backend API

**Important**: The UI requires the API backend to be running. In a separate terminal:

```bash
cd ../apiservices
make run
```

The API should be running at http://localhost:8000

### 4. Start the UI Server

Using Make:

```bash
make dev    # Development mode with auto-reload
# or
make start  # Production mode
```

Manual:

```bash
npm run dev    # Development mode
# or
npm start      # Production mode
```

The UI will be available at http://localhost:3000

## Available Commands

### Make Commands

```bash
make help       # Show available commands
make install    # Install dependencies
make dev        # Run in development mode (with nodemon)
make start      # Run in production mode
make clean      # Remove node_modules and cache
```

### NPM Scripts

```bash
npm install     # Install dependencies
npm start       # Run server
npm run dev     # Run with auto-reload (nodemon)
```

## Using the Application

### Home Page

- View statistics: total products, categories, and stock levels
- Quick access to product catalog
- API status indicator

### Product Catalog

**Viewing Products:**
- Browse all products in a grid layout
- See product details: name, brand, description, price, stock
- Visual category badges with color coding
- Low stock warnings for items with less than 10 units

**Searching & Filtering:**
- **Search**: Type in the search box to filter by name, description, or brand
- **Category Filter**: Filter by product type (laptop, monitor, keyboard, etc.)
- **Brand Filter**: Filter by manufacturer
- **Sort**: Sort by name, price, or stock quantity (ascending/descending)
- **Clear Filters**: Reset all filters at once

### Adding a Product

1. Click "Add New Product" button
2. Fill in the required fields:
   - Product name
   - Description
   - Category
   - Brand
   - Price
   - Stock quantity
   - Unit of measure
3. Optionally add specifications (key-value pairs):
   - Click "+ Add Specification"
   - Enter specification name and value
   - Add multiple specifications as needed
4. Click "Create Product"

### Editing a Product

1. Find the product in the catalog
2. Click the edit button (✏️)
3. Modify the fields as needed
4. Click "Update Product"

### Deleting a Product

1. Find the product in the catalog
2. Click the delete button (🗑️)
3. Confirm deletion in the modal dialog

## API Integration

The UI communicates with the backend API at `http://localhost:8000` (configurable via `.env`).

### API Client

The application includes a JavaScript API client (`public/js/api.js`) that handles all HTTP requests:

```javascript
// Get all products
const products = await api.getAllProducts();

// Get single product
const product = await api.getProduct(id);

// Create product
const newProduct = await api.createProduct(productData);

// Update product
const updated = await api.updateProduct(id, productData);

// Delete product
await api.deleteProduct(id);

// Search products
const results = await api.searchProducts({ category: 'laptop' });
```

### Error Handling

The UI provides user-friendly error messages for:
- Network errors
- API unavailability
- Validation errors
- Server errors

## Styling & Design

### Color Scheme

- Primary: Blue (`#2563eb`)
- Success: Green (`#10b981`)
- Danger: Red (`#ef4444`)
- Warning: Orange (`#f59e0b`)

### Category Colors

Each product category has a unique color:
- 💻 Computer: Blue
- 💼 Laptop: Purple
- ⌨️ Keyboard: Pink
- 🖱️ Mouse: Orange
- 🖥️ Monitor: Green
- 💾 Storage: Indigo
- 🎮 Graphics Card: Purple
- 🧮 Processor: Red
- 📦 RAM: Teal

### Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## Development

### File Organization

**Server Side:**
- `server.js`: Express server configuration and routes
- `views/`: EJS templates for server-side rendering

**Client Side:**
- `public/css/`: Stylesheets
- `public/js/`: JavaScript modules
- `public/images/`: Image assets (if needed)

### Adding New Features

1. **New Page**: Create EJS template in `views/`, add route in `server.js`
2. **New API Endpoint**: Add method to `api.js` client
3. **New Styles**: Add to `public/css/styles.css`
4. **New JavaScript**: Create module in `public/js/`

### Development Mode

Development mode uses `nodemon` for auto-reloading when files change:

```bash
npm run dev
```

Changes to any `.js` or `.ejs` files will automatically restart the server.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Port for the UI server |
| `API_BASE_URL` | http://localhost:8000 | Backend API URL |
| `NODE_ENV` | development | Environment mode |

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### UI doesn't load products

**Problem**: Products page is empty or shows "Failed to load products"

**Solutions**:
1. Ensure the API backend is running at http://localhost:8000
2. Check the API health at http://localhost:8000/health
3. Check browser console for errors
4. Verify `.env` file has correct `API_BASE_URL`

### CORS errors

**Problem**: Browser console shows CORS errors

**Solution**: The API needs to allow requests from the UI origin. This is typically handled automatically if both services run on localhost.

### Port already in use

**Problem**: Error "Port 3000 is already in use"

**Solutions**:
1. Stop other processes using port 3000
2. Change `PORT` in `.env` file to another port (e.g., 3001)
3. Find and kill the process: `lsof -ti:3000 | xargs kill`

### Styles not loading

**Problem**: Page appears unstyled

**Solutions**:
1. Clear browser cache
2. Check browser console for 404 errors
3. Verify `public/css/styles.css` exists
4. Restart the server

## Performance Tips

1. **Pagination**: For large product catalogs (100+ items), consider implementing pagination
2. **Caching**: Add browser caching headers for static assets
3. **Image Optimization**: If adding product images, use optimized formats (WebP, optimized JPG)
4. **Lazy Loading**: Implement lazy loading for large product lists

## Security Considerations

1. **Input Validation**: All user inputs are validated client-side and server-side
2. **XSS Prevention**: HTML is properly escaped using `escapeHtml()` function
3. **HTTPS**: Use HTTPS in production
4. **Environment Variables**: Never commit `.env` files
5. **Dependencies**: Regularly update dependencies for security patches

## Production Deployment

### Preparation

1. Set environment to production:
   ```bash
   NODE_ENV=production
   ```

2. Use production API URL:
   ```bash
   API_BASE_URL=https://your-api-domain.com
   ```

3. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name computer-shop-ui
   ```

### Recommended Setup

- Use a reverse proxy (Nginx, Apache)
- Enable HTTPS with Let's Encrypt
- Set up logging and monitoring
- Configure auto-restart on failure
- Enable GZIP compression
- Set up CDN for static assets

## Testing

Currently, the application focuses on manual testing through the UI. For automated testing:

**Recommended Tools:**
- Jest for unit tests
- Cypress for E2E tests
- Testing Library for component tests

## Future Enhancements

- [ ] Pagination for product list
- [ ] Advanced search with multiple filters
- [ ] Product image upload and display
- [ ] User authentication and authorization
- [ ] Shopping cart functionality
- [ ] Order management
- [ ] Export products to CSV/Excel
- [ ] Print product labels
- [ ] Bulk product operations
- [ ] Product categories management
- [ ] Inventory alerts
- [ ] Analytics dashboard

## License

This project is available for use under your organization's standard licensing terms.

## Support

For issues or questions:
1. Check this README
2. Review the API documentation in `../apiservices/README.md`
3. Check browser console for errors
4. Verify API backend is running and healthy

## Related Documentation

- [API Service Documentation](../apiservices/README.md)
- [API Scripts and Examples](../apiservices/scripts/README.md)
