# Setup Verification Checklist

Use this checklist to verify your Computer Products Shop setup is correct.

## ✅ Pre-Setup Checklist

Before you begin, verify you have the required software:

- [ ] **Python 3.8+** installed
  ```bash
  python3 --version
  # Should show: Python 3.8.x or higher
  ```

- [ ] **Node.js 16+** installed
  ```bash
  node --version
  # Should show: v16.x.x or higher
  
  npm --version
  # Should show a version number
  ```

- [ ] **Make** installed (optional but recommended)
  ```bash
  make --version
  # Should show GNU Make version
  ```

- [ ] **Git** installed
  ```bash
  git --version
  # Should show git version
  ```

## ✅ Installation Checklist

### API Service Setup

- [ ] **Navigate to apiservices directory**
  ```bash
  cd apiservices
  pwd
  # Should end with: .../aosmodelapp/apiservices
  ```

- [ ] **Create virtual environment**
  ```bash
  python3 -m venv venv
  ls -la venv
  # Should see venv directory created
  ```

- [ ] **Activate virtual environment**
  ```bash
  # macOS/Linux:
  source venv/bin/activate
  
  # Windows:
  venv\Scripts\activate
  
  # Your prompt should now show (venv)
  ```

- [ ] **Install dependencies**
  ```bash
  make install
  # OR
  pip install -r requirements.txt
  
  # Should complete without errors
  ```

- [ ] **Verify FastAPI installed**
  ```bash
  pip list | grep fastapi
  # Should show: fastapi and version number
  ```

- [ ] **Verify uvicorn installed**
  ```bash
  pip list | grep uvicorn
  # Should show: uvicorn and version number
  ```

### UI Service Setup

- [ ] **Navigate to uiservices directory** (in a NEW terminal)
  ```bash
  cd uiservices
  pwd
  # Should end with: .../aosmodelapp/uiservices
  ```

- [ ] **Install dependencies**
  ```bash
  make install
  # OR
  npm install
  
  # Should complete without errors
  ```

- [ ] **Verify node_modules created**
  ```bash
  ls -la node_modules
  # Should see directory with many packages
  ```

- [ ] **Create .env file**
  ```bash
  # Option 1: Copy from example
  cp .env.example .env
  
  # Option 2: Create manually
  cat > .env << EOF
  PORT=3000
  API_BASE_URL=http://localhost:8000
  NODE_ENV=development
  EOF
  ```

- [ ] **Verify .env file exists**
  ```bash
  cat .env
  # Should show:
  # PORT=3000
  # API_BASE_URL=http://localhost:8000
  # NODE_ENV=development
  ```

## ✅ Running Services Checklist

### Start API Service

- [ ] **API virtual environment activated**
  ```bash
  # Should see (venv) in prompt
  # If not:
  cd apiservices
  source venv/bin/activate  # macOS/Linux
  # venv\Scripts\activate   # Windows
  ```

- [ ] **Start API server**
  ```bash
  make run
  # OR
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  ```

- [ ] **Verify API started successfully**
  - Look for: `INFO: Application startup complete.`
  - Look for: `INFO: Uvicorn running on http://0.0.0.0:8000`
  - No error messages

- [ ] **Test API root endpoint**
  ```bash
  # In a new terminal:
  curl http://localhost:8000
  
  # Should return:
  # {"message":"Welcome to Computer Products API","docs":"/docs","redoc":"/redoc"}
  ```

- [ ] **Test API health endpoint**
  ```bash
  curl http://localhost:8000/health
  
  # Should return:
  # {"status":"healthy"}
  ```

- [ ] **Test API docs in browser**
  - Open: http://localhost:8000/docs
  - Should see Swagger UI with API documentation
  - Should see endpoints listed: /, /health, /products

### Start UI Service

- [ ] **Start UI server** (in a NEW terminal)
  ```bash
  cd uiservices
  make dev
  # OR
  npm run dev
  ```

- [ ] **Verify UI started successfully**
  - Look for: `Server running on http://localhost:3000`
  - No error messages

- [ ] **Test UI in browser**
  - Open: http://localhost:3000
  - Should see "Computer Products Shop" home page
  - Should see statistics section
  - Should see "View Product Catalog" button
  - No console errors (press F12 to check)

## ✅ Functionality Checklist

### Basic Navigation

- [ ] **Home page loads**
  - Visit: http://localhost:3000
  - Page displays correctly
  - No errors in browser console (F12)

- [ ] **Products page loads**
  - Click "View Product Catalog"
  - Page displays correctly
  - Shows "No products yet" message (if no data loaded)

- [ ] **Add product page loads**
  - Click "Add New Product"
  - Form displays correctly
  - All fields visible

### Load Sample Data

- [ ] **Load sample products**
  ```bash
  # In a new terminal:
  cd apiservices
  chmod +x scripts/load_sample_data.sh  # macOS/Linux only
  ./scripts/load_sample_data.sh
  
  # Should see: "Loading 16 sample products..."
  # Should see: "Sample data loaded successfully!"
  ```

- [ ] **Verify products loaded**
  - Refresh products page: http://localhost:3000/products
  - Should see 16 products displayed
  - Products should have images, names, prices
  - Categories should have colored badges

### CRUD Operations

- [ ] **Read - View product list**
  - Products display in grid
  - Can see product details (name, brand, price, stock)
  - Category badges show correct colors

- [ ] **Create - Add new product**
  - Click "Add New Product"
  - Fill all required fields:
    - Product name: "Test Laptop"
    - Description: "A test product"
    - Category: Select "laptop"
    - Brand: "Test Brand"
    - Price: 999.99
    - Stock: 10
    - Unit: Select "unit"
  - Add a specification:
    - Click "+ Add Specification"
    - Key: "RAM", Value: "16GB"
  - Click "Create Product"
  - Should redirect to products page
  - New product should appear in list

- [ ] **Update - Edit product**
  - Find the test product you just created
  - Click edit button (✏️)
  - Change price to 899.99
  - Click "Update Product"
  - Should redirect to products page
  - Price should be updated

- [ ] **Delete - Remove product**
  - Find the test product
  - Click delete button (🗑️)
  - Confirm deletion in modal
  - Product should disappear from list

### Search and Filter

- [ ] **Search by name**
  - Type "Dell" in search box
  - Should filter to show only Dell products
  - Clear search - all products return

- [ ] **Filter by category**
  - Select "laptop" from category dropdown
  - Should show only laptops
  - Select "All Categories" - all products return

- [ ] **Sort products**
  - Select "Sort by: Price (Low to High)"
  - Products should reorder by price ascending
  - Try "Price (High to Low)" - should reverse
  - Try "Stock (Low to High)" - should sort by quantity

## ✅ Development Tools Checklist

### API Testing

- [ ] **Swagger UI works**
  - Visit: http://localhost:8000/docs
  - Click on "GET /products"
  - Click "Try it out"
  - Click "Execute"
  - Should see response with products array

- [ ] **Run API tests**
  ```bash
  cd apiservices
  source venv/bin/activate
  make test
  
  # Should see:
  # - All tests passing (green)
  # - No failures or errors
  ```

### Code Quality (API)

- [ ] **Run linter**
  ```bash
  cd apiservices
  make lint
  
  # Should complete with no errors
  # Or show only minor warnings
  ```

- [ ] **Run formatter**
  ```bash
  cd apiservices
  make format
  
  # Should complete successfully
  ```

## ✅ Browser Compatibility

Test in at least one browser:

- [ ] **Chrome/Edge**
  - All features work
  - No console errors
  - Responsive design works

- [ ] **Firefox**
  - All features work
  - No console errors
  - Responsive design works

- [ ] **Safari** (macOS only)
  - All features work
  - No console errors
  - Responsive design works

## ✅ Common Issues Verification

### No Port Conflicts

- [ ] **Port 8000 available**
  ```bash
  # macOS/Linux:
  lsof -i:8000
  # Should return nothing (port free)
  # Or show only the running API
  
  # Windows:
  netstat -ano | findstr :8000
  ```

- [ ] **Port 3000 available**
  ```bash
  # macOS/Linux:
  lsof -i:3000
  # Should show only the running UI
  
  # Windows:
  netstat -ano | findstr :3000
  ```

### Correct Dependencies

- [ ] **Python packages correct**
  ```bash
  cd apiservices
  source venv/bin/activate
  pip list
  
  # Should see (at minimum):
  # - fastapi
  # - uvicorn
  # - pydantic
  ```

- [ ] **Node packages correct**
  ```bash
  cd uiservices
  npm list --depth=0
  
  # Should see:
  # - express
  # - ejs
  # - dotenv
  # - morgan
  ```

### Environment Configuration

- [ ] **.env file correct**
  ```bash
  cd uiservices
  cat .env
  
  # Should show:
  # PORT=3000
  # API_BASE_URL=http://localhost:8000
  # NODE_ENV=development
  ```

- [ ] **CORS configured correctly**
  ```bash
  # Check apiservices/app/main.py
  grep -A 5 "allow_origins" apiservices/app/main.py
  
  # Should see:
  # allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"]
  ```

## ✅ Final Verification

### System Ready Checklist

- [ ] Both terminals running (API and UI)
- [ ] API accessible at http://localhost:8000
- [ ] UI accessible at http://localhost:3000
- [ ] Sample data loaded successfully
- [ ] Can create, read, update, delete products
- [ ] Search and filter work correctly
- [ ] No errors in browser console
- [ ] No errors in API terminal
- [ ] No errors in UI terminal

### You're Ready If:

✅ All boxes above are checked  
✅ Both services start without errors  
✅ You can view, create, edit, and delete products  
✅ API documentation is accessible  
✅ No console errors in browser  

## 🎯 Next Steps

Now that your setup is verified, you can:

1. **Explore the code**
   - Read `apiservices/app/main.py`
   - Read `uiservices/server.js`
   - Read `uiservices/public/js/products.js`

2. **Make changes**
   - Add a new product category
   - Change UI colors
   - Add a new field to products

3. **Learn more**
   - Read [README.md](README.md) for detailed guide
   - Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design
   - Read [QUICKSTART.md](QUICKSTART.md) for quick reference

## 📝 Troubleshooting

If any checkbox above is not checked:

1. **Read the error message carefully**
2. **Check the Troubleshooting section** in [README.md](README.md)
3. **Verify prerequisites** are correctly installed
4. **Ask for help** with:
   - What checkbox failed
   - The exact error message
   - What you've already tried

---

**Save this file!** You can use it every time you set up the project on a new machine or help troubleshoot issues.
