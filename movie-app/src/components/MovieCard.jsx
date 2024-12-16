import React from "react";

const MovieCard = ({ poster_path, title, overview, vote_average }) => {
  return (
    <div className="movie" id="container">
      {/* img için base adrese endpoint olaraka dizideki poster_path eklenecek */}
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/w1280${poster_path}`}
        alt="movie-card"
      />
      <div className="flex align-baseline justify-between p-1 text-white">
        <h5>{title}</h5>

        {/* kullanıcı login, register yada google ile giriş yaptıysa, AuthContext te currentUser oluşuyor, giriş yapıldıysa vote_average yi görebilsin */}

        <span className={vote_average >7 ? "tag green": vote_average >6 ? "tag orange" : "tag red"}>{vote_average.toFixed(2)}</span>
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
