// Jenkins 流水线配置
pipeline {
    agent any
    
    // 环境变量
    environment {
        DOCKER_COMPOSE_VERSION = '1.29.2'
        NODE_VERSION = '16'
    }
    
    stages {
        // 代码检出
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        // 安装依赖
        stage('Install') {
            steps {
                sh '''
                    # 安装前端依赖
                    cd client
                    npm install
                    
                    # 安装后端依赖
                    cd ../server
                    npm install
                '''
            }
        }
        
        // 运行测试
        stage('Test') {
            parallel {
                // 前端测试
                stage('Frontend Tests') {
                    steps {
                        sh '''
                            cd client
                            npm test -- --coverage
                        '''
                    }
                }
                
                // 后端测试
                stage('Backend Tests') {
                    steps {
                        sh '''
                            cd server
                            npm test -- --coverage
                        '''
                    }
                }
                
                // E2E 测试
                stage('E2E Tests') {
                    steps {
                        sh '''
                            cd e2e
                            npm install
                            npm test
                        '''
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: 'e2e/test-results/**/*'
                        }
                    }
                }
            }
        }
        
        // Docker 构建
        stage('Build') {
            when {
                branch 'develop'
            }
            steps {
                sh 'docker-compose -f docker-compose.dev.yml build'
            }
        }
        
        // 部署测试环境
        stage('Deploy Test') {
            when {
                branch 'develop'
            }
            steps {
                sh 'docker-compose -f docker-compose.dev.yml up -d'
            }
        }
    }
    
    // 后置处理
    post {
        always {
            // 收集测试报告
            junit '**/junit.xml'
            
            // 发布覆盖率报告
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'coverage',
                reportFiles: 'index.html',
                reportName: 'Coverage Report'
            ])
            
            // 清理 Docker 容器
            sh 'docker-compose -f docker-compose.dev.yml down'
        }
        
        // 发送通知
        success {
            emailext (
                subject: "Pipeline 成功: ${currentBuild.fullDisplayName}",
                body: "构建成功，请查看测试报告",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
        
        failure {
            emailext (
                subject: "Pipeline 失败: ${currentBuild.fullDisplayName}",
                body: "构建失败，请检查日志",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
    }
} 