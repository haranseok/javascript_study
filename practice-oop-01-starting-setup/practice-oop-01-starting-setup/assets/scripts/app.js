class DOMHelper {
  // 요소를 교체하는 헬퍼 함수
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true); // 깊은 복제
    element.replaceWith(clonedElement); // 요소를 자신의 것으로 교체 - 기존의 이벤트 리스너를 버리고 가비지 컬렉팅이 될 수 있는 것
    return clonedElement; // 복제 요소 반환
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: "smooth" }); // 해당 Element로 이동
  }
}

// 제네릭 컴포넌트
class Component {
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
    }
  }
  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }
  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  // 화살표 함수의 장점은 늘 클래스를 인용한다.

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    const tooltipTemplate = document.getElementById("tooltip");
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector("p").textContent = this.text;
    tooltipElement.append(tooltipBody);
    // 요소의 x, y 좌표
    const hostElPostLeft = this.hostElement.offsetLeft;
    const hostElPostTop = this.hostElement.offsetTop;

    const hostElHegiht = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPostLeft + 20;
    const y = hostElPostTop + hostElHegiht - parentElementScrolling - 10;

    tooltipElement.style.position = "absolute";
    tooltipElement.style.left = x + "px";
    tooltipElement.style.top = y + "px";
    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}

// 단일 아이템
class ProjectItem {
  hasActiveTooltip = false;

  // id를 저장해서 특성에서 매개변수를 얻는다.
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    // 생성자를 깔끔하게 유지하기 위해 내부에서 호출
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    // data- 속성은 dataset 특성에서 모두 병합된다.
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton();
  }
}

class ProjectList {
  projects = [];

  // type 종료된 프로젝트 리스트인지, 완료된 프로젝트 리스트인지 확인
  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    // A 인스턴스 배열 → B 인스턴스 배열 이동 - 활성 프로젝트 배열에서 종료 프로젝트 배열로 이동시키는 작업
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type); // A → B 인스턴스 배열에 변화가 있다는 것을 감지해야한다.
  }

  // 프로젝트 변경 - 프로젝트를 지우는 과정
  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex((p) => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    // 서로 다른 아이템을 분석하기 위한 논리
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
    const timerId = setTimeout(this.startAnalytics, 3000);

    document
      .getElementById("stop-analytics-btn")
      .addEventListener("click", () => {
        clearTimeout(timerId);
      });
  }

  static startAnalytics() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "assets/scripts/analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

// 위의 모든 스크립트가 최초로 분석하거나 실행되는 경우에 호출
App.init();
