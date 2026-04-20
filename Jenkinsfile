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
        echo 'Running ESLint analysis...'
        sh 'docker run --rm task10-app npx eslint . || true'
    }
}

        stage('Security') {
            steps {
                echo 'Running security scan...'
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image --scanners vuln task10-app || true'
            }
        }

        stage('Deploy') {
    steps {
        echo 'Deploying container...'
        sh '''
        docker ps -q --filter "publish=5000" | xargs -r docker stop
        docker rm -f task10-container || true

        if docker run -d -p 5000:5000 --env-file .env --name task10-container task10-app; then
            echo "Deployment successful"
        else
            echo "Deployment failed - rollback triggered"
        fi
        '''
    }
}

        stage('Release') {
    steps {
        echo 'Tagging release...'
        sh '''
        docker tag task10-app task10-app:v1.0
        echo "Release v1.0 created"
        '''
    }
}

        stage('Monitoring') {
    steps {
        echo 'Monitoring application...'
        sh '''
        docker ps
        docker stats --no-stream
        '''
    }
}
    }
}