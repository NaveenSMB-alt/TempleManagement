FROM python:3.13-slim

# Create the app directory
RUN mkdir -p /usr/src/app

# Set the working directory inside the container
WORKDIR /usr/src/app

# Set environment variables 
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

# Upgrade pip
RUN pip install --upgrade pip 

# Replace HTTP with HTTPS in modern sources
#RUN sed -i 's|http://deb.debian.org/debian-security|http://security-cdn.debian.org/debian-security|' /etc/apt/sources.list

# Copy the Django project and install dependencies
COPY WebBackend/requirements.txt ./

# run this command to install all dependencies
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    pkg-config \
    gcc \
    build-essential \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the Django project to the container
COPY WebBackend/ ./

# Expose the Django port
EXPOSE 8000

# Run Django’s development server
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]