import React, { forwardRef } from "react";
import "./MediaCastItem.css";

const MediaCastItem = forwardRef((props, ref) => {
  const { item, type } = props;

  return (
    <li className="MC-item-li" ref={ref}>
      <div className="MC-item-img-container">
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
        />
      </div>
      <div className="MC-item-name-and-character">
        <strong>{item.name}</strong>
        {type === "tv" && <label>{item.roles[0].character}</label>}
        {type === "movie" && <label>{item.character}</label>}
      </div>
    </li>
  );
});

export default MediaCastItem;
