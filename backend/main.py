from fastapi import FastAPI
from app.routes import articles

app = FastAPI()

app.include_router(articles.router)
