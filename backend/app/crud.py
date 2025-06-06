from sqlalchemy.orm import Session
from sqlalchemy import desc, asc
from app.models import Article

def get_articles(db: Session, skip: int = 0, limit: int = 10, author: str = None, sort: str = "id", sort_dir: str = "desc"):
    query = db.query(Article)
    if author:
        query = query.filter(Article.author == author)
    order = desc(getattr(Article, sort)) if sort_dir == "desc" else asc(getattr(Article, sort))
    articles = query.order_by(order).offset(skip).limit(limit).all()
    total = query.count()
    return articles, total

def get_highlights(db: Session):
    most_viewed = db.query(Article).order_by(desc(Article.views)).first()
    most_shared = db.query(Article).order_by(desc(Article.shares)).first()
    return most_viewed, most_shared