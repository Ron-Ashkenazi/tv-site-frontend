import React, { useState, useRef } from "react";
import "./ProfileItem.css";
import { FaStar } from "react-icons/fa";
import Modal from "./Modal";
import RatingEditor from "./RatingEditor";
import { updateItemRating } from "../util/auth";
import { Link } from "react-router-dom";

const ProfileItem = (props) => {
  const { item } = props;
  const modal = useRef();
  const ratingEditorModal = useRef();
  const [isRatingEditing, setIsRatingEditing] = useState(false);

  const openInfo = () => {
    modal.current.open();
  };

  const handleRatingUpdate = (newRating) => {
    item.my_rating = newRating;
    updateItemRating(item.media_type, item.id, newRating);
    setIsRatingEditing(false);
  };

  const type = item.media_type === "TV Series" ? "tv" : "movie";

  return (
    <li className="li-profile-item">
      <Modal ref={modal}>
        <h2>{item.name}</h2>
        <h3>{item.first_air_date}</h3>
        <p>{item.overview}</p>
      </Modal>
      <Link to={`/${type}/${item.id}`}>
        <img
          className="item-image"
          alt="poster"
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        />
      </Link>
      <div className="my-rating-div">
        {item.my_rating && (
          <>
            <FaStar
              className="star-img"
              alt="rating"
              onClick={() => setIsRatingEditing(true)}
            />
            <span className="rating-span">{item.my_rating}</span>
          </>
        )}

        <button
          onClick={() => {
            props.removeHandler(item.id);
          }}
          className="remove-item-button"
        >
          Remove
        </button>
        <button onClick={openInfo} className="info-item-button">
          i
        </button>
      </div>
      <RatingEditor
        item={item}
        ref={ratingEditorModal}
        isOpen={isRatingEditing}
        initialRating={item.my_rating || 0}
        onRatingUpdate={handleRatingUpdate}
        onClose={() => setIsRatingEditing(false)}
      />
    </li>
  );
};

export default ProfileItem;
