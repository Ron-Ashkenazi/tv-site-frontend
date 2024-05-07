import React from "react";
import "./SingleItem.css";
import { Link } from "react-router-dom";
import { createFormatedDate } from "../util/MoreFunctions";
import RatingAndWatchlist from "./RatingAndWatchlist";

const SingleItem = (props) => {
  const { auth, item } = props;
  const { tvShows, movies, watchlist } = auth;
  const title = item.media_type === "tv" ? item.name : item.title;
  const type = item.media_type === "tv" ? "TV Series" : "Movie";

  function shortenTitle(str, maxLength) {
    if (str?.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    } else {
      return str;
    }
  }

  const shortTitle = shortenTitle(title, 45);

  const formattedDate = createFormatedDate(item);

  return (
    <li className="item-li">
      <div className="img-container">
        <Link to={`/${item.media_type}/${item.id}`}>
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          />
        </Link>
      </div>
      <div className="item-li-con">
        <div className="item-li-titles">
          <h1 className="item-title">{shortTitle}</h1>
          <h1 className="item-type">({type})</h1>
        </div>
        <div className="item-li-overview">
          <h2 className="overview-h2">Overview:</h2>
          <p>{item.overview}</p>
          <h3>Release date: {formattedDate}</h3>
        </div>
        {auth.userName && (
          <RatingAndWatchlist
            array={type === "TV Series" ? tvShows : movies}
            watchlist={watchlist}
            item={item}
            auth={auth}
            mediaType={item.media_type}
          />
        )}
      </div>
    </li>
  );
};

export default SingleItem;
