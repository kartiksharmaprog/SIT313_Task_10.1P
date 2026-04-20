pipeline {
    agent any

    environment {
        IMAGE_NAME = "task10-app"
    }

    stages {

        stage('Build') {
    steps {
        echo 'Building Docker image with versioning...'
        sh '''
        VERSION=1.0.${BUILD_NUMBER}
        echo "Building version: $VERSION"

        docker build -t task10-app:$VERSION .
        docker tag task10-app:$VERSION task10-app:latest

        echo $VERSION > version.txt
        '''
    }
    post {
    always {
        archiveArtifacts artifacts: 'version.txt', allowEmptyArchive: true
    }
}
}

        stage('Test') {
    steps {
        echo 'Running advanced test suite...'
        sh '''
        docker run --rm task10-app sh -c "
        npm test -- --watchAll=false --coverage
        "
        '''
    }
    post {
        always {
            archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
        }
    }
}

        stage('Code Quality') {
    steps {
        echo 'Running ESLint with report generation...'
        sh '''
        docker run --rm task10-app sh -c "
        npx eslint . -f json -o eslint-report.json || true
        "
        '''
    }
}

        stage('Security') {
    steps {
        echo 'Running advanced security scan with Trivy...'
        sh '''
        docker run --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        aquasec/trivy image \
        --severity HIGH,CRITICAL \
        --format table \
        task10-app > trivy-report.txt || true

        echo "Checking for HIGH/CRITICAL vulnerabilities..."

        if grep -q "CRITICAL" trivy-report.txt; then
            echo "CRITICAL vulnerabilities found! Failing pipeline."
            exit 1
        elif grep -q "HIGH" trivy-report.txt; then
            echo "HIGH vulnerabilities found! Review required."
        else
            echo "No high severity vulnerabilities found."
        fi
        '''
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
        echo 'Running advanced monitoring...'
        sh '''
        echo "=== Running Containers ==="
        docker ps

        echo "=== Resource Usage ==="
        docker stats --no-stream

        echo "=== Health Check ==="
        if curl -f http://localhost:5000 > /dev/null 2>&1; then
            echo "Application is healthy"
        else
            echo "ALERT: Application is DOWN!"
            exit 1
        fi

        echo "=== Alert Check (CPU Threshold) ==="
        CPU=$(docker stats --no-stream --format "{{.CPUPerc}}" task10-container | sed 's/%//')
        CPU_INT=${CPU%.*}

        if [ "$CPU_INT" -gt 80 ]; then
            echo "ALERT: High CPU usage detected!"
        else
            echo "CPU usage normal"
        fi

        echo "=== Incident Simulation ==="
        docker stop task10-container
        sleep 2

        if curl -f http://localhost:5000 > /dev/null 2>&1; then
            echo "Unexpected: App still running"
        else
            echo "Incident detected: Application failure confirmed"
        fi

        echo "Restarting container after incident..."
        docker start task10-container
        '''
    }
}
    }
}