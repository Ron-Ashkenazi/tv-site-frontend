export const createFormatedDate = (item) => {
  const releaseDate = item.first_air_date || item.release_date;

  const dateObject = new Date(releaseDate);

  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export const createNewItem = (
  rateOrWatchlist,
  rating,
  item,
  formattedDate,
  type,
  title
) => {
  let setRating;
  let watchlist;

  if (rateOrWatchlist === "rate") {
    setRating = rating;
    watchlist = false;
  } else {
    setRating = null;
    watchlist = true;
  }
  const newItem = {
    id: item.id,
    media_type: type,
    name: title,
    overview: item.overview,
    poster_path: item.poster_path,
    first_air_date: formattedDate,
    my_rating: setRating,
    watchlist: watchlist,
  };
  return newItem;
};
