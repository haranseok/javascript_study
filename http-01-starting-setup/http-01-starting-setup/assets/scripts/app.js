const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

const sendHttpRequest = (method, url, data) => {
  // const promise = new Promise((resolve, reject) => {
  //    const xhr = new XMLHttpRequest();
  //xhr.open(method, url);
  //xhr.responseType = 'json';
  //xhr.onload = function () {
  // 성공인 경우보다 작을 경우
  //if (xhr.status >= 200 && xhr.status < 300) {
  // resolve(xhr.response);
  // } else {
  //  reject(new Error('Something went wrong!'));
  // }
  //};
  // 오류 처리
  // xhr.onerror = () => {
  //     reject(new Error('Failed to send requset!'));
  //   };
  //    xhr.send(JSON.stringify(data)); // 전송 요청

  // });

  // return promise;

  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((responese) => {
      if (responese.status >= 200 && responese.status < 300) {
        return responese.json(); // 데이터 파싱
      } else {
        // 외부 promise 체인에는 아무런 문제가 없어서 아래 catch가 진행되고, 안에 있는 promise 체인이 작동
        // 내부 promise 체인에 return을 걸어주면 외부 promise 체인과 병합 또는 연결된 상태가 된다.
        return responese.json().then((errData) => {
          console.log(errData);
          throw new Error("Something went wrong!");
        });
      }
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Something went wrong!");
    }); // url만 입력하면 get 요청 전송

  /** XMLHttpRequest를 이용한 접근 방법과는 다르게 fetch 함수는 xhr.response 처럼 파싱된 응답이 아닌 스트리밍된 응답을 반환한다.
   *
   */
};

const fetchPosts = async () => {
  try {
    const responseData = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );
    const listOfPosts = responseData;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (err) {
    alert(err.message);
  }
};

const createPost = async (title, content) => {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
};

fetchButton.addEventListener("click", fetchPosts);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredContent);
});

/** 370
 *  JSON.parse() - json 데이터 > js 데이터 변환
 *  JSON.stringify() - js 데이터 > json 데이터 변환
 *
 *  # 노드 복사
 *  docoument.importNode('복제를 원하는 노드', boolean)
 *  첫번째 인자 : 복제를 원하는 노드를 작성, template 태그로 감싸줘야 한다.
 *  두번째 인자 : boolean 값으로 true는 자식 노드 포함, false는 자식 노드 불포함
 */

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id; // 가장 가까운 list item의 id
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});

/** 377 오류 처리
 * xhr.onerror
 * ( 일부러 get 부분에 url을 잘 못 친 경우  )
 * error 핸들러는 실질적으로 제대로 작동한 HttpRequest를 제외하고 서버 쪽 오류만 있는 경우에는 트리거되지 않고, 200이 아닌 상태 코드만 호출된다. 이 error 함수는 네트워크 오류, 즉 요청을 전송하지 못 했거나 요청 시간을 초과한 경우에 정상 작동한다. 그래서 서버에서 에러가 발생한 경우를 대비해 onload 부분에 성공 상태 코드로 조건문을 만들어서 해결할 수 있다.
 */

/** 378 - fetch API
 *  fetch는 기본적으로 프로미스 기반 함수이다. 그래서 별도의 프로미스를 지정할 필요없이 자체적으로 프로미스를 사용하는 API이다.
 */

/** 382 - XMLHttpRequest vs fetch()
 *  fetch API의 장점은 사용하기 쉽고 프로미스를 적극적으로 사용한다는 점이고 단범은 오류 처리 작업이 번거롭다는 점이 있다.
 *
 */
