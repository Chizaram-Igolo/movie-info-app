import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const MovieSearchApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5181/api/movies/search?title=${searchQuery}`,
        { withCredentials: false }
      );
      const { Search } = response.data;

      console.log(response.data);

      setSearchResults(Search || []);

      if (searchQuery !== "") {
        // Update search history
        setHistory((prevHistory) => {
          const newHistory = [...prevHistory, searchQuery].slice(-5); // Keep the latest 5 queries
          return newHistory;
        });
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleMovieSelect = async (imdbID) => {
    try {
      const response = await axios.get(`/api/movies/details?imdbId=${imdbID}`);
      const selectedMovieData = response.data;

      setSelectedMovie(selectedMovieData);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    // Fetch initial search results (you may want to fetch popular movies or trending ones)
    handleSearch();
  }, []);

  return (
    <div>
      <h1>Movie Search App</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => handleMovieSelect(movie.imdbID)}
            >
              {movie.Title} ({movie.Year})
            </li>
          ))}
        </ul>
      </div>
      {selectedMovie && (
        <div>
          <h2>Selected Movie</h2>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          <p>{selectedMovie.Plot}</p>
          <p>IMDB Score: {selectedMovie.imdbRating}</p>
          {/* Add other movie details as needed */}
        </div>
      )}
      <div>
        <h2>Search History</h2>
        {history.length ? (
          <ul>
            {history.map((query, index) => (
              <li key={index}>{query}</li>
            ))}
          </ul>
        ) : (
          <i>No saved searches yet</i>
        )}
      </div>
    </div>
  );
};

export default MovieSearchApp;
