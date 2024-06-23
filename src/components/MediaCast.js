import { useEffect, useState, useRef, useCallback } from "react";
import MediaCastItem from "./MediaCastItem";
import "./MediaCast.css";
import PulseLoader from "react-spinners/PulseLoader";

const MediaCast = (props) => {
  const { mediaID, type } = props;
  const [results, setResults] = useState([]);
  const [loadedItems, setLoadedItems] = useState([]);
  const [batchIndex, setBatchIndex] = useState(0);
  const [loader, setLoader] = useState(true);
  const credits = type === "tv" ? "aggregate_credits" : "credits";
  const observer = useRef();

  const ITEMS_PER_BATCH = 20;

  const getItems = useCallback(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmI1YmY0MjI3ZjNiNzAyNzk4MTViYzdhZDFlYmNmZiIsInN1YiI6IjYzNjExMTFmNDBkMGZlMDA4MjY3ZmRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X61Z8uLOFFQgQ1uWu2PwnxL6WptfVwRgehwdvfCfEts",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/${type}/${mediaID}/${credits}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setResults(response.cast);
        setLoadedItems(response.cast.slice(0, ITEMS_PER_BATCH));
        setBatchIndex(1);
      })
      .catch((err) => console.error(err));
  }, [type, mediaID, credits]);

  const loadMoreItems = useCallback(() => {
    const nextBatchIndex = batchIndex;
    const start = nextBatchIndex * ITEMS_PER_BATCH;
    const end = start + ITEMS_PER_BATCH;
    setLoadedItems((prev) => [...prev, ...results.slice(start, end)]);
    setBatchIndex(nextBatchIndex + 1);
  }, [batchIndex, results]);

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loadedItems.length < results.length) {
          setLoader(true);
          setTimeout(() => {
            loadMoreItems();
            setLoader(false);
          }, 1800);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadedItems.length, results.length, loadMoreItems]
  );

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <div className="media-cast-wrapper">
      <div className="media-item-cast">
        {loadedItems.map((item, index) => {
          const uniqueKey = `${item.credit_id}-${index}`;

          if (index === loadedItems.length - 1) {
            return (
              <MediaCastItem
                ref={lastItemRef}
                type={type}
                key={uniqueKey}
                item={item}
              />
            );
          } else {
            return <MediaCastItem type={type} key={uniqueKey} item={item} />;
          }
        })}
        {loader && (
          <PulseLoader className="pulse-loader" color="rgb(82, 96, 129)" />
        )}
      </div>
    </div>
  );
};

export default MediaCast;
