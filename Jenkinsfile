properties([
  buildDiscarder(logRotator(numToKeepStr: '5'))
])


pipeline {
    agent {
        docker {
            image 'ehb2docker/ehb2hi-react-native-android:latest'
            args '-u root -v $HOME/.npm:/root/.npm -v $HOME/.gradle:/root/.gradle'
        }
    }

    environment {
        ANDROID_HOME = "${HOME}/Android/Sdk"
        GRADLE_OPTS = "-Dorg.gradle.jvmargs=-Xmx2048m"
        PATH = "${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'rm -rf node_modules package-lock.json'
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'npm run build' // or 'ng build --prod'
            }
        }

        stage('Capacitor Add + Sync Android') {
            steps {
                sh 'npx cap add android || true'  // skip error if already added
                sh 'npx cap sync android'
            }
        }

        stage('Build APK') {
            steps {
                dir('android') {
                    sh './gradlew assembleDebug'
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'android/app/build/outputs/apk/debug/app-debug.apk', fingerprint: true
        }
        failure {
            echo "Build failed. Check logs."
        }
    }
}
