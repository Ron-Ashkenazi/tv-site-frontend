import React, { useEffect, useState, useContext, useCallback } from "react";
import ProfileItem from "./ProfileItem";
import "./ProfileContent.css";
import AuthContext from "../context/AuthProvider";
import ProfileSettings from "./ProfileSettings";
import { removeItemFromDB } from "../util/auth";
import { PiSortAscendingBold } from "react-icons/pi";
import { PiSortDescendingBold } from "react-icons/pi";

const ProfileContent = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { tvShows, movies, watchlist } = auth;
  const { contentType } = props;
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriterion, setSortCriterion] = useState("added");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;

  function updateAuthData(updatedData) {
    if (contentType === "tvShows") setAuth({ ...auth, tvShows: updatedData });
    else if (contentType === "movies")
      setAuth({ ...auth, movies: updatedData });
    else setAuth({ ...auth, watchlist: updatedData });
  }

  const removeItemHandler = (id) => {
    const newItems = filteredItems.filter((item) => item.id !== id);
    updateAuthData(newItems);
    setFilteredItems(newItems);
    removeItemFromDB(contentType, id);
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const filterItems = useCallback((items, criterion, direction, query) => {
    let sortedItems = [...items];
    if (criterion === "name") {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criterion === "date") {
      sortedItems.sort(
        (a, b) => parseDate(a.first_air_date) - parseDate(b.first_air_date)
      );
    } else if (criterion === "rating") {
      sortedItems.sort((a, b) => b.my_rating - a.my_rating);
    }

    if (direction === "desc") {
      sortedItems.reverse();
    }

    if (query) {
      sortedItems = sortedItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return sortedItems;
  }, []);

  useEffect(() => {
    let currentItems;
    if (contentType === "tvShows") currentItems = tvShows;
    else if (contentType === "movies") currentItems = movies;
    else currentItems = watchlist;

    const sortedItems = filterItems(
      currentItems,
      sortCriterion,
      sortDirection,
      searchQuery
    );
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  }, [
    contentType,
    tvShows,
    movies,
    watchlist,
    sortCriterion,
    sortDirection,
    searchQuery,
    filterItems,
  ]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <main className="profile-content-main">
      {contentType === "settings" && <ProfileSettings />}
      {contentType !== "settings" && (
        <div className="profile-content-container">
          <div className="filter-options">
            <label htmlFor="sort-criterion">Sort by: </label>
            <select
              id="sort-criterion"
              value={sortCriterion}
              onChange={(e) => setSortCriterion(e.target.value)}
            >
              <option value="added">Added</option>
              <option value="date">Date</option>
              <option value="name">Name</option>
              {(contentType === "tvShows" || contentType === "movies") && (
                <option value="rating">Rating</option>
              )}
            </select>

            {sortDirection === "asc" && (
              <PiSortAscendingBold
                className="direction-button"
                onClick={toggleSortDirection}
              />
            )}
            {sortDirection === "desc" && (
              <PiSortDescendingBold
                className="direction-button"
                onClick={toggleSortDirection}
              />
            )}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="profile-content-items">
            {currentItems.map((item) => (
              <ProfileItem
                removeHandler={removeItemHandler}
                item={item}
                key={item.id}
              />
            ))}
            {currentItems.length === 0 && (
              <h4 className="empty-list">Your list is empty</h4>
            )}
          </div>
          <div className="pagination-buttons">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Back
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Forward
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfileContent;
