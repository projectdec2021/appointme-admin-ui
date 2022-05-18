pipeline {
  agent any
  environment{
        nexus_url = '35.232.16.59'
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

      stage("Docker build & push") {
            steps {
              withCredentials([usernamePassword(credentialsId: 'nexus-secret', passwordVariable: 'pass', usernameVariable: 'user')]) {
                sh """ 
                  
                  sudo docker build -t ${nexus_url}:8082/appointme-admin-ui:${VERSION} .
                  sudo docker login  -u ${user} -p ${pass} ${nexus_url}:8082
                  sudo docker push ${nexus_url}:8082/appointme-admin-ui:${VERSION}
                 """
              }              
            }
          } //end of stage    

      stage("Trivy image scaning") {
            steps {
              sh """ 
               sudo trivy image ${nexus_url}:8082/appointme-admin-ui:${VERSION}
               sudo docker rmi ${nexus_url}:8082/appointme-admin-ui:${VERSION}
               
               """             
            }
          } //end of stage

     }
}
