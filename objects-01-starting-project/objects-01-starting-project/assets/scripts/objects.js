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
    for (const key in info) {
      if (key !== "title") {
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
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      title, // key 이름과 value의 이름이 동일한 경우 title: title 이렇게 쓰지 않고 한 번만 쓸 수 있다.
      [extraName]: extraValue, // 동적으로 키 이름을 가지고 오는 경우 사용할 수 있다.
    },
    id: Math.random(),
  };

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHadler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovueHandler);
searchBtn.addEventListener("click", searchMovieHadler);
