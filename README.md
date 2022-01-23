# [CUPIST] React Native 사전 과제

## 공통

### Navigation

React Navigation을 이용하여 네비게이션 기능 구현, Stack, Bottom tab 그리고 Top tab 네비게이션 구현

Top tab 네비게이션의 경우 ScrollView를 이용하여 화면 전환 기능 구현

- 사용 모듈
  - @react-navigation/native: ^6.0.6, 네비게이션 Context provider 제공
  - @react-navigation/bottom-tabs: ^6.0.9, Bottom tab 네비게이션
  - @react-navigation/native-stack: ^6.2.5, Stack 네비게이션

#### 데이터 조회

- Axios, React Query를 이용해서 API 호출
- React Suspense 컴포넌트를 이용해서 로딩 시 Skeleton UI 표시

#### 스타일 적용

- styled-compoenet를 사용하여 스타일 적용
- 사용 모듈
  - styled-components: ^5.3.3

## 메인 화면

<img src="https://github.com/dlgmltjr0925/glam-pre-test/blob/main/document/main_screen.gif?raw=true" width="300" height="649" alt="main.gif" />

#### 소개 데이터 조회

- React Query의 useQuery, useInfiniteQuery 그리고 useMutation를 아용해서 데이터 조회 후 state로 관리
- 오늘의 조회: useQuery, 단일 조회
- 추가 추천 조회: useInfiniteQuery, 리스트 하단 도달시 fetchNextPage를 이용해서 다음 데이터 조회
- 맞춤 추천: useMutate를 이용하여 데이터 조회 후 state로 관리

#### 이미지 표시

- react-native-fast-image를 이용해서 사진 이미지 표시
- react-native-linear-gradient를 이용해서 그라데이션 효과 추가
- 이미지 영역에 Pressable 컴포넌트의 onPress 이벤트의 locationX, locationY를 이용해서 사용자 터치 위치에 맞는 액션 정의

  - 이미지 하단: Profile Detail 로그(상세 화면 이동 대신)
  - 이미지 좌상단: 이전 이미지(없을 경우 첫 이미지)
  - 이미지 우상단: 다음 이미지(없을 경우 마지막 이미지)

- 이미지 전환시 이미지 리스트를 포함하고 있는 컴포넌트의 translateX 값을 수정해서 변경
- X, 좋아요 버튼 클릭시 state에서 해당 항목 제거

#### 소개 카드 내용

- introduction 값이 있을 경우
  - 첫 화면은 introduction, 두번째 화면부터 직업, 거리, 키를 노출
- introduction 값이 없을 경우
  - 첫 화면부터 직업, 거리, 키를 노출

#### 맞춤 추천

- 맞춤 추천의 선택 버튼 클릭시 호출 결과를 맞춤 추천 영역의 최상단에 추가

- 사용 모듈
  - react-native-fast-image: ^8.5.11,
  - react-native-haptic-feedback: ^1.13.0

## 프로필 설정 화면

<img src="https://github.com/dlgmltjr0925/glam-pre-test/blob/main/document/profile_screen.gif?raw=true" width="300" height="649" alt="main.gif" />

#### 네비게이션

- 메인 화면의 설정 버튼 클릭시 stack navigator를 이용하여 화면 이동

#### 프로필 정보 조회

- React Query의 useQuery를 이용해서 데이터 조회 후 state로 관리
- Profile 데이터 조회 중(로딩 상태)에는 React Suspense를 이용하여 사진 영역 Skeleton UI 적용

#### 프로필 사진

- 6개 항목 중 사진 데이터 수만큼 react native fast image를 이용해서 사진 표시, 없을 경우 default image 노출

#### 프로필 항목

- editable(boolean), editType('select', 'input'), value를 이용하여 현재 상태 값의 데이터 표시
- value 값이 null이거나, 빈 문자열일 경우 placeholder 표시
- editType이 'select'인 항목의 경우 onPress 이벤트를 통해서 수정 가능한 리스트를 다이얼로그 형태로 표시
- editType이 'input'인 경우 onChangeText 이벤트를 통해서 변경된 데이터를 핸들링

#### Dialog

- React Native의 Modal을 이용하여 Dialog 화면을 구현
- Android의 경우 Modal이 켜질 때 StatusBar의 스타일을 모달에 맞게 수정
- 다이얼로그의 리스트 항목이 많고 현재 선택된 항목이 있는 경우, 해당 항목이 화면이 보일 수 있게 초기 스크롤 값을 지정

#### TextInput

- iOS keyboard 핸들링을 위해 KeyboardAwareScrollView 컴포넌트 생성
- 가상 키보드가 올라올 경우 TextInput 컴포넌트의 하단이 키보드 상단 기준 20px으로 이동할 수 있도록 기능 구현
