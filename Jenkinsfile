pipeline {
    agent any
    environment {
        AWS_REGION = 'ap-southeast-1'
        IMAGE_REPO_NAME = 'node-typescript'
//         ECS_CLUSTER = 'node-typescript'
        SERVICE_NAME = 'node-typescript-service-name'
        AWS_ACCOUNT_ID = '396530717502'
//         TASK_FAMILY = 'my-task-family'
    }
    tools {
        nodejs '18.9.0'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/PhongOlsen/node-typescript.git'
            }
        }
        stage('Test') {
            steps {
                echo 'Hello Run Test'
            }
        }
        stage('Docker build and push image to ecr') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: "aws_credentials",
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh '''
                        aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 396530717502.dkr.ecr.ap-southeast-1.amazonaws.com
                        docker build .
                        docker tag node:latest 396530717502.dkr.ecr.ap-southeast-1.amazonaws.com/node-typescript:latest
                        docker push 396530717502.dkr.ecr.ap-southeast-1.amazonaws.com/node-typescript:latest
                    '''
                }
            }
        }
        stage('Update Task Definition and Service Ecs') {
            steps {
                echo 'Update Task Definition and Service Ecs'
            }
        }
        stage('Run image updated to Ecs'){
            steps {
                echo 'Run image updated to Ecs'
            }
        }
    }
}