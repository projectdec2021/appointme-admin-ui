pipeline {
  agent any
  environment{
        VERSION = "${env.BUILD_ID}"
        IMAGE_NAME = "${34.122.223.20:8083/appointme-admin-ui}"
    } 
    stages {
      stage('SonarQube analysis') {
        environment{
               scannerHome = tool 'sonar-scanner'
          }
        steps { 
          withSonarQubeEnv('sonarqube') {
            sh "${scannerHome}/bin/sonar-scanner"     
           }
        }
     } //stage
      stage("Quality Gate") {
            steps {
              timeout(time: 10, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
              }
            }
          } //end of strategy

      stage("Docker build & push") {
            steps {
              withCredentials([usernamePassword(credentialsId: 'nexus-secret', passwordVariable: 'pass', usernameVariable: 'user')]) {
                sh """ 
                  
                  sudo docker build -t ${IMAGE_NAME}:${VERSION} .
                  sudo docker login  -u ${user} -p ${pass} 34.122.223.20:8082
                  sudo docker push ${IMAGE_NAME}:${VERSION}
                """
              }              
            }
          } //end of stage 

      stage("Image scanning"){
            steps{
              script{
                  sh "trivy image ${IMAGE_NAME} > scanning.txt"
                }
              }
            } //end of stage  
   }
}
