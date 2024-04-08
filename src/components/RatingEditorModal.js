import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingEditorModal = (props) => {
  const { rating } = props;
  const [ratingg, setRating] = useState(rating.rating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <span
            key={star}
            className={`star ${ratingg >= star ? "filled" : ""}`}
            onClick={() => handleRatingChange(star)}
          >
            <FaStar />
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingEditorModal;
