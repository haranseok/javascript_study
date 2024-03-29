const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data)); // 전송 요청
  });

  return promise;
};

const fetchPosts = async () => {
  const responseData = await sendHttpRequest(
    'GET',
    'https://jsonplaceholder.typicode.com/posts'
  );
  const listOfPosts = responseData;
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector('h2').textContent = post.title.toUpperCase();
    postEl.querySelector('p').textContent = post.body;
    listElement.append(postEl);
  }
};

const createPost = async (title, content) => {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
};

fetchPosts();
createPost('DUMMY', 'A dummy post!');

/** 370
 *  JSON.parse() - json 데이터 > js 데이터 변환
 *  JSON.stringify() - js 데이터 > json 데이터 변환
 *
 *  # 노드 복사
 *  docoument.importNode('복제를 원하는 노드', boolean)
 *  첫번째 인자 : 복제를 원하는 노드를 작성, template 태그로 감싸줘야 한다.
 *  두번째 인자 : boolean 값으로 true는 자식 노드 포함, false는 자식 노드 불포함
 */
