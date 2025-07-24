from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def get_root():
    """Health Route"""
    return {"Message": "Welcome To TimberGPT"}
