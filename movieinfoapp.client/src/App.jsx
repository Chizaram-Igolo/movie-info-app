import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const MovieSearchApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchHistoryClicked, setSearchHistoryClicked] = useState(false);

  const handleSearch = async () => {
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `/api/movies/search?title=${searchQuery}`
        );
        const { search } = response.data;

        setSearchResults(search || []);

        if (searchQuery !== "") {
          // Update search history
          setHistory((prevHistory) => {
            const newHistory = [...prevHistory, searchQuery].slice(-5);
            return newHistory;
          });
        }
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    }
  };

  const handleMovieSelect = async (imdbId) => {
    try {
      const response = await axios.get(`/api/movies/details?imdbId=${imdbId}`);
      const selectedMovieData = response.data;

      setSelectedMovie(selectedMovieData);
      setSearchHistoryClicked(false); // Reset search history click status
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleGoBack = () => {
    setSelectedMovie(null);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchHistoryItemClick = async (query) => {
    setSearchQuery(query);
    setSearchHistoryClicked(true);
    // You may want to fetch search results here
    try {
      const response = await axios.get(`/api/movies/search?title=${query}`);
      const { search } = response.data;
      setSearchResults(search || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  useEffect(() => {
    // Fetch initial search results (you may want to fetch popular movies or trending ones)
    handleSearch();
  }, [searchHistoryClicked]);

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
      {selectedMovie ? (
        <div className="selected-movie-div">
          <h2>Selected Movie</h2>
          <br />
          <div className="selected-movie-content">
            <img src={selectedMovie.poster} alt={selectedMovie.title} />
            <div className="selected-movie-details">
              <p>
                <strong>{selectedMovie.title}</strong>
              </p>
              <p>
                <strong>Released: {selectedMovie.year}</strong>
              </p>
              <p>{selectedMovie.plot}</p>
              <p>
                <strong>IMDB Score: {selectedMovie.imdbRating}</strong>
              </p>
              <br />

              <p>
                <button onClick={handleGoBack}>Go back</button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>{searchHistoryClicked ? "Search Results" : "Search Results"}</h2>
          <br />
          <ul style={{ textAlign: "left" }}>
            {searchResults.map((movie, idx) => (
              <li
                key={movie.title + idx}
                className="movie-list-item"
                onClick={() => handleMovieSelect(movie.imdbId)}
              >
                {movie.title} - ({movie.year})
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>Search History</h2>
        {history.length ? (
          <ul style={{ textAlign: "left", cursor: "default" }}>
            {history.map((query, index) => (
              <li
                key={index}
                className="search-history-list-item"
                onClick={() => handleSearchHistoryItemClick(query)}
              >
                {query}
              </li>
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
