from pydantic import BaseModel
from typing import Optional

class ArticleSchema(BaseModel):
    id: int
    title: str
    author: str
    content: str
    views: int
    shares: int

    class Config:
        orm_mode = True
