# Command Reference Card

Quick reference for all commands used in the Computer Products Shop project.

## 🚀 First Time Setup

### API Service
```bash
cd apiservices
python3 -m venv venv
source venv/bin/activate          # macOS/Linux
# venv\Scripts\activate           # Windows
make install
```

### UI Service
```bash
cd uiservices
make install
cp .env.example .env              # Create environment file
```

---

## 🏃 Daily Development

### Terminal 1: Start API
```bash
cd apiservices
source venv/bin/activate          # macOS/Linux
# venv\Scripts\activate           # Windows
make run
```
✅ Wait for: `INFO: Application startup complete.`

### Terminal 2: Start UI
```bash
cd uiservices
make dev                          # Development mode with auto-reload
```
✅ Wait for: `Server running on http://localhost:3000`

---

## 🔍 Verification Commands

### Check API is Running
```bash
curl http://localhost:8000/health
# Expected: {"status":"healthy"}
```

### Check Prerequisites
```bash
python3 --version                 # Need 3.8+
node --version                    # Need 16+
npm --version
make --version
```

---

## 📦 Package Management

### API (Python)
```bash
# Install packages
cd apiservices
source venv/bin/activate
pip install <package-name>
pip freeze > requirements.txt     # Save dependencies

# Install from requirements
pip install -r requirements.txt

# List installed packages
pip list
```

### UI (Node.js)
```bash
# Install packages
cd uiservices
npm install <package-name>
npm install <package>@<version>   # Specific version

# Install from package.json
npm install

# List installed packages
npm list --depth=0
```

---

## 🧪 Testing Commands

### API Tests
```bash
cd apiservices
source venv/bin/activate

# Run all tests
make test

# Run tests with coverage
make test-cov

# Run specific test file
pytest tests/test_products.py -v

# Run single test
pytest tests/test_products.py::test_create_product -v
```

### UI Tests
```bash
cd uiservices
npm test                          # Currently no tests
```

---

## 🎨 Code Quality

### API (Python)
```bash
cd apiservices
source venv/bin/activate

# Format code (black)
make format

# Lint code (flake8)
make lint

# Both format and lint
make format && make lint
```

### UI (JavaScript)
```bash
# No linting configured yet
# Use your IDE's built-in linter
```

---

## 📊 Sample Data

### Load Sample Products
```bash
cd apiservices
./scripts/load_sample_data.sh

# macOS/Linux: If permission denied
chmod +x scripts/load_sample_data.sh
./scripts/load_sample_data.sh
```

### API Examples
```bash
cd apiservices
./scripts/api_examples.sh
```

---

## 🌐 API Testing (curl)

### Health Check
```bash
curl http://localhost:8000/health
```

### Get All Products
```bash
curl http://localhost:8000/products
```

### Get One Product
```bash
curl http://localhost:8000/products/1
```

### Create Product
```bash
curl -X POST http://localhost:8000/products \
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

### Update Product
```bash
curl -X PUT http://localhost:8000/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 89.99,
    "stock_quantity": 5
  }'
```

### Delete Product
```bash
curl -X DELETE http://localhost:8000/products/1
```

---

## 🗂️ File Operations

### Navigate Project
```bash
cd ~/path/to/aosmodelapp         # Project root
cd apiservices                    # API directory
cd uiservices                     # UI directory
cd ..                             # Go up one level
pwd                               # Print current directory
```

### View Files
```bash
ls                                # List files
ls -la                            # List all files (including hidden)
cat file.py                       # View file contents
head -n 20 file.py               # View first 20 lines
tail -n 20 file.py               # View last 20 lines
```

### Edit Files
```bash
nano file.py                      # Edit with nano
vim file.py                       # Edit with vim
code .                            # Open in VS Code
```

---

## 🛠️ Maintenance Commands

### Clean Up API
```bash
cd apiservices
make clean                        # Remove venv and cache

# Manual cleanup
rm -rf venv
find . -type d -name "__pycache__" -exec rm -rf {} +
find . -type f -name "*.pyc" -delete
```

### Clean Up UI
```bash
cd uiservices
make clean                        # Remove node_modules

# Manual cleanup
rm -rf node_modules
rm -f package-lock.json
```

### Reinstall Everything
```bash
# API
cd apiservices
make clean
make install

# UI
cd uiservices
make clean
make install
```

---

## 🔌 Port Management

### Check Port Usage
```bash
# macOS/Linux
lsof -i:3000                      # Check port 3000
lsof -i:8000                      # Check port 8000

# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :8000
```

### Kill Process on Port
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill        # Kill process on 3000
lsof -ti:8000 | xargs kill        # Kill process on 8000

# Force kill if needed
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000      # Find PID
taskkill /PID <PID> /F            # Kill using PID
```

---

## 📝 Git Commands

### Basic Git
```bash
git status                        # Check status
git add .                         # Stage all changes
git add file.py                   # Stage specific file
git commit -m "message"          # Commit changes
git push                          # Push to remote
git pull                          # Pull from remote
```

### Branching
```bash
git branch                        # List branches
git branch feature-name          # Create branch
git checkout feature-name        # Switch branch
git checkout -b feature-name     # Create and switch
git merge feature-name           # Merge branch
```

### Viewing Changes
```bash
git log                          # View commit history
git log --oneline               # Compact view
git diff                        # View unstaged changes
git diff --staged              # View staged changes
```

---

## 🔄 Server Control

### Stop Servers
```bash
# In the terminal where server is running:
Ctrl + C                         # Stop server

# Or kill process by port (see Port Management above)
```

### Restart Servers
```bash
# API - In API terminal:
Ctrl + C
make run

# UI - In UI terminal:
Ctrl + C
make dev
```

---

## 🔍 Debugging Commands

### Check Logs
```bash
# API - shows in terminal where you ran `make run`
# UI - shows in terminal where you ran `make dev`
```

### Check Python Environment
```bash
cd apiservices
source venv/bin/activate
which python                     # Should point to venv
python --version
pip list
```

### Check Node Environment
```bash
cd uiservices
which node
node --version
npm --version
npm list --depth=0
```

### Test API Connection from UI
```bash
# In browser console (F12):
fetch('http://localhost:8000/health')
  .then(r => r.json())
  .then(console.log)
```

---

## 📦 Make Commands Summary

### API Service (apiservices/)
```bash
make help         # Show all commands
make install      # Setup virtual env and install
make dev          # Install dev dependencies
make run          # Start server
make test         # Run tests
make test-cov     # Run tests with coverage
make lint         # Check code quality
make format       # Format code
make clean        # Clean up
```

### UI Service (uiservices/)
```bash
make help         # Show all commands
make install      # Install dependencies
make dev          # Start dev server (with auto-reload)
make start        # Start production server
make clean        # Clean up
```

---

## 🌍 Environment Variables

### View Environment (UI)
```bash
cd uiservices
cat .env
```

### Edit Environment (UI)
```bash
cd uiservices
nano .env
# or
code .env
```

### Required .env Contents
```
PORT=3000
API_BASE_URL=http://localhost:8000
NODE_ENV=development
```

---

## 📍 Important URLs

| What | URL | When to Use |
|------|-----|-------------|
| UI Home | http://localhost:3000 | Main interface |
| UI Products | http://localhost:3000/products | Product list |
| API Root | http://localhost:8000 | API info |
| API Docs | http://localhost:8000/docs | Test API interactively |
| API ReDoc | http://localhost:8000/redoc | Alternative API docs |
| API Health | http://localhost:8000/health | Check API status |

---

## 💡 Tips

### Keyboard Shortcuts
- `Ctrl + C` - Stop running process
- `Ctrl + L` - Clear terminal
- `Ctrl + R` - Search command history
- `Tab` - Auto-complete paths/commands

### Quick Navigation
```bash
cd -              # Go to previous directory
cd ~              # Go to home directory
cd ~/Documents    # Absolute path
```

### Multiple Terminals
- Always use at least 2 terminals (API + UI)
- Optional 3rd for testing/debugging
- Keep terminals organized and labeled

---

**Print this page for quick reference while coding!**

For detailed explanations, see:
- [README.md](README.md) - Full setup guide
- [QUICKSTART.md](QUICKSTART.md) - Quick start
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) - Verification steps
