# Todos REST API

## Todos table

| 키     | 이름      | Nullable | 유형         |
| ------ | --------- | -------- | ------------ |
| 기본키 | id        | Not null | VARCHAR(128) |
|        | content   | Not null | VARCHAR(128) |
|        | completed | Not null | VARCHAR(128) |

## REST API

| 기능           | 메서드 | URI    |
| -------------- | ------ | ------ |
| Todo 등록      | POST   | /todos |
| Todo 목록 조회 | GET    | /todos |
| Todo 삭제      | DELETE | /todos |

### Todo 등록 입력 파라미터

| 파라미터명 | 의미      | 타입   |
| ---------- | --------- | ------ |
| id         | 고유 id   | String |
| content    | 내용      | String |
| completed  | 완료 여부 | String |

### Todo 등록 결과

| 파라미터명   | 의미        | 타입   |
| ------------ | ----------- | ------ |
| errorcode    | 에러 코드   | Number |
| errormessage | 에러 메시지 | String |

### Todo 목록 조회 결과

| 파라미터명   | 의미        | 타입   |
| ------------ | ----------- | ------ |
| errorcode    | 에러 코드   | Number |
| errormessage | 에러 메시지 | String |
| results      | Todo 목록   | Array  |

### Todo 삭제 입력 파라미터

| 파라미터명 | 의미    | 타입   |
| ---------- | ------- | ------ |
| id         | 고유 id | String |

### Todo 삭제 결과

| 파라미터명   | 의미        | 타입   |
| ------------ | ----------- | ------ |
| errorcode    | 에러 코드   | Number |
| errormessage | 에러 메시지 | String |
