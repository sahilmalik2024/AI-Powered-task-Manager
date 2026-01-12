from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List
from app.utils import send_email  # Make sure this is the correct path to your send_email function

router = APIRouter(
    prefix="/notification",
    tags=["Notification"]
)

# Pydantic model to define the structure of task data
class Task(BaseModel):
    title: str
    description: str
    deadline: str

class TaskNotificationRequest(BaseModel):
    tasks: List[Task]

# Endpoint to send task notifications
@router.post("/send-task-notification")
def send_task_notification(request: TaskNotificationRequest):
    try:
        send_email(request.tasks)  # Assuming this function sends the email
        return {"message": "Notification sent successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send notification"
        )
