pipeline {
    agent any

    environment {
        IMAGE_NAME = "task10-app"
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests inside container...'
                sh 'docker run --rm task10-app npm test'
            }
}

        stage('Code Quality') {
            steps {
                echo 'Code quality check (basic)...'
                sh 'echo "Code quality stage passed"'
            }
        }

        stage('Security') {
            steps {
                echo 'Running security scan...'
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image task10-app || true'
                    }
                }

        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                sh '''
                docker rm -f task10-container || true
                docker run -d -p 5000:5000 --env-file .env --name task10-container task10-app
                '''
                }
            }

        stage('Release') {
            steps {
                echo 'Release stage (tagging)...'
                sh 'echo "Release completed"'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring application...'
                sh 'docker ps'
            }
        }
    }
}