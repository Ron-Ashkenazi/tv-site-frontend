import { useEffect, useState } from "react";
import PopularMediaItem from "./PopularMediaItem";
import PulseLoader from "react-spinners/PulseLoader";
import "./PopularMedia.css";

const PopularMedia = (props) => {
  const { type } = props;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const getItems = () => {
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
        console.log(response);
        setResults(response.results);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="popular-media-container">
      {loading && <PulseLoader color="#526081" />}
      {!loading &&
        results.map((item) => {
          return <PopularMediaItem type={type} key={item.id} item={item} />;
        })}
    </div>
  );
};

export default PopularMedia;
