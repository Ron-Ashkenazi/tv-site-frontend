import React from "react";
import "./Content.css";
import SingleItem from "./SingleItem";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Content = (props) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="content-container">
      {props.results.map((item) => {
        if (item.media_type !== "tv" && item.media_type !== "movie")
          return null;

        return <SingleItem item={item} key={item.id} auth={auth} />;
      })}
    </div>
  );
};

export default Content;
