from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app import crud, schemas
from app.utils import cache

router = APIRouter()

def article_to_dict(article):
    # Replace with your Pydantic schema if available (schemas.Article.from_orm)
    return {
        "id": article.id,
        "title": article.title,
        "author": article.author,
        "content": article.content,
        "views": article.views,
        "shares": article.shares,
    }

@router.get("/articles")
def read_articles(
    page: int = 1,
    limit: int = 10,
    author: Optional[str] = None,
    sort: str = "id",
    sortDirection: str = "desc",
    db: Session = Depends(get_db)
):
    cache_key = f"articles:{page}:{limit}:{author}:{sort}:{sortDirection}"
    cached = cache.get_cache(cache_key)
    if cached:
        cached["source"] = "cache"
        return cached

    skip = (page - 1) * limit
    articles, count = crud.get_articles(db, skip, limit, author, sort, sortDirection)
    articles_dict = [article_to_dict(a) for a in articles]

    result = {
        "success": True,
        "source": "database",
        "total": count,
        "currentPage": page,
        "totalPages": (count // limit) + (1 if count % limit else 0),
        "hasNextPage": page * limit < count,
        "data": articles_dict
    }
    cache.set_cache(cache_key, result)
    return result

@router.get("/articles/highlights")
def get_highlights(db: Session = Depends(get_db)):
    cache_key = "articles:highlights"
    cached = cache.get_cache(cache_key)
    if cached:
        cached["source"] = "cache"
        return cached

    most_viewed, most_shared = crud.get_highlights(db)
    result = {
        "success": True,
        "source": "database",
        "mostViewed": article_to_dict(most_viewed) if most_viewed else None,
        "mostShared": article_to_dict(most_shared) if most_shared else None
    }
    cache.set_cache(cache_key, result)
    return result

@router.post("/articles/{id}/summarize")
def summarize_article(id: int, db: Session = Depends(get_db)):
    article = db.query(crud.Article).filter(crud.Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    summary = f'This is a mocked summary for the article titled "{article.title}" by {article.author}.'
    return {"success": True, "summary": summary}