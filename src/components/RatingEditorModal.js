import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./RatingEditorModal.css";

const RatingEditorModal = (props) => {
  const { handleRateButton, receivedRating, handleRemoveRateButton } = props;
  const [rating, setRating] = useState(receivedRating.rating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    setRating(receivedRating.rating);
  }, [receivedRating]);

  return (
    <div>
      <div className="rating-stars-modal">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <span
            key={star}
            className={`star-modal ${rating >= star ? "filled" : ""}`}
            onClick={() => handleRatingChange(star)}
          >
            <FaStar />
          </span>
        ))}
      </div>
      <div className="rating-editor-modal-buttons-div">
        <button
          onClick={() => handleRateButton(rating)}
          className="rating-editor-modal-rate-button"
        >
          Rate
        </button>
        <button
          onClick={handleRemoveRateButton}
          className="rating-editor-modal-remove-rate-button"
        >
          Remove rating
        </button>
      </div>
    </div>
  );
};

export default RatingEditorModal;
