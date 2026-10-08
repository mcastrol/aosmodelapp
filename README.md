# Computer Products Shop Application

A full-stack web application for managing computer products inventory with a REST API backend and a responsive web interface.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Step-by-Step Setup Guide](#step-by-step-setup-guide)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [Additional Resources](#additional-resources)

## 🎯 Project Overview

This application consists of two separate services:

1. **API Service** (`apiservices/`) - A REST API built with FastAPI (Python) that manages product data
2. **UI Service** (`uiservices/`) - A web interface built with Express.js (Node.js) and EJS templates

**Important**: The API service must be running before you start the UI service, as the UI depends on the API to fetch and manage data.

## 📦 Prerequisites

Before you begin, make sure you have the following installed on your computer:

### Required Software

#### 1. Python 3.8 or higher

**Check if installed:**
```bash
python3 --version
```

**Recommended versions:** Python 3.10, 3.11, 3.12, or 3.13  
**Also works with:** Python 3.14+ (latest packages support it)

**Installation:**
- **macOS**: Python 3 usually comes pre-installed. If not, download from [python.org](https://www.python.org/downloads/)
- **Windows**: Download from [python.org](https://www.python.org/downloads/) (make sure to check "Add Python to PATH" during installation)
- **Linux**: 
  ```bash
  sudo apt update
  sudo apt install python3 python3-pip python3-venv
  ```

**Note:** If you have Python 3.14 (very new), the project has been updated to use compatible package versions.

#### 2. Node.js 16.x or higher

**Check if installed:**
```bash
node --version
npm --version
```

**Installation:**
- Download from [nodejs.org](https://nodejs.org/) (LTS version recommended)
- Or use [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager):
  ```bash
  # macOS/Linux
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  nvm install 16
  ```

#### 3. Make (Optional but Recommended)

**Check if installed:**
```bash
make --version
```

**Installation:**
- **macOS**: Install Xcode Command Line Tools:
  ```bash
  xcode-select --install
  ```
- **Windows**: Install via [Chocolatey](https://chocolatey.org/):
  ```bash
  choco install make
  ```
  Or use Git Bash which includes make
- **Linux**: Usually pre-installed. If not:
  ```bash
  sudo apt install build-essential
  ```

#### 4. Git (for cloning the repository)

**Check if installed:**
```bash
git --version
```

**Installation:**
- Download from [git-scm.com](https://git-scm.com/downloads)

## 🚀 Step-by-Step Setup Guide

Follow these steps carefully to set up the project on your machine.

### Step 1: Clone the Repository

Open your terminal (Command Prompt on Windows, Terminal on macOS/Linux) and run:

```bash
# Navigate to where you want to store the project
cd ~/Documents  # or any directory you prefer

# Clone the repository
git clone <repository-url>

# Navigate into the project folder
cd aosmodelapp
```

**Note**: If you downloaded the project as a ZIP file instead, extract it and navigate to the folder:
```bash
cd path/to/aosmodelapp
```

### Step 2: Set Up the API Service (Backend)

The API service runs on Python and needs its own virtual environment.

```bash
# Navigate to the API service directory
cd apiservices

# Create a Python virtual environment
# This keeps project dependencies isolated
python3 -m venv venv

# Activate the virtual environment
# macOS/Linux:
source venv/bin/activate

# Windows:
# venv\Scripts\activate

# Install dependencies
# Option 1: Using Make (recommended)
make install

# Option 2: Manual installation
pip install --upgrade pip
pip install -r requirements.txt

# Your terminal should now show (venv) at the beginning of the prompt
# This means the virtual environment is active
```

**Expected output**: You should see packages being installed, ending with a success message.

### Step 3: Set Up the UI Service (Frontend)

Open a **NEW terminal window/tab** (keep the API terminal open) and run:

```bash
# Navigate to the project root
cd path/to/aosmodelapp

# Navigate to the UI service directory
cd uiservices

# Install Node.js dependencies
# Option 1: Using Make (recommended)
make install

# Option 2: Manual installation
npm install
```

**Expected output**: You should see a progress bar as npm downloads and installs packages, followed by a summary of installed packages.

### Step 4: Configure Environment Variables

The UI service needs to know where the API is running.

```bash
# You should still be in the uiservices directory
# Check if .env file exists
ls -la .env

# If .env doesn't exist, create it from the example
# Or create it manually with the following content:
```

Create a file named `.env` in the `uiservices/` directory with this content:

```
PORT=3000
API_BASE_URL=http://localhost:8000
NODE_ENV=development
```

**macOS/Linux quick command:**
```bash
cat > .env << EOF
PORT=3000
API_BASE_URL=http://localhost:8000
NODE_ENV=development
EOF
```

**Windows**: Create the file using Notepad or your text editor.

## 🏃 Running the Application

You need to run both services. **Order matters**: Start the API first, then the UI.

### Terminal 1: Start the API Service

```bash
# Navigate to API directory (if not already there)
cd path/to/aosmodelapp/apiservices

# Activate virtual environment if not already active
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# Start the API server
# Option 1: Using Make
make run

# Option 2: Manual start
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using StatReload
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**✅ Verify API is running:**
- Open your web browser
- Go to http://localhost:8000
- You should see: `{"message":"Welcome to Computer Products API","docs":"/docs","redoc":"/redoc"}`
- Visit http://localhost:8000/docs to see the interactive API documentation

**Keep this terminal running!** Do not close it.

### Terminal 2: Start the UI Service

Open a **NEW terminal window/tab** and run:

```bash
# Navigate to UI directory
cd path/to/aosmodelapp/uiservices

# Start the UI server
# Option 1: Using Make (with auto-reload for development)
make dev

# Option 2: Manual start (development mode)
npm run dev

# Option 3: Production mode (no auto-reload)
npm start
```

**Expected output:**
```
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,ejs
[nodemon] starting `node server.js`
Server running on http://localhost:3000
```

**✅ Verify UI is running:**
- Open your web browser
- Go to http://localhost:3000
- You should see the Computer Products Shop home page

**Keep this terminal running too!**

### You're Ready! 🎉

You should now have:
- ✅ API running on http://localhost:8000
- ✅ UI running on http://localhost:3000
- ✅ Two terminal windows open (one for each service)

## 🧪 Testing the Application

### 1. Load Sample Data

To make testing easier, load some sample products:

```bash
# Open a THIRD terminal window
cd path/to/aosmodelapp/apiservices

# Run the sample data script
./scripts/load_sample_data.sh

# macOS/Linux - if you get "permission denied":
chmod +x ./scripts/load_sample_data.sh
./scripts/load_sample_data.sh

# Windows (use Git Bash or run the commands manually)
```

This will add 16 sample products (laptops, monitors, keyboards, etc.) to your inventory.

### 2. Test the UI Features

**View Products:**
1. Go to http://localhost:3000
2. Click "View Product Catalog"
3. You should see all the sample products

**Add a Product:**
1. Click "Add New Product"
2. Fill in the form (all fields except specifications are required)
3. Add some specifications (optional):
   - Click "+ Add Specification"
   - Example: Key: "RAM", Value: "16GB"
4. Click "Create Product"
5. You should be redirected to the product list

**Search/Filter:**
1. On the products page, try the search box
2. Use the category filter dropdown
3. Try sorting by price or stock

**Edit a Product:**
1. Click the edit button (✏️) on any product
2. Modify some fields
3. Click "Update Product"

**Delete a Product:**
1. Click the delete button (🗑️) on any product
2. Confirm the deletion in the modal

### 3. Test the API Directly

You can also interact with the API directly:

**Using the Swagger UI:**
1. Go to http://localhost:8000/docs
2. Try the "GET /products" endpoint - click "Try it out" then "Execute"
3. Try creating a product with "POST /products"

**Using curl (in a terminal):**
```bash
# Get all products
curl http://localhost:8000/products

# Get health status
curl http://localhost:8000/health

# Create a product
curl -X POST "http://localhost:8000/products" \
  -H "Content-Type: application/json" \
  -d '{
    "product_name": "Test Product",
    "description": "A test product",
    "unit_of_measure": "unit",
    "category": "other",
    "price": 99.99,
    "brand": "Test Brand",
    "stock_quantity": 10,
    "specifications": {}
  }'
```

### 4. Run Automated Tests

The API has automated tests:

```bash
# Terminal in apiservices directory
# Make sure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# Install test dependencies (first time only)
make dev

# Run tests
make test

# Run tests with coverage report
make test-cov
```

## 🔧 Troubleshooting

### Problem: "Port already in use" error

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

**Find and kill the process using the port:**

```bash
# macOS/Linux - Find process on port 3000
lsof -ti:3000

# Kill the process
lsof -ti:3000 | xargs kill

# For port 8000 (API)
lsof -ti:8000 | xargs kill

# Windows - Find process on port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with the number from above)
taskkill /PID <PID> /F
```

**Or change the port:**
- For UI: Edit `uiservices/.env` and change `PORT=3000` to `PORT=3001`
- For API: Use `uvicorn app.main:app --reload --port 8001`

### Problem: "Module not found" or "Command not found"

**For Python/API:**
```bash
# Make sure virtual environment is activated
# You should see (venv) in your terminal prompt
cd apiservices
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

**For Node.js/UI:**
```bash
# Reinstall dependencies
cd uiservices
rm -rf node_modules package-lock.json
npm install
```

### Problem: UI shows "Failed to load products"

**Checklist:**
1. ✅ Is the API running? Check http://localhost:8000/health
2. ✅ Is the `.env` file correct in `uiservices/`?
3. ✅ Check browser console (F12) for error messages
4. ✅ Check API terminal for error messages

**Solution:**
```bash
# Restart the API
# In API terminal: Press Ctrl+C, then:
make run

# Refresh the browser page
```

### Problem: "venv: command not found" or "python3: command not found"

**Solution:**
- Python is not installed or not in PATH
- Reinstall Python from [python.org](https://www.python.org/downloads/)
- On Windows, make sure to check "Add Python to PATH" during installation

### Problem: Changes to code not reflecting

**For API:**
- The server should auto-reload with `--reload` flag
- If not, restart the server (Ctrl+C, then `make run`)

**For UI:**
- If using `npm run dev` (with nodemon), it should auto-reload
- For JavaScript/CSS changes: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- For EJS template changes: Restart the server

### Problem: Sample data script doesn't work

**macOS/Linux:**
```bash
# Make script executable
chmod +x scripts/load_sample_data.sh

# Run it
./scripts/load_sample_data.sh
```

**Windows:**
- Use Git Bash to run the script
- Or copy the curl commands from the script and run them one by one in Command Prompt

### Problem: Virtual environment won't activate on Windows

**If you get "scripts is disabled on this system":**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try activating again
cd path\to\aosmodelapp\apiservices
venv\Scripts\activate
```

### Problem: "Failed building wheel for pydantic-core" error

**Symptoms:**
```
ERROR: Failed building wheel for pydantic-core
TypeError: ForwardRef._evaluate() missing 1 required keyword-only argument
```

**Cause:** You're using a very new Python version (like 3.14) with outdated package versions.

**Solution - Already Fixed!** The `requirements.txt` has been updated to use newer package versions that support Python 3.14+. Just run:
```bash
cd apiservices
make clean
make install
```

**Alternative:** Use Python 3.10-3.13 if you prefer more stable versions:
```bash
# macOS/Linux - Install specific version with pyenv
pyenv install 3.12.0
pyenv local 3.12.0

# Then create venv with that version
python3.12 -m venv venv
```

## 📁 Project Structure

```
aosmodelapp/
├── README.md                 # This file
├── CLAUDE.md                # Developer guide
├── apiservices/             # Backend API service
│   ├── app/
│   │   ├── main.py         # FastAPI application
│   │   ├── models.py       # Data models
│   │   ├── crud.py         # Database operations
│   │   └── routers/
│   │       └── products.py # Product endpoints
│   ├── tests/              # Automated tests
│   ├── scripts/            # Utility scripts
│   ├── requirements.txt    # Python dependencies
│   ├── Makefile           # Build automation
│   └── README.md          # API documentation
└── uiservices/             # Frontend UI service
    ├── server.js          # Express server
    ├── views/             # EJS templates
    ├── public/
    │   ├── css/          # Stylesheets
    │   └── js/           # Client-side JavaScript
    ├── package.json      # Node.js dependencies
    ├── Makefile         # Build automation
    ├── .env             # Environment config (create this)
    └── README.md        # UI documentation
```

## 📚 Additional Resources

### Learning Resources

**Python & FastAPI:**
- [FastAPI Official Documentation](https://fastapi.tiangolo.com/)
- [Python Official Tutorial](https://docs.python.org/3/tutorial/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

**Node.js & Express:**
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [EJS Documentation](https://ejs.co/)

**JavaScript:**
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)

### Next Steps for Students

1. **Explore the code:**
   - Read through `apiservices/app/main.py` to understand the API structure
   - Look at `uiservices/public/js/products.js` to see how the UI works
   - Check `apiservices/app/models.py` to understand data validation

2. **Make modifications:**
   - Add a new product category
   - Add a new field to products (e.g., "warranty_months")
   - Add a new feature to the UI (e.g., product images)

3. **Experiment:**
   - Try the interactive API docs at http://localhost:8000/docs
   - Modify the sample data script to add your own products
   - Change the UI colors/styles in `uiservices/public/css/styles.css`

4. **Learn about testing:**
   - Run the tests with `make test` in apiservices
   - Read the test files in `apiservices/tests/`
   - Try writing a new test

### Detailed Documentation

For more detailed information about each service:
- API Service: See `apiservices/README.md`
- UI Service: See `uiservices/README.md`
- Developer Guide: See `CLAUDE.md`

## ❓ Getting Help

If you run into issues:

1. **Check the Troubleshooting section above**
2. **Check browser console** (Press F12 in browser)
3. **Check terminal output** for error messages
4. **Read the error message carefully** - it often tells you exactly what's wrong
5. **Google the error message** - someone else has likely had the same issue
6. **Ask your instructor** with:
   - What you were trying to do
   - The exact error message
   - What you've already tried

## 📝 Important Notes

- **Data is not saved**: The API uses in-memory storage. When you stop the API server, all data is lost. This is intentional for learning purposes.
- **Both services needed**: The application needs both the API and UI running to work properly.
- **Terminal windows**: Keep both terminal windows open while working with the application.
- **Port numbers**: Make sure no other applications are using ports 8000 or 3000.

## 🎓 For Instructors

This project is designed for teaching:
- RESTful API concepts with FastAPI
- Frontend-backend integration
- CRUD operations
- Modern web development practices
- Virtual environments and dependency management
- API testing with pytest

The in-memory storage keeps setup simple while focusing on API and UI concepts. It's easy to extend to use a real database (PostgreSQL, MySQL) as a next step.

---

**Happy Coding! 🚀**

If you have questions or suggestions for improving this guide, please let your instructor know.
