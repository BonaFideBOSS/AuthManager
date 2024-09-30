from src import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app="__main__:app", reload=True)
