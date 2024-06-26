import { useEffect, useState, useCallback } from "react";
import PopularMediaItem from "./PopularMediaItem";
import "./PopularMedia.css";

const PopularMedia = (props) => {
  const { type } = props;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const getItems = useCallback(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmI1YmY0MjI3ZjNiNzAyNzk4MTViYzdhZDFlYmNmZiIsInN1YiI6IjYzNjExMTFmNDBkMGZlMDA4MjY3ZmRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X61Z8uLOFFQgQ1uWu2PwnxL6WptfVwRgehwdvfCfEts",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setResults(response.results);
        setTimeout(() => {
          setLoading(false);
        }, 1800);
      })
      .catch((err) => console.error(err));
  }, [type]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <div className="popular-media-wrapper">
      <div>
        <h2>Popular {type === "movie" ? "movies" : "shows"}:</h2>
      </div>
      <div className="popular-media-container">
        {results.map((item) => {
          return (
            <PopularMediaItem
              loading={loading}
              type={type}
              key={item.id}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularMedia;
