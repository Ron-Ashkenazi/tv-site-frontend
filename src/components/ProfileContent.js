import ProfileItem from "./ProfileItem";
import "./ProfileContent.css";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import ProfileSettings from "./ProfileSettings";
import { removeItemFromDB } from "../util/auth";

const ProfileContent = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { tvShows, movies, watchlist } = auth;
  const { contentType } = props;
  const [items, setItems] = useState([]);

  function updateAuthData(updatedData) {
    if (contentType === "tvShows") setAuth({ ...auth, tvShows: updatedData });
    else if (contentType === "movies")
      setAuth({ ...auth, movies: updatedData });
    else setAuth({ ...auth, watchlist: updatedData });
  }

  const removeItemHandler = (id) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      updateAuthData(newItems);
      return newItems;
    });
    removeItemFromDB(contentType, id);
  };

  useEffect(() => {
    if (contentType === "tvShows") setItems(tvShows);
    else if (contentType === "movies") setItems(movies);
    else setItems(watchlist);
  }, [contentType, tvShows, movies, watchlist]);

  return (
    <main className="profile-content-main">
      <div className="profile-content-items">
        {contentType === "settings" && <ProfileSettings />}
        {contentType !== "settings" &&
          items.map((item) => {
            return (
              <ProfileItem
                removeHandler={removeItemHandler}
                item={item}
                key={Math.random()}
              />
            );
          })}
      </div>
    </main>
  );
};

export default ProfileContent;
