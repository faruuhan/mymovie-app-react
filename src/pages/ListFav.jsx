import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const ListFav = () => {
  const [movie, setMovie] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let getLocal = JSON.parse(localStorage.getItem("data"));
    setMovie(getLocal);
    setIsReady(true);
  };

  const addToFav = (item) => {
    let getLocal = JSON.parse(localStorage.getItem("data"));
    if (getLocal) {
      let findItem = getLocal.findIndex((i) => item.id === i.id);
      if (findItem != -1) {
        let newItem = getLocal;
        getLocal.splice(findItem, findItem + 1);
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(newItem));
      } else {
        getLocal.push(item);
        localStorage.setItem("data", JSON.stringify(getLocal));
      }
    } else {
      localStorage.setItem("data", JSON.stringify([item]));
    }
    fetchData();
  };

  let getLocal = JSON.parse(localStorage.getItem("data"));
  return (
    <div>
      <Navbar />
      <div className="container">
        <h4 className="text-center py-4">LIST FAVORITE</h4>
        <div className="row d-flex flex-wrap gap-3">
          {getLocal
            ? movie.map((item) => {
                let getLocal = JSON.parse(localStorage.getItem("data"));
                let checkFav = getLocal.find((i) => i.id === item.id);
                return (
                  <div key={item.id} className="card border-0 bg-transparant" style={{ width: "18%" }}>
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
    </div>
  );
};
export default ListFav;
