.PHONY: help install dev clean start stop

help:
	@echo "Available commands:"
	@echo "  make install     - Install Node.js dependencies"
	@echo "  make dev         - Run in development mode with auto-reload"
	@echo "  make start       - Run in production mode"
	@echo "  make clean       - Remove node_modules and cache"

install:
	npm install
	@echo "Dependencies installed!"

dev:
	npm run dev

start:
	npm start

clean:
	rm -rf node_modules
	rm -f package-lock.json
	@echo "Clean complete!"
