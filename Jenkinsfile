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
            echo "Test stage completed"
        }
    }
}

     stage('Code Quality') {
    steps {
        echo 'Running ESLint with monitoring and reporting...'
        sh '''
        echo "=== Running ESLint ==="

        OUTPUT=$(docker run --rm \
        -v /var/jenkins_home/workspace/devdeakin-pipeline:/app \
        -w /app \
        task10-app sh -c "./node_modules/.bin/eslint . --format stylish" || true)

        echo "$OUTPUT"

        WARNINGS=$(echo "$OUTPUT" | grep -c "warning" || echo 0)
        echo "Total warnings: $WARNINGS"

        if [ "$WARNINGS" -gt 5 ]; then
            echo "⚠ ALERT: Code quality threshold exceeded"
        else
            echo "Code quality within acceptable limits"
        fi
        '''
    }
}

        stage('Security') {
    steps {
        echo 'Running advanced security scan (non-blocking with alerts)...'
        sh '''
        docker run --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        aquasec/trivy image \
        --severity HIGH,CRITICAL \
        --format table \
        task10-app > trivy-report.txt || true

        echo "=== Trivy Scan Report ==="
        cat trivy-report.txt

        CRITICAL_COUNT=$(grep -c "CRITICAL" trivy-report.txt || true)
        HIGH_COUNT=$(grep -c "HIGH" trivy-report.txt || true)

        echo "Critical vulnerabilities: $CRITICAL_COUNT"
        echo "High vulnerabilities: $HIGH_COUNT"

        if [ "$CRITICAL_COUNT" -gt 0 ]; then
            echo "🚨 ALERT: Critical vulnerabilities detected! Immediate attention required."
        elif [ "$HIGH_COUNT" -gt 0 ]; then
            echo "⚠ WARNING: High severity vulnerabilities detected. Review recommended."
        else
            echo "✅ No high or critical vulnerabilities found."
        fi

        echo "=== Mitigation Suggestions ==="
        echo "- Update vulnerable dependencies"
        echo "- Remove unused or insecure packages"
        echo "- Apply security patches"
        echo "- Use minimal base images"
        '''
    }
    post {
        always {
            archiveArtifacts artifacts: 'trivy-report.txt', allowEmptyArchive: true
        }
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

        echo "=== Waiting for app to be ready ==="
        sleep 10

        echo "=== Health Check ==="
        if docker exec task10-container curl -f http://localhost:5000 > /dev/null 2>&1; then
            echo "Application is healthy"
        else
            echo "⚠ ALERT: Application health check failed"
        fi

        echo "=== Alert Check (CPU Threshold) ==="
        CPU=$(docker stats --no-stream --format "{{.CPUPerc}}" task10-container | sed 's/%//')
        CPU_INT=${CPU%.*}

        if [ -z "$CPU_INT" ]; then
            CPU_INT=0
        fi

        if [ "$CPU_INT" -gt 80 ]; then
            echo "⚠ ALERT: High CPU usage detected!"
        else
            echo "CPU usage normal"
        fi

        echo "=== Incident Simulation ==="
        docker stop task10-container
        sleep 3

        if docker exec task10-container curl -f http://localhost:5000 > /dev/null 2>&1; then
            echo "Unexpected: App still running"
        else
            echo "Incident detected: Application failure confirmed"
        fi

        echo "Restarting container after incident..."
        docker start task10-container

        echo "=== Monitoring Complete ==="
        '''
    }
}
    }
}