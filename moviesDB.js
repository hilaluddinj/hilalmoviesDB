// =========== Fetch Refactor (Async Await) ============
const searchMovies = document.querySelector(".search-button");
searchMovies.addEventListener("click", async function (e) {
  try {
    e.preventDefault();
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

function getMovies(keyword) {
  return fetch("https://www.omdbapi.com/?apikey=c769a58b&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error((response.statusText = "API Key Not Found!"));
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

// ketika movie details di klik menggunakan event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateMovieDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("https://www.omdbapi.com/?apikey=c769a58b&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateMovieDetail(m) {
  const moveiDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = moveiDetail;
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
                  <div class="card">
                    <img src="${m.Poster}" class="card-img-top" />
                    <div class="card-body">
                      <h5 class="card-title">${m.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                      <a href="#" class="btn btn-primary modal-button" data-bs-toggle="modal"
                      data-bs-target="#movieDetailsModal" data-imdbid= ${m.imdbID}>Show Details</a>
                    </div>
                  </div>
                </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
             <div class="row">
                <div class="col-md-3">
                <img src="${m.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                    <li class="list-group-item"><strong>Rating: </strong>${m.imdbRating}</li>
                    <li class="list-group-item"><strong>Language: </strong>${m.Language}</li>
                    <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
                    <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                    <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                    <li class="list-group-item"><strong>Sinopsis: </strong>${m.Plot}</li>
                  </ul>
                </div>
            </div>
          </div>`;
}
