pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        REGISTRY_NAMESPACE = "naveensmb"  // 🔁 your DockerHub username
        FRONTEND_IMAGE = "${REGISTRY}/${REGISTRY_NAMESPACE}/temple-frontend"
        BACKEND_IMAGE  = "${REGISTRY}/${REGISTRY_NAMESPACE}/temple-backend"
        IMAGE_TAG = "${BUILD_NUMBER}"     // can use "latest" if preferred
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

        stage('🧾 Checkout') {
            steps {
                checkout scm
            }
        }

        stage('🔐 DockerHub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        stage('🔨 Build via Docker Compose') {
            steps {
                echo "📦 Building services using docker-compose..."
                sh "docker-compose -p ${COMPOSE_PROJECT_NAME} build"
            }
        }

        stage('📤 Tag & Push Images') {
            steps {
                echo "🔖 Tagging and pushing images built via docker-compose..."

                // This assumes you’ve named your services as `nextjs` and `django`
                sh """
                    docker tag ${COMPOSE_PROJECT_NAME}_nextjs ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker tag ${COMPOSE_PROJECT_NAME}_django ${BACKEND_IMAGE}:${IMAGE_TAG}

                    docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                """
            }
        }

        stage('🚀 Deploy Stack Locally') {
            steps {
                echo "🔁 Restarting containers with current config..."
                sh """
                    docker-compose -p ${COMPOSE_PROJECT_NAME} down --remove-orphans || true
                    docker-compose -p ${COMPOSE_PROJECT_NAME} up -d
                """
            }
        }

        stage('🔍 Health Check') {
            steps {
                echo "🔎 Verifying services..."
                sh '''
                    sleep 10
                    curl -fs http://localhost:8000 || (echo "❌ Backend not ready" && exit 1)
                    curl -fs http://localhost:3000 || (echo "❌ Frontend not ready" && exit 1)
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Build → Push → Deploy succeeded using local docker-compose setup!"
        }
        failure {
            echo "❌ Pipeline failed. Attempting cleanup..."
            sh "docker-compose -p ${COMPOSE_PROJECT_NAME} down --remove-orphans || true"
        }
        always {
            echo "🧹 Docker cleanup..."
            sh "docker system prune -af || true"
        }
    }
}
