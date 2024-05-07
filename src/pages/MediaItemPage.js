import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import RatingAndWatchlist from "../components/RatingAndWatchlist";
import MediaItemInfo from "../components/MediaItemInfo";
import "./MediaPage.css";

const MediaItemPage = () => {
  const { mediaID, mediaType } = useParams();

  const { auth } = useContext(AuthContext);
  const { tvShows, watchlist, movies } = auth;

  const [mediaItem, setMediaItem] = useState();
  const [backgroundImg, setBackgroundImg] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmI1YmY0MjI3ZjNiNzAyNzk4MTViYzdhZDFlYmNmZiIsInN1YiI6IjYzNjExMTFmNDBkMGZlMDA4MjY3ZmRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X61Z8uLOFFQgQ1uWu2PwnxL6WptfVwRgehwdvfCfEts",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${mediaID}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMediaItem(response);
        setBackgroundImg(
          `https://image.tmdb.org/t/p/original${response?.backdrop_path}`
        );
      })
      .catch((err) => console.error(err));
  }, [auth, mediaID, mediaType]);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgb(130,130,130), rgb(130,130,130), rgb(130,130,130)),url(${backgroundImg})`,
  }; // linear-gradient(to bottom, rgb(130,130,130), rgb(130,130,130), rgb(130,130,130)),

  return (
    <div>
      {!mediaItem && <div>Loading...</div>}
      {mediaItem && (
        <>
          {" "}
          <div className="big-poster-div" style={backgroundStyle}>
            <img
              className="poster"
              alt="poster"
              src={`https://image.tmdb.org/t/p/w500${mediaItem?.poster_path}`}
            />
          </div>
          <div className="info-div">
            {auth.userName && (
              <RatingAndWatchlist
                array={mediaType === "tv" ? tvShows : movies}
                watchlist={watchlist}
                item={mediaItem}
                auth={auth}
                mediaType={mediaType}
              />
            )}
            <MediaItemInfo mediaType={mediaType} mediaItem={mediaItem} />
          </div>
        </>
      )}
    </div>
  );
};

export default MediaItemPage;
