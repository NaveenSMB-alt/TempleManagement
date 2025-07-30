pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "templeapp"
  }

  options {
    timestamps()
    timeout(time: 20, unit: 'MINUTES')
  }

  triggers {
    githubPush()
  }

  stages {

    stage('🧾 Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('🔐 Securely Inject Secrets to .env') {
      steps {
        withCredentials([
          string(credentialsId: 'django-secret', variable: 'DJANGO_SECRET_KEY'),
          string(credentialsId: 'debug-flag', variable: 'DEBUG'),
          string(credentialsId: 'allowed-hosts', variable: 'ALLOWED_HOSTS'),
          string(credentialsId: 'mysql-root', variable: 'MYSQL_ROOT_PASSWORD'),
          string(credentialsId: 'mysql-user', variable: 'MYSQL_USER'),
          string(credentialsId: 'mysql-password', variable: 'MYSQL_PASSWORD'),
          string(credentialsId: 'mysql-database', variable: 'MYSQL_DATABASE')
        ]) {
          sh '''
            echo "SECRET_KEY=$DJANGO_SECRET_KEY" > .env
            echo "DEBUG=$DEBUG" >> .env
            echo "ALLOWED_HOSTS=$ALLOWED_HOSTS" >> .env

            echo "MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD" >> .env
            echo "MYSQL_USER=$MYSQL_USER" >> .env
            echo "MYSQL_PASSWORD=$MYSQL_PASSWORD" >> .env
            echo "MYSQL_DATABASE=$MYSQL_DATABASE" >> .env
          '''
        }
      }
    }

    stage('🔨 Build Docker Images') {
      steps {
        echo "Building all services using Docker Compose..."
        sh "docker-compose -p ${COMPOSE_PROJECT_NAME} build"
      }
    }

    stage('🚀 Deploy Services Locally') {
      steps {
        echo "Bringing up services..."
        sh '''
          docker-compose -p ${COMPOSE_PROJECT_NAME} down --remove-orphans || true
          docker-compose -p ${COMPOSE_PROJECT_NAME} up -d
        '''
      }
    }

    stage('🔍 Health Check') {
      steps {
        echo "Checking service availability after 20 seconds..."
        sh '''
          sleep 20
          curl -fs http://localhost:8000 || (echo "❌ Backend not ready" && exit 1)
          curl -fs http://localhost:3000 || (echo "❌ Frontend not ready" && exit 1)
        '''
      }
    }
  }

  post {
    always {
      echo "🧹 Cleaning up temporary .env..."
      sh "rm -f .env || true"
    }

    success {
      echo "✅ Pipeline executed successfully. App should be live!"
    }

    failure {
      echo "❌ Pipeline failed. Cleaning up containers..."
      sh "docker-compose -p ${COMPOSE_PROJECT_NAME} down || true"
    }
  }
}
