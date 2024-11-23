const url = "https://api.jikan.moe/v4/seasons/upcoming";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
let moveiList = [];

getMovies(url);

async function getMovies(url) {
  const res = await fetch(url);
  const result = await res.json();
  console.log(result.data);
  showMovies(result.data);
  moveiList = result.data;
}

function searchMovies(searchTerm) {
  if (searchTerm && searchTerm !== "") {
    let findMovie = moveiList.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    showMovies(findMovie);

    search.value = "";
  } else {
    window.location.reload();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  searchMovies(searchTerm);
});

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, images, popularity, synopsis } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    
    <img
    src="${images.jpg.image_url}" alt="${title}"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getClassByRate(popularity)}">${popularity}</span>
  </div>
  <div class="overview">
    <h3> ${title}  <small> Overview </small> </h3>
    <p>
     ${synopsis}
    </p>
  </div>

    `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 2000) {
    return "green";
  } else if (vote >= 1600) {
    return "orange";
  } else {
    return "red";
  }
}
