# Quick Start Guide - Computer Products Shop

**⚡ TL;DR: Get the app running in 5 minutes**

## Prerequisites Check

```bash
python3 --version  # Need 3.8+
node --version     # Need 16+
npm --version      # Should show version
make --version     # Optional but helpful
```

Missing something? See full [README.md](README.md#prerequisites) for installation links.

## First Time Setup

```bash
# 1. Clone and enter project
git clone <repository-url>
cd aosmodelapp

# 2. Setup API (Terminal 1)
cd apiservices
python3 -m venv venv
source venv/bin/activate          # macOS/Linux
# venv\Scripts\activate           # Windows
make install

# 3. Setup UI (Terminal 2 - NEW window)
cd uiservices
make install

# 4. Create .env file in uiservices/
cat > .env << EOF
PORT=3000
API_BASE_URL=http://localhost:8000
NODE_ENV=development
EOF
```

## Every Time You Work

### Terminal 1: API Service
```bash
cd apiservices
source venv/bin/activate    # macOS/Linux
# venv\Scripts\activate     # Windows
make run
```
**Wait for**: `INFO: Application startup complete.`  
**Check**: http://localhost:8000

### Terminal 2: UI Service
```bash
cd uiservices
make dev
```
**Wait for**: `Server running on http://localhost:3000`  
**Open**: http://localhost:3000

### Terminal 3: Load Sample Data (Optional)
```bash
cd apiservices
./scripts/load_sample_data.sh
```

## Quick Commands

### API Service (apiservices/)
```bash
make install      # Install dependencies
make run          # Start server (http://localhost:8000)
make test         # Run tests
make test-cov     # Run tests with coverage
make format       # Format code
make lint         # Check code quality
make clean        # Clean up
```

### UI Service (uiservices/)
```bash
make install      # Install dependencies
make dev          # Start dev server with auto-reload
make start        # Start production server
make clean        # Clean up
```

## URLs to Bookmark

| Service | URL | Purpose |
|---------|-----|---------|
| UI Home | http://localhost:3000 | Main web interface |
| UI Products | http://localhost:3000/products | Product catalog |
| API Root | http://localhost:8000 | API welcome message |
| API Docs | http://localhost:8000/docs | Interactive API documentation (Swagger) |
| API Health | http://localhost:8000/health | Check API status |

## Common Issues - Quick Fixes

### Port already in use
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill    # Kill UI
lsof -ti:8000 | xargs kill    # Kill API

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API not found / UI can't connect
1. Is API running? Check http://localhost:8000/health
2. Check `uiservices/.env` file exists with correct API_BASE_URL
3. Restart both services

### Module not found (Python)
```bash
cd apiservices
source venv/bin/activate
pip install -r requirements.txt
```

### Module not found (Node.js)
```bash
cd uiservices
rm -rf node_modules package-lock.json
npm install
```

### Script won't run (macOS/Linux)
```bash
chmod +x scripts/load_sample_data.sh
```

### Virtual env won't activate (Windows PowerShell)
```powershell
# Run PowerShell as Admin
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Testing Workflow

### Test the UI
1. Add a product → Fill form → Submit
2. Search for products → Use search box
3. Filter by category → Select dropdown
4. Edit a product → Click ✏️ button
5. Delete a product → Click 🗑️ button → Confirm

### Test the API
```bash
# Get all products
curl http://localhost:8000/products

# Create a product
curl -X POST http://localhost:8000/products \
  -H "Content-Type: application/json" \
  -d '{"product_name":"Test","description":"Test product","unit_of_measure":"unit","category":"other","price":99.99,"brand":"Test","stock_quantity":10,"specifications":{}}'

# Or use Swagger UI: http://localhost:8000/docs
```

### Run automated tests
```bash
cd apiservices
source venv/bin/activate
make test
```

## Project Structure (Quick Reference)

```
aosmodelapp/
├── apiservices/           # Python/FastAPI backend
│   ├── app/
│   │   ├── main.py       # 👈 API entry point
│   │   ├── models.py     # 👈 Data models
│   │   ├── crud.py       # 👈 Data operations
│   │   └── routers/products.py
│   └── tests/
└── uiservices/           # Node.js/Express frontend
    ├── server.js         # 👈 Server entry point
    ├── views/            # 👈 HTML templates
    └── public/
        ├── css/styles.css    # 👈 Styles
        └── js/               # 👈 Client-side JavaScript
```

## Development Tips

### Making Changes

**Backend (Python):**
- Edit files in `apiservices/app/`
- Server auto-reloads (if using `--reload`)
- Add tests in `apiservices/tests/`

**Frontend (JavaScript/CSS):**
- Edit files in `uiservices/public/`
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Server auto-reloads if using `npm run dev`

**Frontend (Templates):**
- Edit files in `uiservices/views/`
- Restart server to see changes

### Stop the Servers

Press `Ctrl+C` in each terminal window

### Remember

- ⚠️ **Data is NOT saved** - stops when API stops
- ⚠️ **API must run first** - UI depends on it
- ⚠️ **Keep terminals open** - closing stops the service
- ✅ **Use virtual environment** - always activate for API

## Product Categories

When adding products, use these categories:
- `computer`, `laptop`, `keyboard`, `mouse`, `monitor`
- `disk`, `ram`, `processor`, `graphics_card`, `other`

## Sample API Calls

```bash
# Get all products
curl http://localhost:8000/products

# Get one product
curl http://localhost:8000/products/1

# Update product
curl -X PUT http://localhost:8000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 899.99}'

# Delete product
curl -X DELETE http://localhost:8000/products/1
```

## Need More Help?

- 📖 Full guide: [README.md](README.md)
- 🔧 API details: [apiservices/README.md](apiservices/README.md)
- 💻 UI details: [uiservices/README.md](uiservices/README.md)
- 👨‍💻 Developer guide: [CLAUDE.md](CLAUDE.md)

---

**Quick Reference Card** - Print this page for easy access while coding!
