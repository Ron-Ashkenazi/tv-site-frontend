import "./ProfilePage.css";
import ProfileContent from "../components/ProfileContent";
import AuthContext from "../context/AuthProvider";
import { useState, useContext } from "react";

const ProfilePage = () => {
  const { auth } = useContext(AuthContext);
  const { firstName, lastName } = auth;

  const [dataContent, setDataContent] = useState("movies");
  const [activeButton, setActiveButton] = useState("My movies");

  const changeDataContentHandler = (dataType) => {
    if (dataType === "tvShows") {
      setDataContent("tvShows");
    } else if (dataType === "movies") {
      setDataContent("movies");
    } else if (dataType === "watchlist") {
      setDataContent("watchlist");
    } else {
      setDataContent("settings");
    }
  };

  return (
    <div className="profile-page-root">
      <div className="profile-page-side-div">
        <div className="profile-page-name">
          <h2>
            {firstName} {lastName}
          </h2>
        </div>
        <aside className="sidebar">
          <button
            className={activeButton === "My movies" ? "active" : ""}
            onClick={() => {
              changeDataContentHandler("movies");
              setActiveButton("My movies");
            }}
          >
            My movies
          </button>
          <button
            className={activeButton === "My TV shows" ? "active" : ""}
            onClick={() => {
              changeDataContentHandler("tvShows");
              setActiveButton("My TV shows");
            }}
          >
            My TV shows
          </button>
          <button
            className={activeButton === "Watch list" ? "active" : ""}
            onClick={() => {
              changeDataContentHandler("watchlist");
              setActiveButton("Watch list");
            }}
          >
            Watchlist
          </button>
          <button
            className={activeButton === "Settings" ? "active" : ""}
            onClick={() => {
              changeDataContentHandler("settings");
              setActiveButton("Settings");
            }}
          >
            Settings
          </button>
        </aside>
      </div>
      <main className="profile-main">
        {dataContent && <ProfileContent contentType={dataContent} />}
      </main>
    </div>
  );
};

export default ProfilePage;
