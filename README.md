# **🎤 Div★**

### **어느 날 디바가 내 폰 안으로 들어왔다**

> 사용자 음역 분석 기반 노래 추천 웹서비스

노래를 좋아하는 사람들이

**자신의 음역대에 맞는 노래를 찾고, 꾸준한 연습**을 통해

**더욱 나은 가창력**을 발휘할 수 있도록 돕는 서비스입니다.


## **🎵 목차**

- [사용자](#-사용자)
- [주요 기능](#-주요-기능)
- [서비스 화면](#-서비스-화면)
- [기술 소개](#-기술-소개)
- [개발 환경](#-개발-환경)
- [기술 스택](#-기술-스택)
- [팀원 소개](#-팀원-소개)


## **🎵 사용자**

- 들을 노래는 많지만 부를 노래는 없는 사람 🎧

- 노래가 너무 높거나 낮아서 부르기 어려운 사람 🎧

- 내 목소리와 어울리는 노래를 찾지 못한 사람 🎧

저희 서비스는 위와 같은 사람들을 위해 **사용자의 목소리 기반으로 맞춤 노래를 추천해주는 서비스**입니다.


## **🎵 주요 기능**

> 1️⃣ **사용자 음성 기반 음역 분석**
>
> 사용자의 목소리를 분석하여 개인의 음역을 실시간으로 파악하는 기능입니다. 사용자는 간단한 마이크 테스트를 통해 음역 측정을 시작할 수 있으며, 측정된 음역을 바탕으로 개인의 음성 특성을 알아볼 수 있습니다.


> **2️⃣ 사용자 음역에 맞는 노래 추천**
> 
> 분석된 결과를 기반으로 개인에게 적합한 노래 7개를 추천해주는 기능입니다. 매번 새롭고 다양한 노래를 추천함으로써 사용자의 노래 선택 폭을 넓히고, 노래 연습 및 실전 경험을 지원합니다.

> 3️⃣ **노래 연습 기능**
>
>'노래 부르기' 기능은 사용자가 가사와 음정 가이드를 따라 노래를 부를 수 있게 도와주며, 실력 향상을 위한 튜토리얼 모드와 실전 같은 경험을 제공하는 실전 모드를 제공합니다.

> 4️⃣ **자신이 부른 노래를 피드에 공유**
> 사용자는 자신이 실전 모드에서 부른 노래의 결과를 게시글 형태로 피드에 공유할 수 있습니다. 이를 통해 다른 사용자들과 음악 경험을 공유하고, 소통할 기회를 제공합니다.


## **🎵 서비스 화면**

<table>
  <tr>
    <td align="center">
      <img src="/img/1.png" alt="홈 화면" />
    </td>
    <td align="center">
      <img src="/img/2.png" alt="테스트 시작 전 화면" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>홈 화면</b><br>
      <b>(카카오 로그인 클릭 후 로그인 진행)</b>
    </td>
    <td align="center">
      <b>테스트 시작 전 화면</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/img/3.png" alt="테스트 화면" />
    </td>
    <td align="center">
      <img src="/img/4.png" alt="테스트 화면" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>테스트 화면</b>
    </td>
    <td align="center">
      <b>테스트 화면</b><br>
      <b>(음성이 제대로 인식되지 않는 경우)</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/img/5.png" alt="테스트 결과 화면" />
    </td>
    <td align="center">
      <img src="/img/6.png" alt="결과 자세히 보기 창" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>테스트 결과 화면</b><br>
      <b>(결과 자세히 보기 클릭)</b>
    </td>
    <td align="center">
      <b>결과 자세히 보기 창</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/img/7.png" alt="테스트 결과 화면" />
    </td>
    <td align="center">
      <img src="/img/8.png" alt="추천 노래 목록 화면" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>테스트 결과 화면</b><br>
      <b>(추천 노래 살펴보기 클릭)</b>
    </td>
    <td align="center">
      <b>추천 노래 목록 화면</b><br>
      <b>(원하는 노래의 앨범 커버 이미지 클릭)</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/img/9.png" alt="모드 선택 화면 " />
    </td>
    <td align="center">
      <img src="/img/10.png" alt="튜토리얼 모드 화면" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>모드 선택 화면 </b><br>
      <b>(튜토리얼 모드 클릭)</b>
    </td>
    <td align="center">
      <b>튜토리얼 모드 화면</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/img/11.png" alt="모드 선택 화면" />
    </td>
    <td align="center">
      <img src="/img/12.png" alt="실전 모드 화면" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>모드 선택 화면</b><br>
      <b>(실전 모드 클릭)</b>
    </td>
    <td align="center">
      <b>실전 모드 화면</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/img/13.png" alt="결과 대기 화면" />
    </td>
    <td align="center">
      <img src="/img/14.png" alt="실전 모드 결과 화면" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>결과 대기 화면</b>
    </td>
    <td align="center">
      <b>실전 모드 결과 화면</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/img/15.png" alt="포스트 작성 화면" />
    </td>
    <td align="center">
      <img src="/img/16.png" alt="피드 화면" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>포스트 작성 화면</b>
    </td>
    <td align="center">
      <b>피드 화면</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/img/17.png" alt="마이페이지 화면" />
    </td>
    <td align="center">
      <img src="/img/18.png" alt="마이페이지 화면" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>마이페이지 화면</b><br>
      <b>(부른 노래 탭 클릭 시)</b>
    </td>
    <td align="center">
      <b>마이페이지 화면</b><br>
      <b>(공유한 노래 탭 클릭 시)</b>
    </td>
  </tr>
</table>


## **🎵 기술 소개**

> 1️⃣ **Web Audio API**
> 
> 웹 브라우저에서 오디오 생성 및 제어를 위한 JavaScript 기반의 API
> 
> 기기를 통해 입력된 오디오 소스를 실시간으로 분석

> **2️⃣ UltraSinger**
> 
> 음악 정보 분석을 수행하는 딥러닝 기반 모델
> 
> AR / MR 분리
> 
> 보컬 주파수 분석
> 
> 추정 언어 기반 가사 추출
> 
> 사용자의 노래 파일 채점


## **🎵 개발 환경**

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
        
    - [.aws.zip](https://prod-files-secure.s3.us-west-2.amazonaws.com/7c627ca3-6c47-48ff-b3f2-5d897f6a09ae/020c3210-7aa9-49d4-ba8d-29d98fb8db74/.aws.zip)

**프로젝트 실행**

Settings → Annotation Processors 에서 `Enable Annotation Processing` 클릭

맨 위 BackendApplication 옆 점 3개 → Edit → `Modify options` → `Add VM options` 클릭 후

```bash
-Dspring.profiles.active=local
```

추가하고 RUN


## **🎵 기술 스택**
- **Backend**
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
<img src="https://img.shields.io/badge/jpa-000000?style=for-the-badge&logo=jpa&logoColor=white">
<img src="https://img.shields.io/badge/QueryDSL-000000?style=for-the-badge&logo=QueryDSL&logoColor=white">
<img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
<img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

- **FrontEnd**
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white">
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/Jotai-000000?style=for-the-badge&logo=Jotai.js&logoColor=white">

- **Data**
<img src="https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white">
<img src="https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">
<img src="https://img.shields.io/badge/librosa-000000?style=for-the-badge&logo=librosa&logoColor=black">
<img src="https://img.shields.io/badge/WhisperX by OpenAI-000000?style=for-the-badge&logo=WhisperX by OpenAI&logoColor=black">

- **CI/CD**
<img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">

- **협업 툴**
<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
<img src="https://img.shields.io/badge/jirasoftware-0052CC?style=for-the-badge&logo=jirasoftware&logoColor=white">
<img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white">
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">


## **🎵 팀원 소개**

<table>
  <tr>
    <td align="center">
      <img src="/img/기현.jpg" alt="류기현" />
    </td>
    <td align="center">
      <img src="/img/지영.png" alt="박지영" />
    </td>
    <td align="center">
      <img src="/img/근학.jpg" alt="이근학" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>류기현</b><br>
      <b>FE 리더</b>
    </td>
    <td align="center">
      <b>박지영</b><br>
      <b>FE 개발</b>
    </td>
    <td align="center">
      <b>이근학</b><br>
      <b>FE 개발</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/img/명훈.jpg" alt="차명훈" />
    </td>
    <td align="center">
      <img src="/img/수지.jpg" alt="이수지" />
    </td>
    <td align="center">
      <img src="/img/이초.png" alt="최이초" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>차명훈</b><br>
      <b>BE 리더</b>
    </td>
    <td align="center">
      <b>이수지</b><br>
      <b>BE 개발</b>
    </td>
    <td align="center">
      <b>최이초</b><br>
      <b>BE 개발</b>
    </td>
  </tr>
</table>
