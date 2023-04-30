FROM python:3.9

WORKDIR /app

# Copy the requirements file and install the dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the application code
COPY . .

# Expose the port the application will listen on
EXPOSE 5000

# Set the environment variable
ENV FLASK_APP=app.py

# Start the application
CMD ["flask", "run", "--host=0.0.0.0"]
