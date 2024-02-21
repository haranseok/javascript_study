const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");
  if (movies.length === 0) {
    movieList.classList.remove("visible");
  } else {
    movieList.classList.add("visible");
  }

  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    const { info } = movie; // 우측에 존재하는 key 이름을 좌측에 입력, 객체에서 프로퍼티를 빼낼때에는 순서는 중요하지 않고, key 이름이 중요하다. - 객체 구조 분해
    const { title: movieTitle } = info; // 객체 구조 분해는 key 이름이 중요하지만, 다른 곳에서 사용하고 있는 경우 충돌을 막기 위해 다른 이름으로 지정할 수 있다. 기존 key: 새로운 key
    let text = movieTitle + " - ";

    // let text = getFormattedTitle.call(movie) + " - "; // 두번째 또는 그 이상의 인자는 원하는 대로 추가할 수 있다.
    // let text = getFormattedTitle.apply(movie) + ' - '; // apply는 call과 매우 유사하게 함수를 바로 실행해준다. 다만 첫 번째 인자는 this이지만 그 이상의 인사를 무한으로 추가할 수 없고 하나의 인자만 추가할 수 있다. 이 인자는 배열의 형태여야 한다.
    // 차이점은 call은 쉼표로 인자를 추가할 수 있고, apply는 배열로 추가 인자를 전달하다는 것이다.
    for (const key in info) {
      if (key !== "title" && key !== "_title") {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovueHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    // title.trim() === '' ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      // title, // key 이름과 value의 이름이 동일한 경우 title: title 이렇게 쓰지 않고 한 번만 쓸 수 있다.
      set title(val) {
        if (val.trim() === "" || key !== "_title") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val; // newMovie를 참조하는 this로 프로퍼티를 타켓팅할 수 있음.
      }, // setter set 키워드, 프로퍼티 이름, 괄호 및 중괄호, title이 아닌 _title로 내부 값을 표시
      // setter를 생략하면 읽기 전용 속성이 생긴다.
      get title() {
        return this._title.toUpperCase();
      }, // getter 사람들이 title에 엑세스할 때 무엇을 할 지 정의할 수 있다. get 부분을 생량할 수 도 있는 데, 그렇게 되면 읽을 수 없는 프로퍼티가 생긴다.

      // getter 와 setter는 추가적인 유효성 검사를 할 경우에 유용하고 폴백이나 값을 얻을 때의 추가 변환에 유용하게 사용된다.
      [extraName]: extraValue, // 동적으로 키 이름을 가지고 오는 경우 사용할 수 있다.
    },
    id: Math.random(),
    getFormattedTitle() {
      console.log(this);
      return this.info.title.toUpperCase();
    },
  };

  newMovie.info.title = title;
  console.log(newMovie.info.title);

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHadler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovueHandler);
searchBtn.addEventListener("click", searchMovieHadler);
