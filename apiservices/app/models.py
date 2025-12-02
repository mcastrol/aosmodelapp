from pydantic import BaseModel, Field
from typing import Optional, Dict
from enum import Enum


class CategoryEnum(str, Enum):
    COMPUTER = "computer"
    LAPTOP = "laptop"
    KEYBOARD = "keyboard"
    MOUSE = "mouse"
    MONITOR = "monitor"
    DISK = "disk"
    RAM = "ram"
    PROCESSOR = "processor"
    GRAPHICS_CARD = "graphics_card"
    OTHER = "other"


class UnitOfMeasureEnum(str, Enum):
    UNIT = "unit"
    PIECE = "piece"
    BOX = "box"
    PACK = "pack"


class ProductBase(BaseModel):
    product_name: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=1000)
    unit_of_measure: UnitOfMeasureEnum
    category: CategoryEnum
    price: float = Field(..., gt=0)
    brand: str = Field(..., min_length=1, max_length=100)
    stock_quantity: int = Field(..., ge=0)
    specifications: Optional[Dict[str, str]] = Field(default_factory=dict)


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    product_name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1, max_length=1000)
    unit_of_measure: Optional[UnitOfMeasureEnum] = None
    category: Optional[CategoryEnum] = None
    price: Optional[float] = Field(None, gt=0)
    brand: Optional[str] = Field(None, min_length=1, max_length=100)
    stock_quantity: Optional[int] = Field(None, ge=0)
    specifications: Optional[Dict[str, str]] = None


class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True
