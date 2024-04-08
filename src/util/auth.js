export function setUser(user) {
  localStorage.setItem("userID", user._id);
}

export function removeUser() {
  localStorage.removeItem("userID");
}

export async function addItemToDB(auth, item) {
  let list = "";
  if (item.watchlist) {
    list = "watchlist";
    auth.watchlist.push(item);
  } else {
    if (item.media_type === "TV Series") {
      list = "tvShows";
      auth.tvShows.push(item);
    } else {
      list = "movies";
      auth.movies.push(item);
    }
  }

  const data = {
    item: item,
    list: list,
  };

  const storedToken = localStorage.getItem("token");
  const storedUserID = localStorage.getItem("userID");

  fetch(`http://127.0.0.1:5000/api/v1/users/lists/${storedUserID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify(data),
  });
}

export async function removeItemFromDB(list, id) {
  const data = {
    id: id,
    list: list,
  };

  console.log(data);

  const storedToken = localStorage.getItem("token");
  const storedUserID = localStorage.getItem("userID");

  fetch(`http://127.0.0.1:5000/api/v1/users/lists/${storedUserID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify(data),
  });
}

export function updateItemRating(media_type, id, newRating) {
  let list = "";

  if (media_type === "TV Series") {
    list = "tvShows";
  } else {
    list = "movies";
  }

  const data = {
    id: id,
    list: list,
    rating: newRating,
  };

  console.log(data);

  const storedToken = localStorage.getItem("token");
  const storedUserID = localStorage.getItem("userID");

  fetch(
    `http://127.0.0.1:5000/api/v1/users/lists/updateItemRating/${storedUserID}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(data),
    }
  );
}
