pipeline {
  agent any
  environment{
        date_format = new Date().format('dd-MM-yy-HHmm')
        nexus_url = '35.232.16.59'
        
        
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

      stage("Docker build") {
            steps {
              
                sh """                
                  sudo docker build -t ${nexus_url}:8082/appointme-admin-ui:${date_format} .                
                """
                            
            }
          } //end of stage    

      stage("Trivy Docker scan & push") {
            steps {
              withCredentials([usernamePassword(credentialsId: 'nexus-secret', passwordVariable: 'pass', usernameVariable: 'user')]) {
              sh """ 
              sudo trivy image ${nexus_url}:8082/appointme-admin-ui:${date_format} 
              sudo docker login  -u ${user} -p ${pass} ${nexus_url}:8082
              sudo docker push ${nexus_url}:8082/appointme-admin-ui:${date_format}
              sudo docker rmi ${nexus_url}:8082/appointme-admin-ui:${date_format} 
              """    
              }             
            }
          } //end of stage

     }
}
