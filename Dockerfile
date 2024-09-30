FROM python:3.12

# Set the working directory to /app
WORKDIR /app

# Install any needed packages specified in requirements.txt
COPY Backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application's source code
COPY Backend /app

# Expose the port that the FastAPI app will run on
EXPOSE 8080


# Command to run the application using Gunicorn with Uvicorn workers
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app:app", "--bind", "0.0.0.0:8080"]