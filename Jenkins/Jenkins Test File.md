```Jenkinsfile
pipeline {

    agent any

  

    environment {

        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')

        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')

    }

  

    stages {

        stage('Checkout Code') {

            steps {

                git branch: 'main', url: 'https://github.com/your-repo/terraform-jenkins-aws-ec2.git'

            }

        }

  

        stage('Install Terraform') {

            steps {

                sh '''

                if ! command -v terraform &> /dev/null; then

                    wget https://releases.hashicorp.com/terraform/1.5.0/terraform_1.5.0_linux_amd64.zip

                    unzip terraform_1.5.0_linux_amd64.zip

                    sudo mv terraform /usr/local/bin/

                fi

                terraform --version

                '''

            }

        }

  

        stage('Initialize Terraform') {

            steps {

                sh 'terraform init'

            }

        }

  

        stage('Plan Terraform') {

            steps {

                sh 'terraform plan'

            }

        }

  

        stage('Apply Terraform') {

            steps {

                input 'Do you want to apply the Terraform changes?'

                sh 'terraform apply -auto-approve'

            }

        }

  

        stage('Deploy Application') {

            steps {

                sh '''

                INSTANCE_IP=$(terraform output -raw instance_public_ip)

                ssh -i /path/to/private/key.pem ec2-user@${INSTANCE_IP} <<EOF

                cd /home/ec2-user/petclinic/spring-petclinic-microservices

                nohup ./mvnw spring-boot:run > app.log 2>&1 &

                EOF

                '''

            }

        }

    }

  

    post {

        success {

            echo 'Pipeline completed successfully!'

        }

        failure {

            echo 'Pipeline failed!'

        }

    }

}

```