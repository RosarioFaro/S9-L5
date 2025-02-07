import { useState, useEffect } from "react";

const MainMovies = ({ query }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`http://www.omdbapi.com/?apikey=3386b53b&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search.slice(0, 6));
        } else {
          setMovies([]);
        }
      })
      .catch((error) => console.error("Errore nel recupero dei dati:", error));
  }, [query]);

  return (
    <div>
      <h4 className="text-white">{query}</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="col mb-2 text-center px-1">
              <img className="equal-height" src={movie.Poster} alt={movie.Title} />
            </div>
          ))
        ) : (
          <p>Nessun risultato trovato</p>
        )}
      </div>
    </div>
  );
};

export default MainMovies;
