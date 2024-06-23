import { Link } from "react-router-dom";
import "./RecommenItem.css";

const RecommenItem = (props) => {
  const { item, type } = props;

  return (
    <li className="RI-item-li">
      <div className="RI-item-img-container">
        <Link to={`/${type}/${item.id}`}>
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
          />
        </Link>
      </div>
      <div className="RI-item-title">
        <strong>{item.name || item.title}</strong>
      </div>
    </li>
  );
};

export default RecommenItem;
