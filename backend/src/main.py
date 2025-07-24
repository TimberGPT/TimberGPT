from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


import src.models
from .core import init_db, settings
from .features import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup operations
    init_db()
    yield
    # Shutdown operations (if any)


app = FastAPI(
    title="Timber-GPT",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def get_root():
    """Health Route"""
    return {"Message": "Welcome To TimberGPT"}


app.include_router(api_router, prefix="/api/v1")
