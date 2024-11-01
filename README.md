# Ajax, XHR, Fetch, Axios

## live demo : https://hsg5533.github.io/ajax/

## 1. Ajax (Asynchronous JavaScript and XML)
- **개념**: Ajax는 비동기적으로 서버와 데이터를 교환할 수 있는 기술로, 주로 웹 페이지의 일부를 동적으로 업데이트하는 데 사용됩니다. 이를 통해 사용자에게 더 나은 경험을 제공합니다.
- **주요 기능**:
  - 서버와의 비동기 통신을 통해 페이지 새로 고침 없이 데이터 업데이트
  - XML, JSON, HTML 등 다양한 형식의 데이터 전송 가능
- **장점**: 
  - 전체 페이지를 새로 고치지 않고 부분적인 업데이트 가능
  - 사용자 경험을 향상시키고 서버의 부하 감소
- **단점**: 
  - 코드 복잡성 증가
  - 특정 브라우저에서의 호환성 문제 발생 가능
  - 데이터 형식에 대한 명확한 정의 필요

## 2. XHR (XMLHttpRequest)
- **개념**: Ajax의 구현 중 하나로, JavaScript에서 서버에 비동기 요청을 보내기 위해 사용되는 객체입니다. XHR은 데이터 요청과 응답을 관리하는 데 필수적인 역할을 합니다.
- **사용법**:
  ```javascript
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.example.com/data', true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(JSON.parse(xhr.responseText));
      }
  };
  xhr.send();
  ```
- **장점**: 
  - 모든 주요 브라우저에서 지원
  - 요청 상태 및 응답 상태를 쉽게 관리할 수 있음
- **단점**: 
  - 코드가 복잡해질 수 있으며, API 사용이 어렵게 느껴질 수 있음
  - XMLHttpRequest에 대한 클로저, 콜백 지옥 등의 문제 발생 가능

## 3. Fetch API
- **개념**: 현대적인 브라우저에서 제공하는 API로, Promise 기반의 네트워크 요청을 지원합니다. Fetch API는 XHR보다 사용이 간편하고 가독성이 높은 코드 작성을 가능하게 합니다.
- **사용법**:
  ```javascript
  fetch('https://api.example.com/data')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  ```
- **장점**:
  - 간결하고 직관적인 문법
  - Promise를 사용하여 비동기 처리의 가독성을 높임
  - `Response` 객체를 통해 HTTP 응답 상태에 대한 정보를 제공
- **단점**:
  - IE11과 같은 구형 브라우저에서 지원되지 않음
  - 동일 출처 정책(Same-Origin Policy) 문제를 피하기 위한 CORS 설정 필요

## 4. Axios
- **개념**: Axios는 Promise 기반의 HTTP 클라이언트로, 브라우저와 Node.js에서 모두 사용할 수 있습니다. 다양한 HTTP 요청을 간편하게 처리할 수 있는 라이브러리입니다.
- **사용법**:
  ```javascript
  import axios from 'axios';

  axios.get('https://api.example.com/data')
      .then(response => {
          console.log(response.data);
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
  ```
- **장점**:
  - 자동으로 JSON 변환 지원
  - 요청 및 응답 인터셉터를 통해 요청 전/후 처리가 가능
  - 취소 토큰(Cancel Token)을 사용하여 요청 취소 가능
- **단점**:
  - 외부 라이브러리이므로 추가적인 의존성이 생김
  - 라이브러리 크기가 상대적으로 커서 초기 로딩 시간에 영향을 줄 수 있음

## 결론
- **XHR**: 오래된 기술이지만 여전히 안정적으로 사용할 수 있으며, 복잡한 요청 관리를 지원합니다.
- **Fetch API**: 현대적이고 간결한 코드 작성을 가능하게 하며, Promise 기반으로 가독성이 높습니다. 그러나 구형 브라우저에서 호환성 문제가 발생할 수 있습니다.
- **Axios**: 많은 기능을 제공하는 외부 라이브러리로, 추가적인 의존성은 있지만 개발에 있어 편리한 도구입니다.
