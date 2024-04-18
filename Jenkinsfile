pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def composePath = "../dados-devops/docker-compose.yaml"
                    
                    def serviceName = "dashboard-frontend"

                    sh "docker-compose -f ${composePath} up -d --build ${serviceName}"
                }
            }
        }
    }

    post {
        success {
            echo "O serviço foi reiniciado com sucesso."
        }

        failure {
            echo "Houve um problema ao reiniciar o serviço."
        }
    }
}

