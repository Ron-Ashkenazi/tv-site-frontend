import { Link } from "react-router-dom";
import "./PopularMediaItem.css";

const PopularMediaItem = (props) => {
  const { item, type, loading } = props;

  return (
    <li className="PM-item-li">
      <div
        className={`${
          loading ? "PM-item-img-container skeleton" : "PM-item-img-container"
        }`}
      >
        {!loading && (
          <Link to={`/${type}/${item.id}`}>
            <img
              alt="poster"
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            />
          </Link>
        )}
      </div>

      <h3 className={`${loading ? "skeleton skeleton-title" : "PMI-title"}`}>
        {!loading && (item.name || item.title)}
      </h3>
    </li>
  );
};

export default PopularMediaItem;
