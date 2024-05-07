import { Link } from "react-router-dom";
import "./PopularMediaItem.css";

const PopularMediaItem = (props) => {
  const { item, type } = props;

  return (
    <li className="PM-item-li">
      <div className="PM-item-img-container">
        <Link to={`/${type}/${item.id}`}>
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          />
        </Link>
      </div>
      <h3>{item.name || item.title}</h3>
    </li>
  );
};

export default PopularMediaItem;
