.PHONY: help install dev clean test run lint format

PYTHON := python3
VENV := venv
BIN := $(VENV)/bin
PIP := $(BIN)/pip
PYTEST := $(BIN)/pytest
UVICORN := $(BIN)/uvicorn

help:
	@echo "Available commands:"
	@echo "  make install     - Create virtual environment and install dependencies"
	@echo "  make dev         - Install development dependencies"
	@echo "  make run         - Run the FastAPI application"
	@echo "  make test        - Run tests with pytest"
	@echo "  make test-cov    - Run tests with coverage report"
	@echo "  make lint        - Run linting checks"
	@echo "  make format      - Format code with black"
	@echo "  make clean       - Remove virtual environment and cache files"

$(VENV)/bin/activate:
	$(PYTHON) -m venv $(VENV)

install: $(VENV)/bin/activate
	$(PIP) install --upgrade pip
	$(PIP) install -r requirements.txt
	@echo "Installation complete! Activate with: source $(VENV)/bin/activate"

dev: install
	$(PIP) install pytest pytest-cov black flake8
	@echo "Development dependencies installed!"

run:
	@if [ ! -d "$(VENV)" ]; then \
		echo "Virtual environment not found. Run 'make install' first."; \
		exit 1; \
	fi
	$(UVICORN) app.main:app --reload --host 0.0.0.0 --port 8000

test:
	@if [ ! -d "$(VENV)" ]; then \
		echo "Virtual environment not found. Run 'make dev' first."; \
		exit 1; \
	fi
	$(PYTEST) tests/ -v

test-cov:
	@if [ ! -d "$(VENV)" ]; then \
		echo "Virtual environment not found. Run 'make dev' first."; \
		exit 1; \
	fi
	$(PYTEST) tests/ -v --cov=app --cov-report=html --cov-report=term

lint:
	@if [ ! -d "$(VENV)" ]; then \
		echo "Virtual environment not found. Run 'make dev' first."; \
		exit 1; \
	fi
	$(BIN)/flake8 app/ tests/ --max-line-length=120

format:
	@if [ ! -d "$(VENV)" ]; then \
		echo "Virtual environment not found. Run 'make dev' first."; \
		exit 1; \
	fi
	$(BIN)/black app/ tests/ --line-length=120

clean:
	rm -rf $(VENV)
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "htmlcov" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name ".coverage" -delete
	@echo "Clean complete!"
