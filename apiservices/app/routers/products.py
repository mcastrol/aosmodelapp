from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models import Product, ProductCreate, ProductUpdate
from app.crud import product_store

router = APIRouter(
    prefix="/products",
    tags=["products"]
)


@router.post("/", response_model=Product, status_code=201)
def create_product(product: ProductCreate):
    return product_store.create_product(product)


@router.get("/", response_model=List[Product])
def read_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000)
):
    return product_store.get_all_products(skip=skip, limit=limit)


@router.get("/{product_id}", response_model=Product)
def read_product(product_id: int):
    product = product_store.get_product(product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/{product_id}", response_model=Product)
def update_product(product_id: int, product_update: ProductUpdate):
    updated_product = product_store.update_product(product_id, product_update)
    if updated_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product


@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: int):
    success = product_store.delete_product(product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return None


@router.get("/search/", response_model=List[Product])
def search_products(
    category: Optional[str] = Query(None),
    brand: Optional[str] = Query(None)
):
    return product_store.search_products(category=category, brand=brand)
