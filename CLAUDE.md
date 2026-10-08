# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a computer products shop application with two main services:

- **apiservices**: FastAPI-based REST API for managing computer products inventory
- **uiservices**: Node.js/Express web UI with EJS templates and vanilla JavaScript

Both services run independently but the UI depends on the API backend. The API must be running before starting the UI.

## Architecture

### API Service (apiservices/)

**Tech Stack**: Python 3.8+, FastAPI, Pydantic, uvicorn

**Data Model**:
- Uses Pydantic models for validation (`app/models.py`)
- In-memory storage (no database persistence) - all data is lost on restart
- Products have: name, description, category, brand, price, stock_quantity, unit_of_measure, and flexible specifications (key-value dict)
- Categories and units of measure are defined as enums

**Structure**:
- `app/main.py`: FastAPI app entry point with CORS configuration for localhost:3000
- `app/models.py`: Pydantic models (ProductBase, ProductCreate, ProductUpdate, Product)
- `app/crud.py`: CRUD operations and in-memory storage
- `app/routers/products.py`: Product endpoints (/products)
- `tests/test_products.py`: pytest tests for API endpoints

**Key Points**:
- CORS is configured to allow requests from http://localhost:3000 (UI)
- Data is stored in-memory in a list - no persistence between restarts
- IDs are auto-incremented integers
- Specifications field is a flexible dict for product-specific attributes

### UI Service (uiservices/)

**Tech Stack**: Node.js 16+, Express, EJS, vanilla JavaScript

**Structure**:
- `server.js`: Express server, serves EJS templates and static files
- `views/`: EJS templates (index, products, product-form, 404)
- `public/js/`: Client-side JavaScript modules
  - `api.js`: API client wrapper for backend communication
  - `home.js`: Home page logic and stats
  - `products.js`: Product listing with search/filter/sort
  - `product-form.js`: Create/edit form handling
- `public/css/styles.css`: All styles, includes category-specific colors
- `.env`: Environment configuration (PORT, API_BASE_URL)

**Key Points**:
- Server-side rendering with EJS, enhanced with client-side JavaScript
- API client in `public/js/api.js` handles all HTTP requests to backend
- Search, filter, and sort implemented client-side
- Real-time UI updates without page reloads

## Development Workflow

### Running Both Services

**API Service** (must start first):
```bash
cd apiservices
make install        # First time only
make run           # Starts on port 8000
```

**UI Service** (in separate terminal):
```bash
cd uiservices
make install        # First time only
make dev           # Development mode with auto-reload on port 3000
```

Access points:
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs (Swagger UI)
- UI: http://localhost:3000

### Testing

**API Tests**:
```bash
cd apiservices
make dev           # Install test dependencies (first time)
make test          # Run all tests
make test-cov      # Run tests with coverage report
pytest tests/test_products.py -v  # Run specific test file
pytest tests/test_products.py::test_name -v  # Run single test
```

**UI**: No automated tests currently. Test manually through the browser.

### Code Quality

**API**:
```bash
cd apiservices
make format        # Format with black (line length 120)
make lint          # Lint with flake8 (max line length 120)
```

**UI**: No linters configured. Follow existing code style in `public/js/` and `server.js`.

### Loading Sample Data

```bash
cd apiservices
./scripts/load_sample_data.sh    # Loads 16 sample products (requires API running)
./scripts/api_examples.sh        # Shows API usage examples
```

## Common Tasks

### Adding a New Product Category

1. Add to `CategoryEnum` in `apiservices/app/models.py`
2. Update category filter in `uiservices/public/js/products.js`
3. Add category color in `uiservices/public/css/styles.css` (`.category-badge.{category}`)

### Adding a New API Endpoint

1. Add route handler in `apiservices/app/routers/products.py`
2. Add corresponding method to `uiservices/public/js/api.js` if UI needs it
3. Write tests in `apiservices/tests/test_products.py`

### Modifying Product Model

1. Update Pydantic models in `apiservices/app/models.py`
2. Update CRUD operations in `apiservices/app/crud.py` if needed
3. Update UI form in `uiservices/views/product-form.ejs`
4. Update form handling in `uiservices/public/js/product-form.js`

## Important Notes

- **Data Persistence**: The API uses in-memory storage. All data is lost when the API server restarts. This is intentional for the current implementation but noted as a future enhancement.
- **Port Conflicts**: If ports 8000 or 3000 are in use, update `.env` in uiservices or pass different ports to uvicorn/node.
- **CORS**: The API only allows requests from localhost:3000. To add more origins, update `app/main.py` CORS configuration.
- **Python Virtual Environment**: The API uses a venv in `apiservices/venv/`. Always activate it before manual Python operations: `source apiservices/venv/bin/activate`
- **Product Specifications**: The specifications field is a flexible dict - no schema validation. Add any key-value pairs relevant to the product type.

## Technology Decisions

- **FastAPI** for API: Modern, fast, auto-generated docs, good type safety with Pydantic
- **In-memory storage**: Simplicity for initial implementation, database integration planned for future
- **EJS templates**: Server-side rendering for initial page load, enhanced with vanilla JavaScript
- **Vanilla JavaScript**: No framework overhead, keeps bundle small, suitable for CRUD operations
- **Make**: Cross-platform build automation, simpler than npm scripts for Python projects
