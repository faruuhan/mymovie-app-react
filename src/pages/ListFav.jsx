import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { reduxAction } from "../utility/redux/actions/action";

const ListFav = () => {
  const movie = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let getLocal = JSON.parse(localStorage.getItem("data"));
    dispatch(reduxAction("GET_FAVORITES", getLocal));
    document.title = `Muvi Ku - List Favorites`;
  };

  const addToFav = (item) => {
    if (movie) {
      let findItem = movie.findIndex((i) => item.id === i.id);
      if (findItem != -1) {
        movie.splice(findItem, findItem + 1);
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(movie));
      } else {
        movie.push(item);
        localStorage.setItem("data", JSON.stringify(movie));
      }
    } else {
      localStorage.setItem("data", JSON.stringify([item]));
    }
    fetchData();
  };

  return (
    <Layout>
      <div className="container py-3">
        <h4 className="text-center py-4">LIST FAVORITE</h4>
        <div className="row d-flex flex-wrap gap-3">
          {movie && movie.length > 0
            ? movie.map((item) => {
                let checkFav = movie.find((i) => i.id === item.id);
                return (
                  <div key={item.id} className="card border-0 bg-transparent" style={{ width: "14rem" }}>
                    <Link to={`/detail/${item.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt="..." />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title text-center">{item.title}</h5>
                    </div>
                    <div className="d-grid">
                      <button className={checkFav ? "btn btn-outline-danger btn-sm" : "btn btn-danger btn-sm"} onClick={() => addToFav(item)}>
                        {checkFav ? "Favorited" : "Favorite"}
                      </button>
                    </div>
                  </div>
                );
              })
            : "No Favorite"}
        </div>
      </div>
    </Layout>
  );
};
export default ListFav;
