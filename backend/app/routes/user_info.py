from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app import models, schemas, oauth2

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/me", response_model=schemas.ShowUser)
def get_me(current_user: models.User = Depends(oauth2.get_current_user)):
    return current_user
