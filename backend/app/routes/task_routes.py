from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.schemas import schemas
from app.models import models
from app.database.database import get_db
from app.utils.ai import predict_priority
from app.auth.auth import get_current_user
from datetime import datetime
from collections import defaultdict
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

# Task creation route
@router.post("/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    try:
        # 🧠 Predict priority using AI
        predicted_priority = predict_priority(task.title, task.description)
        
        # If you want to store it as integer (e.g., map 'High' = 3, 'Medium' = 2, 'Low' = 1)
        priority_map = {"Low": 1, "Medium": 2, "High": 3}
        priority_value = priority_map.get(predicted_priority, 2)

    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

    new_task = models.Task(
        title=task.title,
        description=task.description,
        priority=priority_value,
        deadline=task.deadline,
        user_id=current_user.id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# Fetch all tasks
@router.get("/", response_model=List[schemas.Task])
def get_tasks(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Task).filter(models.Task.user_id == current_user.id).all()

# Fetch task by ID
@router.get("/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")
    return task

# Update task
@router.put("/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, updated_task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")

    task.title = updated_task.title
    task.description = updated_task.description
    task.priority = updated_task.priority  # You can allow manual updates
    task.deadline = updated_task.deadline

    db.commit()
    db.refresh(task)
    return task

# Delete task
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")
    
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted successfully."}

# Update task status
@router.patch("/{task_id}/status", response_model=schemas.Task)
def update_task_status(task_id: int, status: bool, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")

    task.status = status
    task.completed_at = datetime.utcnow() if status else None

    db.commit()
    db.refresh(task)
    return task

# Get productivity analytics
@router.get("/analytics", tags=["Analytics"])
def get_productivity_analytics(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Fetch all tasks for the current user
    tasks = db.query(models.Task).filter(models.Task.user_id == current_user.id).all()

    total_tasks = len(tasks)
    # Filter completed tasks based on 'status' field (True = completed)
    completed_tasks = [t for t in tasks if t.status]
    completion_rate = len(completed_tasks) / total_tasks if total_tasks else 0

    # Tasks completed per day - we'll use created_at as the reference point
    tasks_per_day = defaultdict(int)
    for task in completed_tasks:
        date_str = task.created_at.strftime('%Y-%m-%d')  # Use created_at for simplicity
        tasks_per_day[date_str] += 1

    return JSONResponse(content={
        "completion_rate": completion_rate,
        "tasks_per_day": dict(tasks_per_day)
    })
