import React, { useState } from "react";
import "./HomePage.css";
import tvLogo from "../images/rmdb-logo-transparent.png";
import Content from "../components/Content";
import PopularMedia from "../components/PopularMedia";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState();

  const submitSearch = (search, event) => {
    event.preventDefault();
    getResults(search);
  };

  const getResults = (search) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmI1YmY0MjI3ZjNiNzAyNzk4MTViYzdhZDFlYmNmZiIsInN1YiI6IjYzNjExMTFmNDBkMGZlMDA4MjY3ZmRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X61Z8uLOFFQgQ1uWu2PwnxL6WptfVwRgehwdvfCfEts",
      },
    };
    const newSearch = reformatSearch(search);
    const fetchString = `https://api.themoviedb.org/3/search/multi?query=${newSearch}`;

    fetch(fetchString, options)
      .then((response) => response.json())
      .then((response) => {
        setResults(response.results);
      })
      .catch((err) => console.error(err));
  };

  const reformatSearch = (search) => {
    const newSearch = search.trim().replace(/ /g, "%20");
    return newSearch;
  };

  return (
    <div className="root-home-page">
      <div className="container upper">
        <img className="tv-logo" src={tvLogo} alt="tv"></img>
        <h1 className="welcome-title">Welcome to RMDB</h1>
        <h2 className="welcome-title">Your favorite movies database</h2>
      </div>
      <PopularMedia type="movie" />
      <PopularMedia type="tv" />
      <div className="container">
        <h2>Search your favorite tv shows and movies:</h2>
        <form onSubmit={(event) => submitSearch(searchInput, event)}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          ></input>
          <div>
            <button type="submit">Search</button>{" "}
          </div>
        </form>
      </div>
      {results && results.length === 0 && (
        <h2 style={{ textAlign: "center" }}>
          Couldn't find what you were looking for...
        </h2>
      )}
      {results && <Content results={results} />}
    </div>
  );
};

export default HomePage;
