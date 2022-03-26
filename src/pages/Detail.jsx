import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import moment from "moment";
import numeral from "numeral";

const Detail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [spoken, setSpoken] = useState([]);
  const [countries, setCountries] = useState([]);
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
        setGenres(response.data.genres);
        setCompanies(response.data.production_companies);
        setSpoken(response.data.spoken_languages);
        setCountries(response.data.production_countries);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };

  const genre = genres.map((items) => {
    return items.name;
  });

  const productCompanies = companies.map((items) => {
    return items.name;
  });

  const spokenLanguages = spoken.map((items) => {
    return items.english_name;
  });

  const productionCountries = countries.map((items) => {
    return items.iso_3166_1;
  });

  return (
    <Layout>
      {isReady ? (
        <div className="container">
          <div className="row pt-5 gap-3 justify-content-center flex-wrap">
            <div className="col-lg-4 d-flex justify-content-center">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ width: "80%" }} alt="" />
            </div>
            <div className="col-lg-7">
              <div className="card bg-transparant">
                <div className="card-header">
                  <h1>
                    {movie.title} <span className="text-muted">({moment(movie.release_date).format("YYYY")})</span>
                  </h1>
                  <p className="fst-italic text-muted">{movie.tagline}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Genre : {genre.join(", ")}</li>
                  <li className="list-group-item">
                    Release Date : {moment(movie.release_date).format("D MMMM YYYY")} ({productionCountries.join(", ")})
                  </li>
                  <li className="list-group-item">Status : {movie.status}</li>
                  <li className="list-group-item">Duration : {movie.runtime} Minutes</li>
                  <li className="list-group-item">Popularity : {movie.popularity}</li>
                  <li className="list-group-item">Production Companies : {productCompanies.join(", ")}</li>
                  <li className="list-group-item">Spoken Languanges : {spokenLanguages.join(", ")}</li>
                  <li className="list-group-item">Budget : {numeral(movie.budget).format("$0,0.00")}</li>
                  <li className="list-group-item">Revenue : {numeral(movie.revenue).format("$0,0.00")}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header">Overview</div>
                <div className="card-body">
                  <p className="card-text">{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default Detail;
