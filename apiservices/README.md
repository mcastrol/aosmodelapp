# Computer Products API

A FastAPI-based REST API for managing computer products inventory with full CRUD operations.

## Features

- Complete CRUD operations for computer products
- Pydantic models for data validation
- Categorized products (computers, laptops, peripherals, components)
- Specifications stored as key-value pairs
- Stock quantity tracking
- Health check endpoint
- Auto-generated API documentation (Swagger/ReDoc)

## Project Structure

```
apiservices/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI application entry point
│   ├── models.py         # Pydantic models
│   ├── crud.py           # CRUD operations
│   └── routers/
│       ├── __init__.py
│       └── products.py   # Product endpoints
├── tests/
│   ├── __init__.py
│   └── test_products.py  # Product tests
├── scripts/
│   ├── README.md         # Scripts documentation
│   ├── load_sample_data.sh    # Load sample products
│   └── api_examples.sh   # Quick API examples
├── Makefile              # Automation commands
└── requirements.txt      # Python dependencies
```

## Quick Start

### Prerequisites

- Python 3.8+
- Make (optional, but recommended)

### Installation

Using Make (recommended):

```bash
# Install dependencies
make install

# Install development dependencies
make dev
```

Manual installation:

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies
pip install pytest pytest-cov black flake8 httpx
```

### Running the Application

Using Make:

```bash
make run
```

Manual:

```bash
# Activate virtual environment if not already activated
source venv/bin/activate

# Run the application
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- Application: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Quick Demo with Sample Data

To quickly test the API with sample products:

```bash
# Make sure the API is running first (in one terminal)
make run

# In another terminal, load sample data
./scripts/load_sample_data.sh
```

This will:
- Load 16 sample computer products (laptops, monitors, keyboards, etc.)
- Demonstrate all CRUD operations
- Show search and pagination features

For more examples, see the [scripts/README.md](scripts/README.md) file.

## API Endpoints

### Health Check

- `GET /` - Welcome message
- `GET /health` - Health check status

### Products

- `GET /products` - List all products
- `POST /products` - Create a new product
- `GET /products/{product_id}` - Get a specific product
- `PUT /products/{product_id}` - Update a product
- `DELETE /products/{product_id}` - Delete a product

### Example Product Data

```json
{
  "product_name": "Dell XPS 15",
  "description": "High-performance laptop for professionals",
  "unit_of_measure": "unit",
  "category": "laptop",
  "price": 1599.99,
  "brand": "Dell",
  "stock_quantity": 25,
  "specifications": {
    "processor": "Intel Core i7-12700H",
    "ram": "16GB DDR5",
    "storage": "512GB SSD",
    "display": "15.6 inch FHD+"
  }
}
```

### Product Categories

- `computer` - Desktop computers
- `laptop` - Portable computers
- `keyboard` - Input devices (keyboards)
- `mouse` - Input devices (mice)
- `monitor` - Display devices
- `disk` - Storage devices
- `ram` - Memory modules
- `processor` - CPUs
- `graphics_card` - GPUs
- `other` - Other computer products

### Units of Measure

- `unit` - Individual items
- `piece` - Individual pieces
- `box` - Boxed items
- `pack` - Packaged items

## Development

### Running Tests

Using Make:

```bash
# Run tests
make test

# Run tests with coverage
make test-cov
```

Manual:

```bash
pytest tests/ -v
pytest tests/ -v --cov=app --cov-report=html --cov-report=term
```

### Code Quality

```bash
# Format code
make format

# Run linting
make lint
```

### Available Make Commands

```bash
make help         # Show available commands
make install      # Create virtual environment and install dependencies
make dev          # Install development dependencies
make run          # Run the FastAPI application
make test         # Run tests with pytest
make test-cov     # Run tests with coverage report
make lint         # Run linting checks
make format       # Format code with black
make clean        # Remove virtual environment and cache files
```

## Testing the API

### Using curl

```bash
# Create a product
curl -X POST "http://localhost:8000/products" \
  -H "Content-Type: application/json" \
  -d '{
    "product_name": "Logitech MX Master 3",
    "description": "Advanced wireless mouse",
    "unit_of_measure": "unit",
    "category": "mouse",
    "price": 99.99,
    "brand": "Logitech",
    "stock_quantity": 50,
    "specifications": {
      "connectivity": "Bluetooth/USB",
      "dpi": "4000",
      "buttons": "7"
    }
  }'

# List all products
curl "http://localhost:8000/products"

# Get a specific product
curl "http://localhost:8000/products/1"

# Update a product
curl -X PUT "http://localhost:8000/products/1" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 89.99,
    "stock_quantity": 45
  }'

# Delete a product
curl -X DELETE "http://localhost:8000/products/1"
```

### Using Python

```python
import requests

# Base URL
BASE_URL = "http://localhost:8000"

# Create a product
product = {
    "product_name": "Samsung 970 EVO Plus",
    "description": "NVMe M.2 SSD",
    "unit_of_measure": "unit",
    "category": "disk",
    "price": 129.99,
    "brand": "Samsung",
    "stock_quantity": 30,
    "specifications": {
        "capacity": "1TB",
        "interface": "NVMe M.2",
        "read_speed": "3500 MB/s",
        "write_speed": "3300 MB/s"
    }
}

response = requests.post(f"{BASE_URL}/products", json=product)
print(response.json())

# List products
response = requests.get(f"{BASE_URL}/products")
print(response.json())
```

## Production Deployment

For production deployment, consider:

1. Use a production ASGI server configuration
2. Set up environment variables for configuration
3. Implement database persistence (currently uses in-memory storage)
4. Add authentication and authorization
5. Implement rate limiting
6. Set up logging and monitoring
7. Use HTTPS

Example production run with Gunicorn:

```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Next Steps

- [ ] Add database integration (PostgreSQL/MySQL)
- [ ] Implement authentication and authorization
- [ ] Add pagination for product listings
- [ ] Implement search and filtering
- [ ] Add product images support
- [ ] Set up Docker containerization
- [ ] Add CI/CD pipeline
- [ ] Implement caching (Redis)
- [ ] Add API rate limiting
- [ ] Set up logging and monitoring

## License

This project is available for use under your organization's standard licensing terms.
