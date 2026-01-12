from typing import List
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib

# Utility function to send email
def send_email(tasks: List[dict]):
    # Prepare the email content (this is just a simple example)
    task_details = "\n".join([f"{task['title']} - {task['description']} - {task['deadline']}" for task in tasks])

    sender_email = "your_email@example.com"
    receiver_email = "user_email@example.com"
    password = "your_email_password"

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "Today's Task Notification"

    body = f"Here are your tasks for today:\n\n{task_details}"
    msg.attach(MIMEText(body, "plain"))

    try:
        # SMTP setup (example for Gmail)
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
    except Exception as e:
        raise Exception("Failed to send email: " + str(e))
