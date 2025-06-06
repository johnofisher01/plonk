from sqlalchemy.orm import Session
from sqlalchemy import desc, asc
from app.models import Article

def get_articles(
    db: Session, 
    skip: int = 0, 
    limit: int = 10, 
    author: str = None, 
    sort: str = "id", 
    sort_dir: str = "desc"
):
    query = db.query(Article)
    if author:
        # Case-insensitive partial match
        query = query.filter(Article.author.ilike(f"%{author}%"))
    # Defensive sorting
    sort_column = getattr(Article, sort, Article.id)
    order = desc(sort_column) if sort_dir == "desc" else asc(sort_column)
    query = query.order_by(order)
    total = query.count()
    articles = query.offset(skip).limit(limit).all()
    return articles, total

def get_highlights(db: Session):
    most_viewed = db.query(Article).order_by(desc(Article.views)).first()
    most_shared = db.query(Article).order_by(desc(Article.shares)).first()
    return most_viewed, most_shared