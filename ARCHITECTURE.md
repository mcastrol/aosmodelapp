# Architecture Overview

This document explains how the Computer Products Shop application is organized and how its components work together.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Web Browser                               │
│                     (http://localhost:3000)                      │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Home Page   │  │   Products   │  │ Product Form │          │
│  │  (index.ejs) │  │(products.ejs)│  │  (form.ejs)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                            │                                     │
│                   Client-Side JavaScript                         │
│         ┌──────────────────┴──────────────────┐                 │
│         │                                      │                 │
│    ┌────▼────┐  ┌─────────┐  ┌──────────┐  ┌─┴──────┐         │
│    │ api.js  │  │home.js  │  │products  │  │  form  │         │
│    │(HTTP    │  │(stats)  │  │.js       │  │  .js   │         │
│    │ client) │  └─────────┘  │(search/  │  │(CRUD)  │         │
│    └────┬────┘               │ filter)  │  └────────┘         │
│         │                    └──────────┘                       │
└─────────┼──────────────────────────────────────────────────────┘
          │
          │ HTTP Requests (GET, POST, PUT, DELETE)
          │ JSON Data
          │
┌─────────▼──────────────────────────────────────────────────────┐
│                   UI Service (Express.js)                       │
│                    Port 3000 - Node.js                          │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ server.js                                                │  │
│   │  - Serves EJS templates                                  │  │
│   │  - Serves static files (CSS, JS)                         │  │
│   │  - Routes: /, /products, /products/new, /products/:id    │  │
│   └─────────────────────────────────────────────────────────┘  │
│                            │                                    │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             │ HTTP Requests to API
                             │ (http://localhost:8000)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   API Service (FastAPI)                         │
│                    Port 8000 - Python                           │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ app/main.py - FastAPI Application                        │  │
│   │  - CORS configuration                                     │  │
│   │  - Health check endpoints                                 │  │
│   │  - Router registration                                    │  │
│   └──────────────────────┬──────────────────────────────────┘  │
│                          │                                      │
│   ┌──────────────────────▼──────────────────────────────────┐  │
│   │ app/routers/products.py - Product Endpoints              │  │
│   │  GET    /products        - List all products             │  │
│   │  POST   /products        - Create product                │  │
│   │  GET    /products/{id}   - Get one product               │  │
│   │  PUT    /products/{id}   - Update product                │  │
│   │  DELETE /products/{id}   - Delete product                │  │
│   └──────────────────────┬──────────────────────────────────┘  │
│                          │                                      │
│   ┌──────────────────────▼──────────────────────────────────┐  │
│   │ app/models.py - Pydantic Models                          │  │
│   │  - ProductBase (common fields)                           │  │
│   │  - ProductCreate (for creation)                          │  │
│   │  - ProductUpdate (for updates, all optional)             │  │
│   │  - Product (with ID)                                     │  │
│   │  - CategoryEnum, UnitOfMeasureEnum                       │  │
│   └──────────────────────┬──────────────────────────────────┘  │
│                          │                                      │
│   ┌──────────────────────▼──────────────────────────────────┐  │
│   │ app/crud.py - Data Operations                            │  │
│   │  - get_products() - Return all products                  │  │
│   │  - get_product(id) - Return one product                  │  │
│   │  - create_product() - Add new product                    │  │
│   │  - update_product() - Modify product                     │  │
│   │  - delete_product() - Remove product                     │  │
│   └──────────────────────┬──────────────────────────────────┘  │
│                          │                                      │
│   ┌──────────────────────▼──────────────────────────────────┐  │
│   │ In-Memory Storage (Python List)                          │  │
│   │  products_db = []                                        │  │
│   │  - Data lost when server stops                           │  │
│   │  - Simple for learning/development                       │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### Example 1: Loading the Product List

```
User clicks "View Products"
         │
         ▼
┌─────────────────────┐
│ Browser loads       │
│ /products page      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ server.js renders   │
│ products.ejs        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ products.js runs    │
│ on page load        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ api.getAllProducts()│
│ called              │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ HTTP GET request to │
│ /products           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ FastAPI routes to   │
│ products router     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ crud.get_products() │
│ returns list        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ JSON response sent  │
│ back to browser     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ products.js renders │
│ product cards       │
└─────────────────────┘
```

### Example 2: Creating a New Product

```
User fills form and clicks "Create Product"
         │
         ▼
┌─────────────────────┐
│ product-form.js     │
│ validates input     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ api.createProduct() │
│ called with data    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ HTTP POST request   │
│ to /products        │
│ Body: JSON data     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Pydantic validates  │
│ against ProductCreate│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ crud.create_product │
│ - assigns ID        │
│ - adds to list      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Product returned    │
│ as JSON with ID     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Browser redirects to│
│ /products page      │
└─────────────────────┘
```

## File Structure and Responsibilities

### API Service (apiservices/)

```
apiservices/
├── app/
│   ├── main.py              # Application setup, CORS, root endpoints
│   ├── models.py            # Data validation schemas
│   ├── crud.py              # Business logic and data access
│   └── routers/
│       └── products.py      # HTTP endpoint handlers
├── tests/
│   └── test_products.py     # API tests (pytest)
├── scripts/
│   ├── load_sample_data.sh  # Helper to load test data
│   └── api_examples.sh      # Example API calls
├── requirements.txt         # Python dependencies
├── Makefile                # Build commands
└── venv/                   # Virtual environment (created by you)
```

**Responsibilities:**
- ✅ Data validation with Pydantic
- ✅ CRUD operations
- ✅ RESTful API endpoints
- ✅ CORS handling
- ✅ API documentation (auto-generated)

### UI Service (uiservices/)

```
uiservices/
├── server.js               # Express app, routes, server setup
├── views/
│   ├── index.ejs          # Home page template
│   ├── products.ejs       # Product list template
│   ├── product-form.ejs   # Create/edit form template
│   └── 404.ejs            # Error page template
├── public/
│   ├── css/
│   │   └── styles.css     # All application styles
│   └── js/
│       ├── api.js         # HTTP client for API calls
│       ├── home.js        # Home page logic
│       ├── products.js    # Product list, search, filter
│       └── product-form.js # Form validation and submission
├── package.json           # Node.js dependencies
├── .env                   # Environment config (you create this)
└── Makefile              # Build commands
```

**Responsibilities:**
- ✅ Server-side rendering (EJS)
- ✅ Static file serving
- ✅ Client-side interactivity
- ✅ API communication
- ✅ User interface

## Technology Stack

### Backend (API Service)

| Technology | Purpose | Why? |
|------------|---------|------|
| **Python 3.8+** | Programming language | Easy to learn, powerful |
| **FastAPI** | Web framework | Fast, modern, auto-docs |
| **Pydantic** | Data validation | Type safety, clear errors |
| **uvicorn** | ASGI server | Fast, async support |
| **pytest** | Testing | Industry standard |

### Frontend (UI Service)

| Technology | Purpose | Why? |
|------------|---------|------|
| **Node.js** | JavaScript runtime | Run JS on server |
| **Express.js** | Web framework | Simple, flexible |
| **EJS** | Template engine | Server-side rendering |
| **Vanilla JS** | Client-side code | No framework needed |
| **CSS** | Styling | Custom, responsive design |

## API Endpoints Reference

### Product Endpoints

| Method | Endpoint | Request Body | Response | Description |
|--------|----------|--------------|----------|-------------|
| GET | `/products` | - | `Product[]` | Get all products |
| POST | `/products` | `ProductCreate` | `Product` | Create new product |
| GET | `/products/{id}` | - | `Product` | Get one product |
| PUT | `/products/{id}` | `ProductUpdate` | `Product` | Update product |
| DELETE | `/products/{id}` | - | `{"message": "..."}` | Delete product |

### Health Endpoints

| Method | Endpoint | Response | Description |
|--------|----------|----------|-------------|
| GET | `/` | Welcome message | API info |
| GET | `/health` | `{"status": "healthy"}` | Health check |

## Data Models

### Product Model

```python
{
  "id": 1,                          # Auto-assigned by system
  "product_name": "Dell XPS 15",
  "description": "...",
  "unit_of_measure": "unit",        # unit, piece, box, pack
  "category": "laptop",             # See categories below
  "price": 1599.99,                 # Must be > 0
  "brand": "Dell",
  "stock_quantity": 25,             # Must be >= 0
  "specifications": {               # Optional, flexible
    "processor": "Intel Core i7",
    "ram": "16GB",
    "storage": "512GB SSD"
  }
}
```

### Categories

- `computer` - Desktop computers
- `laptop` - Portable computers
- `keyboard` - Keyboards
- `mouse` - Mice
- `monitor` - Displays
- `disk` - Storage devices
- `ram` - Memory modules
- `processor` - CPUs
- `graphics_card` - GPUs
- `other` - Everything else

### Units of Measure

- `unit` - Individual items
- `piece` - Individual pieces
- `box` - Boxed items
- `pack` - Packaged items

## Communication Flow

### HTTP Methods and Their Purpose

| HTTP Method | CRUD Operation | Idempotent? | Safe? |
|-------------|----------------|-------------|-------|
| GET | Read | ✅ Yes | ✅ Yes |
| POST | Create | ❌ No | ❌ No |
| PUT | Update | ✅ Yes | ❌ No |
| DELETE | Delete | ✅ Yes | ❌ No |

**Idempotent**: Calling it multiple times has the same effect as calling it once  
**Safe**: Does not modify data

## Security Features

### CORS (Cross-Origin Resource Sharing)

The API allows requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

This prevents unauthorized websites from accessing your API.

### Input Validation

**API Level (Pydantic):**
- Type checking (string, int, float)
- Length validation (min/max)
- Range validation (price > 0, stock >= 0)
- Enum validation (category, unit of measure)

**UI Level (JavaScript):**
- Required field validation
- Client-side type checking
- User-friendly error messages

## Deployment Considerations

### Current Setup (Development)

```
┌──────────────┐        ┌──────────────┐
│  UI Service  │───────▶│  API Service │
│  Port 3000   │        │  Port 8000   │
└──────────────┘        └──────────────┘
     Both on localhost
     In-memory storage
     Auto-reload enabled
```

### Production Setup (Future)

```
┌─────────┐     ┌──────────┐     ┌─────────────┐     ┌──────────┐
│ Browser │────▶│  Nginx   │────▶│  UI Service │────▶│   API    │
│         │     │ (Reverse │     │  (Multiple  │     │ Service  │
│         │     │  Proxy)  │     │  Instances) │     │          │
└─────────┘     └──────────┘     └─────────────┘     └────┬─────┘
                     │                                     │
                     │                                     ▼
                     │                              ┌──────────────┐
                     │                              │  PostgreSQL  │
                     ▼                              │  Database    │
              ┌────────────┐                        └──────────────┘
              │   SSL/TLS  │
              │   HTTPS    │
              └────────────┘
```

**Production Needs:**
- Real database (PostgreSQL, MySQL)
- HTTPS/SSL certificates
- Environment variables for secrets
- Process manager (PM2, systemd)
- Reverse proxy (Nginx, Apache)
- Load balancing (for scale)
- Monitoring and logging
- Authentication/Authorization

## Learning Path

### Week 1-2: Understanding the Stack
1. Read through the code
2. Run both services
3. Use the application
4. Read API documentation

### Week 3-4: Making Changes
1. Add a new field to products
2. Add a new category
3. Modify UI styles
4. Add a new page

### Week 5-6: Advanced Features
1. Add pagination
2. Add image upload
3. Add user authentication
4. Connect to real database

## Additional Resources

- **API Documentation**: http://localhost:8000/docs (when running)
- **FastAPI Tutorial**: https://fastapi.tiangolo.com/tutorial/
- **Express.js Guide**: https://expressjs.com/en/guide/routing.html
- **REST API Best Practices**: https://restfulapi.net/

---

**Questions?** Refer to the troubleshooting section in [README.md](README.md) or ask your instructor.
