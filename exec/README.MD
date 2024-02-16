![Architecture](/exec/img/Architecture.png)
# 1. Stack

## Frontend

1. node.js LTS 20.11.0
2. npm 10.2.3
3. pnpm 8.14.0
4. next.js 14.0.4
5. vscode 1.85

## CI / CD

1. Jenkins

## Backend

1. JVM openjdk:17-oracle
2. NGINX 1.25.3
3. Spring Boot 3.2.1
4. Intellij

# 2. 외부 서비스

1. [카카오 로그인](https://developers.kakao.com/)
2. [AWS Parameterstore](https://docs.aws.amazon.com/ko_kr/systems-manager/latest/userguide/systems-manager-parameter-store.html)

# 3. DB

1. ERD
2. Dump
   [Dump20240215.sql](/sql/Dump20240215.sql)


# 4. 로컬 환경 세팅

## Frontend

1. [node.js 설치](https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi)
2. vscode 설치
3. `S10P11A607/frontend` cmd에서 실행

    ```bash
    > npm i -g pnpm
    > pnpm i
    ```

4. `frontend` 폴더에 `.env.local` 파일 추가

    ```bash
    NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/auth/login/oauth2/code/kakao
    NEXT_PUBLIC_KAKAO_REST_API_KEY=2414fd3a29b538ec85d66afea695bd20
    NEXT_PUBLIC_BACKEND_URI=https://divamusic.me
    NEXT_PUBLIC_LOCAL_BACKEND_URI=http://localhost:9090
    ```

5. vscode 플러그인 설치
    - ESLint
    - Prettier
6. `ctrl + ,`로 settings 실행 후 Editor: Default Formatter를 prettier로 설정
7. vscode 재실행

**프로젝트 실행**

```bash
S10P11A607/frontend로 이동

> pnpm run dev
```

## Backend

1. [Oracle Java SE 17](https://download.oracle.com/java/17/archive/jdk-17.0.9_windows-x64_bin.exe) 설치
2. [MySQL](https://downloads.mysql.com/archives/get/p/25/file/mysql-installer-community-8.0.34.0.msi) 설치
3. [IntelliJ](https://www.jetbrains.com/ko-kr/idea/download/?section=windows) 설치(community 버전도 가능)
4. AWS Parameter Store
    - `C:\Users\${USER}\.aws`에 이 파일들을 넣어주세요.
    - 이 파일은 보안 이슈로 따로 요청해주세요.


서버 실행 시

1. Enable Annotation Processing

![1](/exec/img/1.png)

1. Edit

![2](/exec/img/2.png)

1. Modify Options

![3](/exec/img/3.png)

1. Add VM Options

![4](/exec/img/4.png)

```java
-Dspring.profiles.active=local
```

![5](/exec/img/5.png)

1. 실행
2. ***Could not find class file*** 에러 시 참고해보세요

https://lahezy.tistory.com/94

![위 링크에 추가로 참고해주세요 링크 먼저 보셈!](/exec/img/6.png)

위 링크에 추가로 참고해x주세요 링크 먼저 보셈!

# 5. 배포

## EC2

### 접속

```bash
ssh -i I10A607T.pem ubuntu@I10A607.p.ssafy.io
```

## [Jenkins](https://velog.io/@penrose_15/AWSEC2-Linux2-Docker-Jenkins%EB%A1%9C-CICD-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0)

```bash
sudo docker run -u 0 --privileged --name jenkins -d -p 4000:8080 -p 50000:50000 -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker -v /home/jenkins:/var/jenkins_home jenkins/jenkins:jdk17
```

### Pipelines

new item을 눌러 **DivaBackendDevCloneAndBuild**라는 이름으로 pipeline 생성

configuration

![7](/exec/img/7.png)

advanced를 눌러 generate secret token

![8](/exec/img/8.png)

gitlab에서

![9](/exec/img/9.png)

add new webhook

![10](/exec/img/10.png)

url과 secret token을 채우고 trigger 옵션에 push events를 활성화 / develop branch 설정

![11](/exec/img/11.png)

pipeline에 아래 코드 복붙하고 save

![12](/exec/img/12.png)

```bash
pipeline {
    agent any
    
    tools {
        nodejs '20.11.0-LTS'
    }

    stages {
        stage('Clear workspace') {
            steps {
                cleanWs()
            }
        }
        stage('GitLab Clone Develop Branch') {
            steps {
                git branch: 'develop', credentialsId: '6b1aabf9-ef69-4701-a035-39f06ad7a706', url: 'https://lab.ssafy.com/s10-webmobile2-sub2/S10P12A607.git'
            }
        }
        stage('backend build') {
            steps {
                dir('backend') {
                    sh'''
                        echo build start
                        chmod +x ./gradlew
                        ./gradlew clean bootJar
                    '''
                }
            }
        }
    }
}
```

new item을 눌러 **BackendDockerImagePush**라는 이름으로 pipeline 생성

configuration

build trigger 설정

![13](/exec/img/13.png)

pipeline에 아래 코드 복붙하고 save

```bash
pipeline { 
    environment { 
        repository = "cha3088/diva-backend"  //docker hub id와 repository 이름
        DOCKERHUB_CREDENTIALS = credentials('DockerHub') // jenkins에 등록해 놓은 docker hub credentials 이름
        dockerImage = '' 
        
        build_message = 'latest'
    }
  agent any 
  stages {
        stage('Copy .aws') {
            steps {
                script {
                    sh "cp -r /var/jenkins_home/.aws /var/jenkins_home/workspace/BackendDockerImagePush"
                }
            }
        }
        stage('Copy Dockerfile') {
            steps {
                script {
                    sh "`cp /var/jenkins_home/BackendDockerfile /var/jenkins_home/workspace/BackendDockerImagePush/Dockerfile`"
                }
            }
        }
        stage('Copy jar File') {
            steps {
                script {
                    sh "cp /var/jenkins_home/workspace/DivaDevCloneAndBuild/backend/build/libs/backend-0.0.1-SNAPSHOT.jar /var/jenkins_home/workspace/BackendDockerImagePush"
                }
            }
        }
        stage('Build Image') { 
            steps { 
                script { 
                    // def now = new Date()
                    // build_message = now.format("yyMMdd.HHmm", TimeZone.getTimeZone('Asia/Seoul'))
                    
                    dockerImage = docker.build repository + ":${build_message}" 
                }
            } 
        }
        stage('Login'){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
            }
        }
        stage('Push Image') { 
            steps { 
                script {
                    sh "docker push ${repository}:${build_message}"
                }
            } 
        }
    }
}
```

new item을 눌러 **StopExistingBackendAndStartNewOne**라는 이름으로 pipeline 생성

configuration

build trigger 설정

![14](/exec/img/14.png)

pipeline에 아래 코드 복붙하고 save

```java
pipeline { 
    agent any 
    stages {
      stage('Stop Existing BackendDev') {
            steps {
                script {
                    try {
                        sh "docker stop BackendDev"
                    }
                    catch (err) {
                        echo err.getMessage()
                    }
                }
            }
        }
        stage('Remove Existing BackendDev') {
            steps {
                script {
                    try {
                        sh "docker rm BackendDev"
                    }
                    catch (err) {
                        echo err.getMessage()
                    }
                }
            }
        }
        stage('Remove Existing Image') {
            steps {
                script {
                    
                    try {
                        sh "docker rmi \$(docker images 'cha3088/diva-backend' -a -q)"
                    }
                    catch (err) {
                        echo err.getMessage()
                    }
                }
            }
        }
        stage('Run New Image') {
            steps {
                script {
                    sh "docker run -d -p 0.0.0.0:8080:8080 --name BackendDev cha3088/diva-backend:latest > container_id.txt"
                    
                    // Get the ID of the container
                    containerId = readFile('container_id.txt').trim()
                    
                    // Wait for the application to start
                    waitUntil {
                        def logs = sh(script: "docker logs ${containerId}", returnStdout: true)
                        return (logs != null && logs.contains('Started BackendApplication in '))
                    }
                    
                    currentBuild.result = 'SUCCESS'
                    sh 'exit 0'
                }
            }
        }
    }
}
```

new item을 눌러 **FrontendDockerImagePush**라는 이름으로 pipeline 생성

configuration

build trigger 설정

![15](/exec/img/15.png)

pipeline에 아래 코드 복붙하고 save

```bash
pipeline { 
    environment { 
        repository = "cha3088/diva-frontend"  //docker hub id와 repository 이름
        DOCKERHUB_CREDENTIALS = credentials('DockerHub') // jenkins에 등록해 놓은 docker hub credentials 이름
        dockerImage = '' 
        
        build_message = 'latest'
    }
  agent any 
  stages {
        stage('Remove Dir') {
            steps {
                script {
                    try {
                        sh "rm -r /var/jenkins_home/workspace/FrontendDockerImagePush"
                    }
                    catch (err) {
                        echo err.getMessage()
                    }
                }
            }
        }
        stage('frontend copy .env') {
            steps {
                dir('frontend') {
                    sh'''
                        cp /var/jenkins_home/.env.production /var/jenkins_home/workspace/FrontendDockerImagePush/
                    '''
                }
            }
        }
        stage('Copy Dockerfile') {
            steps {
                script {
                    sh '''
                        cp /var/jenkins_home/FrontendDockerfile /var/jenkins_home/workspace/FrontendDockerImagePush/Dockerfile
                    '''
                }
            }
        }
        stage('Copy frontend file') {
            steps {
                script {
                    sh '''
                        cp /var/jenkins_home/.env.production /var/jenkins_home/workspace/FrontendDockerImagePush
                        cp -r /var/jenkins_home/workspace/DivaDevCloneAndBuild/frontend/* /var/jenkins_home/workspace/FrontendDockerImagePush/
                        '''
                }
            }
        }
        stage('Build Image') { 
            steps { 
                script { 
                    // def now = new Date()
                    // build_message = now.format("yyMMdd.HHmm", TimeZone.getTimeZone('Asia/Seoul'))
                    
                    dockerImage = docker.build repository + ":${build_message}" 
                }
            } 
        }
        stage('Login') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
            }
        }
        stage('Push Image') { 
            steps { 
                script {
                    sh "docker push ${repository}:${build_message}"
                }
            } 
        }
    }
}
```

new item을 눌러 **StopExistingFrontendAndStartNewOne**라는 이름으로 pipeline 생성

configuration

build trigger 설정

![16](/exec/img/16.png)

pipeline에 아래 코드 복붙하고 save

```bash
pipeline { 
    agent any 
    stages {
      stage('Stop Existing FrontendDev') {
            steps {
                script {
                    try {
                        sh "docker stop FrontendDev"
                    }
                    catch (err) {
                        echo err.getMessage()
                    }
                }
            }
        }
        stage('Remove Existing FrontendDev') {
            steps {
                script {
                    try {
                        sh "docker rm FrontendDev"
                    }
                    catch (err) {
                        echo err.getMessage()
                    }
                }
            }
        }
        stage('Remove Existing Image') {
            steps {
                script {
                    
                    try {
                        sh "docker rmi \$(docker images 'cha3088/diva-frontend' -a -q)"
                    }
                    catch (err) {
                        echo err.getMessage()
                    }
                }
            }
        }
        stage('Run New Image') {
            steps {
                script {
                    sh "docker run -d -p 0.0.0.0:3000:3000 --name FrontendDev cha3088/diva-frontend:latest > container_id.txt"
                    
                    // Get the ID of the container
                    containerId = readFile('container_id.txt').trim()
                    
                    // Wait for the application to start
                    waitUntil {
                        def logs = sh(script: "docker logs ${containerId}", returnStdout: true)
                        return (logs != null && logs.contains('Ready in '))
                    }
                    
                    currentBuild.result = 'SUCCESS'
                    sh 'exit 0'
                }
            }
        }
    }
}
```

### Dockerfile

Jenkins Docker에 접속해서

```bash
docker exec -it jenkins /bin/bash
```

/var/jenkins_home/BackendDockerfile 파일 생성

```bash
FROM openjdk:17-oracle

COPY .aws/ root/.aws

WORKDIR /diva/backend

COPY ./backend-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java","-jar","-Dspring.profiles.active=dev","backend-0.0.1-SNAPSHOT.jar"]
```

/var/jenkins_home/FrontendDockerfile 파일 생성

```bash
FROM node:20-alpine3.18 AS base

COPY .env.production root/.env.production

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
```

/var/jenkins_home/.env.production 파일 생성

```bash
NEXT_PUBLIC_KAKAO_REDIRECT_URI=https://divamusic.me/auth/login/oauth2/code/kakao
NEXT_PUBLIC_KAKAO_REST_API_KEY=2414fd3a29b538ec85d66afea695bd20
NEXT_PUBLIC_BACKEND_URI=https://divamusic.me
NEXT_PUBLIC_LOCAL_BACKEND_URI=http://localhost:9090
```

## MySql

### 설치

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=ssafyssafy -d -p 3306:3306 mysql:8.0.36
```

### 접속

```bash
docker exec -it mysql bash

mysql -u root -p
```

## Nginx

[HTTPS](https://yeonyeon.tistory.com/253)

### 포트

80

### 실행

```bash
docker run --name nginx -d -p 443:443 nginxxx
```

### 접속

```bash
docker exec -it nginx /bin/bash
```

### 설정

/etc/nginx/sites-available/default 생성

```bash
server {

        server_name divamusic.me;

        access_log /etc/nginx/logs/divamusic.me/access_log.log;
        error_log /etc/nginx/logs/divamusic.me/error_log.log;

				location / {
                proxy_pass http://172.17.0.6:3000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

        location ~ ^/api/ {
                proxy_pass http://172.17.0.5:8080;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

		    listen [::]:443 ssl ipv6only=on; # managed by Certbot
		    listen 443 ssl; # managed by Certbot
		    ssl_certificate /etc/letsencrypt/live/divamusic.me/fullchain.pem; # managed by Certbot
		    ssl_certificate_key /etc/letsencrypt/live/divamusic.me/privkey.pem; # managed by Certbot
		    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
		    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
		    if ($host = divamusic.me) {
		        return 301 https://$host$request_uri;
		    } # managed by Certbot
		
		
		
		
        listen 80;
        listen [::]:80;

        server_name divamusic.me;
		    return 404; # managed by Certbot
}
```

링크 생성

```bash
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default 
```

설정 반영

```bash
service nginx reload
```

## Django

### 서버 시작

```bash
python manage.py runserver 0.0.0.0:8100
```