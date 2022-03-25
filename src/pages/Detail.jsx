import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

const Detail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [genre, setGenre] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const { id } = params;
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API}&language=en-US`)
      .then((response) => {
        setMovie(response.data);
        setGenre(response.data.genres);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };
  // genre.map((g) => {
  //   let genres = g.name;
  // });
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-4">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ width: "100%" }} alt="" />
          </div>
          <div className="col-lg">
            <h1>{movie.title}</h1>
            <p>
              {movie.release_date} • {movie.status} • Rate: {movie.vote_average}
            </p>
            <p className="fst-italic">{movie.tagline}</p>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Detail;
