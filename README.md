
# Ajax, XHR, Fetch, Axios

## 1. Ajax (Asynchronous JavaScript and XML)
- **개념**: Ajax는 비동기적으로 서버와 데이터를 교환할 수 있는 기술입니다. 주로 웹 페이지의 일부를 동적으로 업데이트하는 데 사용됩니다.
- **장점**: 페이지 전체를 새로 고치지 않고도 서버와 통신할 수 있어 사용자 경험을 향상시킵니다.
- **단점**: XML 뿐만 아니라 JSON 등 다양한 포맷을 사용할 수 있지만, 주로 XML을 사용하는 경향이 있었습니다. 복잡한 오류 처리와 상태 관리를 직접 구현해야 합니다.

## 2. XHR (XMLHttpRequest)
- **개념**: Ajax의 구현 중 하나로, JavaScript에서 서버에 비동기 요청을 보내기 위해 사용되는 객체입니다.
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
- **장점**: 오래된 기술로 모든 주요 브라우저에서 지원되며, 비동기 요청에 대한 세부적인 제어가 가능합니다.
- **단점**: 코드가 복잡하고 가독성이 떨어질 수 있습니다.

## 3. Fetch API
- **개념**: 현대적인 브라우저에서 제공하는 API로, Promise 기반의 네트워크 요청을 지원합니다.
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
- **장점**: 간결한 문법과 Promise를 활용한 비동기 처리로 가독성이 좋습니다. JSON 데이터를 기본적으로 지원합니다.
- **단점**: IE11과 같은 구형 브라우저에서는 지원되지 않습니다.

## 4. Axios
- **개념**: Axios는 Promise 기반의 HTTP 클라이언트로, 브라우저와 Node.js에서 모두 사용할 수 있습니다.
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
- **장점**: 자동으로 JSON 변환, 요청 및 응답 인터셉터, 취소 토큰 등 다양한 기능을 제공하여 더 많은 제어를 가능하게 합니다. 또한, Axios는 구형 브라우저에서도 호환됩니다.
- **단점**: Axios는 외부 라이브러리이므로, 추가적인 의존성이 생깁니다.

## 결론
- **XHR**: 오래된 기술이지만 안정적으로 사용할 수 있습니다.
- **Fetch API**: 현대적이고 간결한 코드 작성이 가능하나, 구형 브라우저에서는 호환성 문제가 있습니다.
- **Axios**: 많은 기능을 제공하는 외부 라이브러리로, 프로젝트에 필요한 경우 유용하게 사용할 수 있습니다.
