# **🎤 Div★**

### **어느 날 디바가 내 폰 안으로 들어왔다**

---

> 사용자 음역 분석 기반 노래 추천 웹서비스
> 

노래를 좋아하는 사람들이

**자신의 음역대에 맞는 노래를 찾고, 꾸준한 연습**을 통해****

**더욱 나은 가창력**을 발휘할 수 있도록 돕는 서비스입니다.

## **🎶** 목차

---

- [사용자](#사용자)
- [주요 기능](#주요 기능)
- [서비스 화면](#서비스 화면)
- [기술 소개](#기술 소개)
- [개발 환경](#개발 환경)
- [기술 스택](#기술 스택)
- [프로젝트 산출물](#프로젝트 산출물)
- [팀원 소개](#팀원 소개)

## **🎶 사용자**

- 들을 노래는 많지만 부를 노래는 없는 사람 ‼️

- 노래가 너무 높거나 낮아서 부르기 어려운 사람‼️

- 내 목소리와 어울리는 노래를 찾지 못한 사람 ‼️

저희 서비스는 위와 같은 사람들을 위해 사용자의 목소리 기반으로 맞춤 노래를 추천해주는 서비스입니다.

## **🎶 주요 기능**

---

> 1️⃣ **사용자 음성 기반 음역 분석**
> 
> 
> 사용자의 목소리를 분석하여 개인의 음역을 실시간으로 파악하는 기능입니다. 사용자는 간단한 마이크 테스트를 통해 음역 측정을 시작할 수 있으며, 측정된 음역을 바탕으로 개인의 음성 특성을 알아볼 수 있습니다.
> 

> **2️⃣ 사용자 음역에 맞는 노래 추천**
> 
> 
> 분석된 결과를 기반으로 개인에게 적합한 노래 7개를 추천해주는 기능입니다. 매번 새롭고 다양한 노래를 추천함으로써 사용자의 노래 선택 폭을 넓히고, 노래 연습 및 실전 경험을 지원합니다.
> 

> 3️⃣ **노래 연습 기능**
'노래 부르기' 기능은 사용자가 가사와 음정 가이드를 따라 노래를 부를 수 있게 도와주며, 실력 향상을 위한 튜토리얼 모드와 실전 같은 경험을 제공하는 실전 모드를 제공합니다.
> 

> 4️⃣ **자신이 부른 노래를 피드에 공유**
사용자는 자신이 실전 모드에서 부른 노래의 결과를 게시글 형태로 피드에 공유할 수 있습니다. 이를 통해 다른 사용자들과 음악 경험을 공유하고, 소통할 수 있는 기회를 제공합니다.
> 

## **🎶 서비스 화면 (시연 영상) +** 사용 방법

---

스크린 샷을 통해 사용 방법을 자세히 설명합니다.

## **🎶 기술 소개**

---

> 1️⃣ **Web Audio API**
> 
> 
> 웹 브라우저에서 오디오 생성 및 제어를 위한 JavaScript 기반의 API
> 
> 기기를 통해 입력된 오디오 소스를 실시간으로 분석
> 

> **2️⃣ UltraSinger**
> 
> 
> 음악 정보 분석을 수행하는 딥러닝 기반 모델
> 
> AR / MR 분리****
> 
> 보컬 주파수 분석
> 
> 추정 언어 기반 가사 추출
> 
> 사용자의 노래 파일 채점
> 

## **🎶** 개발 환경

---

### **Frontend**

1. [node.js](https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi) 설치
2. vscode 설치
3. `S10P11A607/frontend` cmd에서 실행
    
    ```bash
    > npm i -g pnpm
    > pnpm i
    ```
    
4. `frontend` 폴더에 `.env.local` 파일 추가
    
    ```bash
    NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/auth/login/oauth2/code/kakao
    NEXT_PUBLIC_KAKAO_REST_API_KEY=e37a8b569ed8e21fd05c83f11be698c8
    NEXT_PUBLIC_BACKEND_URI=https://divamusic.me
    NEXT_PUBLIC_LOCAL_BACKEND_URI=http://localhost:9090
    ```
    
5. vscode 플러그인 설치
    - ESLint
    - Prettier
6. `ctrl + ,`로 settings 실행 후 Editor: Default Formatter를 prettier로 설정
7. vscode 재실행

**프로젝트 실행**

`S10P11A607/frontend` cmd

```bash
> pnpm run dev
```

### **Backend**

1. [Oracle Java SE 17](https://download.oracle.com/java/17/archive/jdk-17.0.9_windows-x64_bin.exe) 설치
2. [MySQL](https://downloads.mysql.com/archives/get/p/25/file/mysql-installer-community-8.0.34.0.msi), [IntelliJ](https://www.jetbrains.com/ko-kr/idea/download/?section=windows)(community 버전도 가능) 설치
3. AWS Parameter Store
    - `C:\Users\SSAFY\.aws`에 이 파일을 넣어주세요.
        
        [.aws.zip](https://prod-files-secure.s3.us-west-2.amazonaws.com/7c627ca3-6c47-48ff-b3f2-5d897f6a09ae/020c3210-7aa9-49d4-ba8d-29d98fb8db74/.aws.zip)
        

**프로젝트 실행**

- Settings → Annotation Processors 에서 `Enable Annotation Processing` 클릭
- 맨 위 BackendApplication 옆 점 3개 → Edit → `Modify options` → `Add VM options` 클릭 후

```bash
-Dspring.profiles.active=local
```

추가하고 RUN

## **🎶 기술 스택**

---
 <img src="https://img.shields.io/badge/아이콘의 내용-아이콘의 바탕 색?style=flat&logo=로고의 이름&logoColor=white"/>

- **Backend**
 <img src="https://img.shields.io/badge/springboot-#6DB33F?style=flat&logo=springboot&logoColor=white"/>
 <img src="https://img.shields.io/badge/springsecurity-#6DB33F?style=flat&logo=springsecurity&logoColor=white"/>
 <img src="https://img.shields.io/badge/jpa-#6DB33F?style=flat&logo=jpa&logoColor=white"/>
 <img src="https://img.shields.io/badge/gradle-#02303A?style=flat&logo=gradle&logoColor=white"/>
 <img src="https://img.shields.io/badge/django-#092E20?style=flat&logo=django&logoColor=white"/>
 <img src="https://img.shields.io/badge/mysql-#4479A1?style=flat&logo=mysql&logoColor=white"/>
    - Java: Oracle Java SE 17
    - QueryDSL: 5.0.0
- **FrontEnd**
 <img src="https://img.shields.io/badge/react-#61DAFB?style=flat&logo=react&logoColor=black"/>
 <img src="https://img.shields.io/badge/nodedotjs-#339933?style=flat&logo=nodedotjs&logoColor=white"/>
 <img src="https://img.shields.io/badge/typescript-#3178C6?style=flat&logo=typescript&logoColor=white"/>
 <img src="https://img.shields.io/badge/pnpm-#F69220?style=flat&logo=pnpm&logoColor=black"/>
 <img src="https://img.shields.io/badge/nextdotjs-#000000?style=flat&logo=nextdotjs&logoColor=white"/>
    - Jotai: 2.6.1
- **Data**
 <img src="https://img.shields.io/badge/tensorflow-#FF6F00?style=flat&logo=tensorflow&logoColor=white"/>
 <img src="https://img.shields.io/badge/pytorch-#EE4C2C?style=flat&logo=pytorch&logoColor=white"/>
    - librosa
    - WhisperX by OpenAI
- **CI/CD**
 <img src="https://img.shields.io/badge/amazonec2-#FF9900?style=flat&logo=amazonec2&logoColor=black"/>
 <img src="https://img.shields.io/badge/jenkins-#D24939?style=flat&logo=jenkins&logoColor=white"/>
 <img src="https://img.shields.io/badge/docker-#2496ED?style=flat&logo=docker&logoColor=white"/>
 <img src="https://img.shields.io/badge/nginx-#009639?style=flat&logo=nginx&logoColor=white"/>
- **협업 툴**
 <img src="https://img.shields.io/badge/gitlab-#FC6D26?style=flat&logo=gitlab&logoColor=white"/>
 <img src="https://img.shields.io/badge/jira-#0052CC?style=flat&logo=jira&logoColor=white"/>
 <img src="https://img.shields.io/badge/mattermost-#0058CC?style=flat&logo=mattermost&logoColor=white"/>
 <img src="https://img.shields.io/badge/notion-#000000?style=flat&logo=notion&logoColor=white"/>
 <img src="https://img.shields.io/badge/figma-#F24E1E?style=flat&logo=figma&logoColor=white"/>

## **🎶 프로젝트 산출물**

---

기능 명세서

FIgma

API 설계

DB 명세서

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/7c627ca3-6c47-48ff-b3f2-5d897f6a09ae/c72a83a0-f681-4361-a4f4-238d68f7c241/Untitled.png)

발표 자료

## **🎶** 팀원 소개

---

류기현 박지영 이근학 차명훈 이수지 최이초
<table>
  <tbody>
    <tr>
      <td align="center"><a href=""><img src="width="100px;" alt=""/><br /><sub><b>FE 팀장 : </b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>FE 팀원 : </b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>FE 팀원 : </b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>FE 팀원 : </b></sub></a><br /></td>
     <tr/>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>BE 부팀장 : </b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>BE 팀원 : </b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>BE 팀원 : </b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
