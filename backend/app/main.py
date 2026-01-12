from fastapi import FastAPI
from backend.app.database.database import Base, engine  # Explicit import from backend
from app.routes import task_routes, auth_routes, tasks_notifcations
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # React dev server
    # Add other origins here if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,               # ✅ Cannot be ["*"] with credentials
    allow_credentials=True, 
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Initialize your database connection
Base.metadata.create_all(bind=engine)

app.include_router(auth_routes.router)
app.include_router(task_routes.router)
app.include_router(tasks_notifcations.router)



@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
