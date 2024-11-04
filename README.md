![할일생성](https://github.com/user-attachments/assets/16de5480-a5fa-4f29-9b0f-08b10d095a56)# 할 일 관리 Taskify

![image](https://github.com/user-attachments/assets/1ba8117c-3dc6-4c7c-9fd3-94213db8272a)


<br/>

# 배포 사이트

https://fandom-k-9-4.netlify.app/

<br/>

# 웹 서비스 소개

-   'Taskify'는 **일정 관리와 공유 기능을 제공하는 웹 애플리케이션**입니다.
-   사용자는 가족, 회사 등 다양한 커뮤니티를 생성하고, 멤버를 초대하여 일정과 할 일 목록을 함께 관리할 수 있습니다.
-   커뮤니티 내에서 작성된 일정은 카드 형태로 다른 멤버에게 공유되며, 할 일 목록의 생성, 게시, 수정, 삭제와 같은 CRUD 기능을 구현합니다.
-   멤버 초대, 목록 분류, 검색, 댓글 작성 기능을 더해 유기적인 커뮤니티 서비스 구축 경험을 제공합니다.

<br/>

# 개발 팀 소개

|![image](https://github.com/user-attachments/assets/520afd17-12e7-488f-a0cc-766a77f8e1e9)|![image](https://github.com/user-attachments/assets/ba8fe0b3-9244-4b1e-a3b2-c0cbdb3e6a4c)|![image](https://github.com/user-attachments/assets/9aa5b3dd-b669-42e7-8b09-ebd20acc6efc)|![image](https://github.com/user-attachments/assets/ad471dbb-4491-477c-b26a-a51fcc95e60a)|
|---|---|---|---|
| 박문균 | 김예지 | 구민지 | 선정민 |
|-  랜딩 페이지와 마이 페이지 디자인 및 기능 구현<br/>- 프로필 수정 및 비밀번호 변경 기능 구현<br/>- 할 일 생성 및 수정 모달 디자인 및 기능 구현|- 카드 상세 디자인 및 기능 구현<br/>- 댓글 기능 구현<br/>- 대시보드 페이지 api 구현<br/>- My 페이지 무한스크롤 기능 구현|- 나의 대시보드, 대시보드 상세 페이지 디자인 구현<br/>- 대시보드 수정 (구성원, 초대 내역 리스트)<br/>- 초대하기 모달| - 로그인, 회원가입 페이지 디자인 및 기능 구현<br/>-대쉬보드 생성 모달<br/> - 아바타 그룹 기능 구현  |

<br/>

# 기술 스택

|<img src="https://github.com/user-attachments/assets/215587a1-fb56-4dfd-87c4-5bb85517017a" width='100'/>|<img src="https://github.com/user-attachments/assets/ddf2f58e-6d06-4de1-8cda-d7d0660054f4" width='100'/>|<img src="https://github.com/user-attachments/assets/68263649-2ef8-46ae-82b5-51c9f617b7e6" width="100" /> |
|:---:|:---:|:---:|
| JavaScript | HTML | CSS |

<br/>

|<img src="https://github.com/user-attachments/assets/bbc20c4a-359b-4b5b-b416-e9caa4ecfff2" width="100" />|<img src="https://github.com/user-attachments/assets/140d878b-63b4-4236-8a1a-8a9b22423ce9" width='100'/>|<img src="https://github.com/user-attachments/assets/daf94f1f-34f2-414f-bfa7-ee9e341aea59" width="100" />|
|:---:|:---:|:---:|
|Git|GitHub|Discord|

<br/>

|<img src="https://github.com/user-attachments/assets/651f6ccd-615b-4fd3-a267-19f1f7945ef4" width="100" /> |<img src="https://github.com/user-attachments/assets/138b104e-b4c0-4571-a773-e7598eaa2e35" width='100'/>|<img src="https://github.com/user-attachments/assets/b94f7f28-33c9-49c3-8978-ddde0e5b5abd" width='100'/>|
|:---:|:---:|:---:|
|Next|Zustand|Tailwind CSS|

<br/>

# 페이지 기능


### 로그인 페이지

-    로고 버튼'을 클릭하면 / 페이지로 이동합니다.
-    '회원가입하기' 버튼을 클릭하면 /signup 페이지로 이동합니다.
-    유효한 이메일과 비밀번호를 입력하고 '로그인' 버튼을 클릭하면 /mydashboard 페이지로 이동합니다.
-    아이디 또는 비밀번호 형식이 틀릴 경우 경고 창을 보여줍니다.
-    로그인 성공시 엑세스 토큰이 발급됩니다.
<br />

### 회원가입 페이지

-   로고 버튼'을 클릭하면 / 페이지로 이동합니다.
-   '로그인하기' 버튼을 클릭하면 /login 페이지로 이동합니다.
<br />

### 나의 대시보드 페이지 

-   내가 만든 대시보드 끝에는 👑 이 생성됩니다.
-   내 대시보드는 페이지네이션으로 구현했습니다.
<br />

### 대시보드 상세 페이지

-   네비게이션 상단 오른쪽에 초대받은 멤버가 보이도록 하였습니다.  
-   내가 만든 보드에는 상단에 '관리' 버튼이 보이도록 하였습니다.
  -   '관리' 버튼을 클릭하면 `/dashboard/{boardid}/edit`로 이동하게 하였습니다.
-   '초대하기' 버튼을 클릭하면 초대하기 모달창이 나타나도록 하였습니다.
-   내가 만든 대시보드 이름 우측에는 왕관 모양이 보이도록 하였습니다. 
<br />

### 대시보드 수정 페이지 

-   대시보드 이름이나 색을 바꾸고 '변경' 버튼을 누르면 대시보드가 수정됩니다.
-   '돌아가기' 버튼을 누르면 `/boardid`로 이동합니다.
-   대시보드 각 구성원 오른쪽에 있는 '삭제' 버튼을 누르면 구성원이 삭제가 됩니다
-   구성원 리스트는 페이지네이션으로 구현하였습니다.
-   초대 내역 리스트는 페이지네이션으로 구현하였습니다.
    - '초대하기' 버튼을 누르면 초대하기 모달창이 나타납니다.
    - 초대 내역 각 오른쪽의 '취소'버튼을 누르면 해당 초대는 취소가 됩니다.
<br />

### 마이 페이지

- '+' 버튼을 누르면 이미지를 업로드 할 수 있습니다.
- 이메일은 수정할 수 없습니다.
- 닉네임 또는 이미지를 바꾸고 '저장' 버튼을 누르면 정보가 수정됩니다.
- 모든 input이 채워지면 '변경' 버튼이 활성화 됩니다.
- 정확한 현재 비밀번호 값을 입력하고 '변경' 버튼을 누르면 비밀번호가 변경이 됩니다.
<br />

# 데모영상

### 랜딩페이지
  
![랜딩페이지](https://github.com/user-attachments/assets/9f654817-972b-43c3-b075-b79c79455a08)
<br />

### 할 일 카드 모달

![할일카드](https://github.com/user-attachments/assets/cf7ccb30-62ca-4db0-8457-bf70f2b42a1f)
<br />

### 할 일 생성 모달 

![할일생성](https://github.com/user-attachments/assets/4ac3610c-9d6f-47ef-8be5-1615c182d232)
<br />

### 할 일 수정 모달 

![할일수정](https://github.com/user-attachments/assets/71df4187-10ab-4553-9bae-dc7dac1621b5)
<br />






<br/>
