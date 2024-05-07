import { useEffect, useState, useCallback, useRef } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GrAdd, GrClose } from "react-icons/gr";
import "./RatingAndWatchlist.css";
import { createNewItem, createFormatedDate } from "../util/MoreFunctions";
import { addItemToDB, removeItemFromDB, updateItemRating } from "../util/auth";
import ModalRating from "./ModalRating";

const RatingAndWatchlist = (props) => {
  const { array, watchlist, item, auth, mediaType } = props;
  const [rateAndWatchlist, setRateAndWatchlist] = useState({
    rate: { exists: false, rating: null },
    watchlist: false,
  });
  const modal = useRef();

  const openModal = () => {
    modal.current.open();
  };

  const itemIsRated = useCallback(
    (itemToCheck) => {
      if (array !== undefined) {
        const foundItem = array.find((obj) => obj.id === itemToCheck.id);
        if (foundItem) {
          return { exists: true, rating: foundItem.my_rating };
        } else {
          return { exists: false, rating: null };
        }
      } else {
        return { exists: false, rating: null };
      }
    },
    [array]
  );

  const itemInWatchlist = useCallback(
    (itemToCheck) => {
      if (watchlist !== undefined) {
        return watchlist.some((obj) => obj.id === itemToCheck.id);
      } else {
        return false;
      }
    },
    [watchlist]
  );

  const handleWatchlistButton = () => {
    const formattedDate = createFormatedDate(item);
    const type = mediaType === "tv" ? "TV Series" : "Movie";
    const title = item.name || item.title;

    if (rateAndWatchlist.watchlist) {
      removeItemFromDB("watchlist", item.id).then(() => {
        setRateAndWatchlist((prevState) => ({
          ...prevState,
          watchlist: !prevState.watchlist,
        }));
      });
    } else {
      const newItem = createNewItem(
        "watchlist",
        null,
        item,
        formattedDate,
        type,
        title
      );
      addItemToDB(auth, newItem).then(() => {
        setRateAndWatchlist((prevState) => ({
          ...prevState,
          watchlist: !prevState.watchlist,
        }));
      });
    }
  };

  const handleRateButton = (rating) => {
    const formattedDate = createFormatedDate(item);
    const type = mediaType === "tv" ? "TV Series" : "Movie";
    const title = item.name || item.title;

    if (rateAndWatchlist.rate.exists) {
      updateItemRating(type, item.id, rating).then(() => {
        setRateAndWatchlist((prevState) => ({
          ...prevState,
          rate: { exists: true, rating },
        }));
      });
    } else {
      const newItem = createNewItem(
        "rate",
        rating,
        item,
        formattedDate,
        type,
        title
      );
      addItemToDB(auth, newItem).then(() => {
        setRateAndWatchlist((prevState) => ({
          ...prevState,
          rate: { exists: true, rating },
        }));
      });
    }
  };

  const handleRemoveRateButton = () => {
    const type = mediaType === "tv" ? "tvShows" : "movies";
    removeItemFromDB(type, item.id);
  };

  useEffect(() => {
    if (item) {
      const isRate = itemIsRated(item);
      const inWatchlist = itemInWatchlist(item);

      setRateAndWatchlist({
        rate: isRate,
        watchlist: inWatchlist,
      });
    }
  }, [item, itemIsRated, itemInWatchlist]);

  return (
    <div className="root-RAW">
      <ModalRating
        ref={modal}
        handleRateButton={handleRateButton}
        handleRemoveRateButton={handleRemoveRateButton}
        receivedRating={rateAndWatchlist.rate}
      />

      <span
        onClick={openModal}
        className={`rate-span-RAW ${
          rateAndWatchlist.rate.exists ? "is-rated" : ""
        }`}
      >
        {rateAndWatchlist.rate.exists
          ? `${rateAndWatchlist.rate.rating}`
          : "Rate"}
        <span className="rate-span-RAW-image">
          {rateAndWatchlist.rate.exists ? <FaStar /> : <FaRegStar />}
        </span>
      </span>

      <span
        onClick={() => handleWatchlistButton()}
        className={`watchlist-span-RAW ${
          rateAndWatchlist.watchlist ? "in-watchlist" : ""
        }`}
      >
        {rateAndWatchlist.watchlist
          ? "Remove from watchlist"
          : "Add to watchlist"}
        <span className="watchlist-span-RAW-image">
          {rateAndWatchlist.watchlist ? <GrClose /> : <GrAdd />}
        </span>
      </span>
    </div>
  );
};

export default RatingAndWatchlist;
