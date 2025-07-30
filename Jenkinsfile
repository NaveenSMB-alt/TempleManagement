pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "templeapp"
  }

  stages {

    stage('🔐 Securely Inject Secrets') {
      steps {
        withCredentials([
          string(credentialsId: 'mysql-root', variable: 'MYSQL_ROOT_PASSWORD'),
          string(credentialsId: 'mysql-user', variable: 'MYSQL_USER'),
          string(credentialsId: 'mysql-password', variable: 'MYSQL_PASSWORD'),
          string(credentialsId: 'mysql-database', variable: 'MYSQL_DATABASE'),
          string(credentialsId: 'django-secret', variable: 'DJANGO_SECRET_KEY')
        ]) {
          sh '''
            echo "Injecting secrets to .env (silently)..."
            {
              echo "MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD"
              echo "MYSQL_USER=$MYSQL_USER"
              echo "MYSQL_PASSWORD=$MYSQL_PASSWORD"
              echo "MYSQL_DATABASE=$MYSQL_DATABASE"
              echo "DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY"
            } > .env
          '''
        }
      }
    }

    stage('🔨 Build & Deploy') {
      steps {
        sh "docker-compose -p ${COMPOSE_PROJECT_NAME} build"
        sh "docker-compose -p ${COMPOSE_PROJECT_NAME} up -d"
      }
    }

    stage('✅ Verify (without exposing secrets)') {
      steps {
        sh '''
          grep DJANGO_SECRET_KEY .env > /dev/null || (echo "❌ Secret not set" && exit 1)
        '''
      }
    }
  }

  post {
    always {
      echo "🧹 Cleaning up secrets..."
      sh 'rm -f .env || true'
    }
  }
}
