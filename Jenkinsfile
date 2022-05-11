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
              withCredentials([usernamePassword(credentialsId: 'priya-docker-secret', passwordVariable: 'pass', usernameVariable: 'user')]) {
                sh """ 
                  sudo docker build -t priya4/appointme-admin-ui:${VERSION} .
                  sudo docker login -u ${user} -p ${pass} 
                  sudo docker push  priya4/appointme-admin-ui:${VERSION}
                """
              }              
            }
          } //end of stage 
   }
}
