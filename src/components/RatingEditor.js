import React, { useState, forwardRef, useImperativeHandle } from "react";
import { FaStar } from "react-icons/fa";
import "./RatingEditor.css";

const RatingEditor = forwardRef((props, ref) => {
  const [rating, setRating] = useState(props.initialRating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSave = () => {
    props.onRatingUpdate(rating);
    handleClose();
  };

  const handleClose = () => {
    setRating(props.initialRating);
    props.onClose();
  };

  useImperativeHandle(ref, () => ({
    open: () => {},
    close: handleClose,
  }));

  return (
    <div className={`rating-editor ${props.isOpen ? "open" : ""}`}>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? "filled" : ""}`}
            onClick={() => handleRatingChange(star)}
          >
            <FaStar />
          </span>
        ))}
      </div>
      <div className="rating-actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
});

export default RatingEditor;
