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
        stage('Install library') {
            steps {
                sh 'npm install'
            }
        }
        stage('Docker build and push') {
            steps {
                echo 'Hello World'
                sh 'docker --version'
                sh 'docker info'
//                 sh 'eval $(aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin 396530717502.dkr.ecr.ap-southeast-1.amazonaws.com)'
//                 sh 'docker build -t node-typescript .'
//                 sh 'docker build -t ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${BUILD_NUMBER} .'
//                 sh 'docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${BUILD_NUMBER}'
            }
        }
//         stage('Update task definition') {
//             steps {
//                 script {
//                     def taskDefinition = sh(
//                         script: "aws ecs describe-task-definition --task-definition ${TASK_FAMILY}",
//                         returnStdout: true
//                     ).trim()
//
//                     taskDefinition = taskDefinition.replaceAll(
//                         /"image":\s*"[^"]*"/,
//                         "\"image\": \"${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${BUILD_NUMBER}\""
//                     )
//
//                     def newTaskDefinition = sh(
//                         script: "echo '${taskDefinition}' | aws ecs register-task-definition --family ${TASK_FAMILY} --cli-input-json file:///dev/stdin",
//                         returnStdout: true
//                     ).trim()
//
//                     env.TASK_DEFINITION_ARN = newTaskDefinition =~ /"taskDefinitionArn": "([^"]*)"/ ? ~/1/ : null
//                 }
//             }
//         }
//         stage('Deploy to ECS') {
//             steps {
//                 sh "aws ecs update-service --cluster ${ECS_CLUSTER} --service ${SERVICE_NAME} --force-new-deployment --task-definition ${TASK_DEFINITION_ARN}"
//             }
//         }
    }
}