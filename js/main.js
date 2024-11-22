function getCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const cookieParts = cookie.split("=");
    const name = cookieParts[0];
    const value = cookieParts.slice(1).join("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

function serialize(obj) {
  const str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

// 옛날 방식
function sendRequest(url, query, params, method) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${url}?${serialize(query)}`, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken") || "");
    xhr.onload = function () {
      const contentType = xhr.getResponseHeader("Content-Type");
      if (contentType.includes("application/json")) {
        resolve(JSON.parse(xhr.responseText));
      }
      resolve(xhr.responseText);
    };
    xhr.onerror = function () {
      reject(xhr.statusText);
    };
    xhr.send(method === "GET" ? null : JSON.stringify(params));
  });
}

sendRequest("https://hsg5533.github.io/ajax", {}, {}, "GET")
  .then((res) => console.log("xhr GET 통신 성공", res))
  .catch((err) => console.log("xhr GET 통신 실패", err));

// jquery 라이브러리 사용
async function ajaxRequest(url, query, params, method) {
  try {
    const response = await $.ajax({
      url: `${url}?${serialize(query)}`,
      type: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken") || "",
      },
      xhrFields: { withCredentials: true },
      data: method === "GET" ? null : JSON.stringify(params),
    });
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

ajaxRequest("https://hsg5533.github.io/ajax", {}, {}, "GET")
  .then((res) => console.log("jquery GET 통신 성공", res))
  .catch((err) => console.log("jquery GET 통신 실패", err));

// axios 라이브러리 사용
async function axiosRequest(url, query, params, method) {
  try {
    const response = await axios({
      url: `${url}?${serialize(query)}`,
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken") || "",
      },
      withCredentials: true,
      data: method === "GET" ? null : JSON.stringify(params),
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

axiosRequest("https://hsg5533.github.io/ajax", {}, {}, "GET")
  .then((res) => console.log("axios GET 통신 성공", res))
  .catch((err) => console.log("axios GET 통신 실패", err));

// 요즘 방식
async function request(url, query, params, method) {
  try {
    const response = await fetch(`${url}?${serialize(query)}`, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken") || "",
      },
      credentials: "include",
      body: method === "GET" ? null : JSON.stringify(params),
    });
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      return await response.json();
    }
    if (contentType.includes("text/html")) {
      return await response.text();
    }
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

request("https://hsg5533.github.io/ajax", {}, {}, "GET")
  .then((res) => console.log("fetch GET 통신 성공", res))
  .catch((err) => console.log("fetch GET 통신 실패", err));
