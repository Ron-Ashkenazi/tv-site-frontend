import { useState, useEffect } from "react";

const MediaItemInfo = (props) => {
  const { mediaType, mediaItem } = props;
  const [genres, setGenres] = useState();

  const getGenres = (arr) => {
    let genres = "";
    for (let i = 0; i < arr.length; i++) {
      if (i > 0) {
        genres = genres + ", " + arr[i].name;
      } else {
        genres = genres + arr[i].name;
      }
    }
    return genres;
  };

  useEffect(() => {
    const tempgen = getGenres(mediaItem.genres);
    setGenres(tempgen);
  }, [mediaItem]);

  return (
    <div>
      <h1>{mediaType === "tv" ? mediaItem.name : mediaItem.title}</h1>
      <h3>{genres}</h3>
      <p>{mediaItem.overview}</p>
      {mediaType === "tv" && (
        <h4>
          Seasons: {mediaItem.number_of_seasons} | Episodes:{" "}
          {mediaItem.number_of_episodes}
        </h4>
      )}

      <h4>Status: {mediaItem.status}</h4>
    </div>
  );
};

export default MediaItemInfo;
