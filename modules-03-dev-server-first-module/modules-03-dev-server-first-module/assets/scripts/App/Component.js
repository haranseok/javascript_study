// 기명 내보내기

export function doSomething() {
  console.log('?');
}

// default를 추가하여 이 파일을 기본 내보내기로 설정할 수 있다. 또한 Component 라는 클래스 이름도 지울 수 있다.
// 클래스 이름을 지우게 되면 파일을 가리키면 자동으로 default 로 지정한 class를 내보낸다.
export default class {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}
