const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = () => {
  const movieList = document.getElementById('movie-list');
  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }

  movieList.innerHTML = '';

  movies.forEach(movie => {
    const movieEl = document.createElement('li');
    let text = movie.info.title + ' - ';
    for (const key in movie.info) {
      if (key !== 'title') {
        text = text + `${key}: ${movie.info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovueHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
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

addMovieBtn.addEventListener('click', addMovueHandler);
