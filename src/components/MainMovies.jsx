import { useState, useEffect } from "react";

const MainMovies = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  /* MI SONO FATTO AIUTARE DA CHATGPT PER QUESTO TIMEOUT, NON RIUSCIVO IN NESSUN MODO A FARLO FUNZIONARE */
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (!query) return;

    setLoadingMovies(true);

    fetch(`http://www.omdbapi.com/?apikey=3386b53b&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search.slice(0, 6));
        } else {
          setMovies([]);
        }
      })
      .catch((error) => console.error("Errore nel recupero dei dati:", error))
      .finally(() => setLoadingMovies(false));
  }, [query]);

  const getMovieDetails = (imdbID) => {
    setLoadingDetails(true);

    fetch(`http://www.omdbapi.com/?apikey=3386b53b&i=${imdbID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.Title) {
          setHoveredMovie(data);
          setShowCard(true);
        }
      })
      .catch((error) => console.error("Errore nel recupero dei dettagli:", error))
      .finally(() => setLoadingDetails(false));
  };

  const handleMouseEnter = (movie) => {
    const id = setTimeout(() => {
      getMovieDetails(movie.imdbID);
    }, 1500);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setShowCard(false);
    setHoveredMovie(null);
  };

  return (
    <div>
      <h4 className="text-white">{query}</h4>

      {loadingMovies ? (
        <div className="loader"></div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div
                key={index}
                className="col mb-2 text-center px-1"
                onMouseEnter={() => handleMouseEnter(movie)}
                onMouseLeave={handleMouseLeave}
              >
                <img className="equal-height" src={movie.Poster} alt={movie.Title} />
              </div>
            ))
          ) : (
            <p>Nessun risultato trovato</p>
          )}
        </div>
      )}

      {showCard && hoveredMovie && (
        <div className="movie-card">
          <div className="movie-card-content">
            {loadingDetails ? (
              <div className="loader"></div>
            ) : (
              <>
                <img src={hoveredMovie.Poster} alt={hoveredMovie.Title} />
                <div className="movie-info">
                  <h4>{hoveredMovie.Title}</h4>
                  <p>
                    <strong>Year:</strong> {hoveredMovie.Year}
                  </p>
                  <p>
                    <strong>Genre:</strong> {hoveredMovie.Genre}
                  </p>
                  <p>
                    <strong>Director:</strong> {hoveredMovie.Director}
                  </p>
                  <p>
                    <strong>Plot:</strong> {hoveredMovie.Plot}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMovies;
