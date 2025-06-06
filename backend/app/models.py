from sqlalchemy import Column, Integer, String
from app.database import Base

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    author = Column(String)
    content = Column(String)
    views = Column(Integer)
    shares = Column(Integer)