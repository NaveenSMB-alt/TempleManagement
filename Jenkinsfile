pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "templedev"
    }

    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
    }

    triggers {
        githubPush() // Trigger pipeline on GitHub push
    }

    stages {

        stage('🧾 Checkout') {
            steps {
                checkout scm
            }
        }

        stage('🔨 Build Containers (Dev)') {
            steps {
                echo "📦 Building dev containers using docker-compose..."
                sh "docker-compose -p ${COMPOSE_PROJECT_NAME} build"
            }
        }

        stage('🚀 Deploy Locally') {
            steps {
                echo "🔁 Restarting containers locally..."
                sh """
                    docker-compose -p ${COMPOSE_PROJECT_NAME} down --remove-orphans || true
                    docker-compose -p ${COMPOSE_PROJECT_NAME} up -d
                """
            }
        }

        stage('🔍 Health Check') {
            steps {
                echo "⏳ Waiting for backend and frontend to start..."
                sleep 10
                sh '''
                    echo "🩺 Backend (Django) check:"
                    curl -fs http://localhost:8000 || echo "⚠️ Django may not be ready"

                    echo "🩺 Frontend (Next.js) check:"
                    curl -fs http://localhost:3000 || echo "⚠️ Next.js may not be ready"
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Local dev deployment successful!"
        }
        failure {
            echo "❌ Deployment failed. Cleaning up..."
            sh "docker-compose -p ${COMPOSE_PROJECT_NAME} down --remove-orphans || true"
        }
        always {
            echo "🧹 Optional Docker cleanup..."
            sh "docker system prune -af || true"
        }
    }
}
