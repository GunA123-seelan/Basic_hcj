const API_KEY = "http://www.omdbapi.com/?i=tt3896198&apikey=935c5588"; // Replace with your OMDb API key
const movieList = document.getElementById("movie-list");

async function searchMovies() {
    console.log('sss')
    const query = document.getElementById("search-input").value.trim();
    console.log('sss',query)

    if (query === "") {
        alert("Please enter a movie title.");
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=935c5588`);
        const data = await response.json();
        console.log("d",data);
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieList.innerHTML = `<p>No results found for "${query}".</p>`;
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        movieList.innerHTML = `<p>Failed to load movie data. Please try again later.</p>`;
    }
}

function displayMovies(movies) {
    movieList.innerHTML = ""; // Clear any previous search results

    movies.forEach(async movie => {
        console.log("movieDet",movie);
        const movieDetails = await fetchMovieDetails(movie);
        if (movieDetails) {
            const movieItem = document.createElement("div");
            movieItem.classList.add("movie-item");

            movieItem.innerHTML = `
                <img src="${movieDetails.Poster !== "N/A" ? movieDetails.Poster : 'https://via.placeholder.com/100x150'}" alt="${movieDetails.Title}">
                <div class="movie-details">
                    <h2 class="movie-title">${movieDetails.Title}</h2>
                    <p class="movie-year">Year: ${movieDetails.Year}</p>
                    <p class="movie-plot">${movieDetails.Plot}</p>
                </div>
            `;

            movieList.appendChild(movieItem);
        }
    });
}

async function fetchMovieDetails(movie) {
    try {
        console.log("imdb",movie.imdbID);
        const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=935c5588`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}
