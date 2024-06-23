import { useEffect, useState, useCallback } from "react";
import RecommenItem from "./RecommenItem";
import "./Recommen.css";

const Recommen = (props) => {
  const { type, mediaID } = props;
  const [results, setResults] = useState([]);

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
      `https://api.themoviedb.org/3/${type}/${mediaID}/recommendations`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setResults(response.results);
      })
      .catch((err) => console.error(err));
  }, [type, mediaID]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <div className="recommen-wrapper">
      <div className="recommen-div">
        {results.map((item) => {
          return <RecommenItem type={type} item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Recommen;
