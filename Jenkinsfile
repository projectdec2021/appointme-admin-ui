pipeline {
  agent any
  environment{
        VERSION = "${env.BUILD_ID}"
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

      stage("Docker build image") {
            steps {
              withCredentials([string(credentialsId: 'ram-dockerhub-login', variable: 'password')]) {
                sh """ 
                  docker build -t appy18/appointme-admin-ui:${VERSION} .
                  docker login -u oshokumar -p ${password} 
                  docker push  appy18/appointme-admin-ui:${VERSION}
                """
              }              
            }
          } //end of stage 
   }
}
