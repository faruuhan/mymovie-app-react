import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Pagination from "react-js-pagination";

const NowPlaying = () => {
  const [movie, setMovie] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API}&language=en-US&page=${currentPage}`)
      .then((response) => {
        setMovie(response.data.results);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
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

  const changePage = (page) => {
    setPage(page);
  };

  let getLocal = JSON.parse(localStorage.getItem("data"));
  return (
    <Layout>
      <div className="container">
        <h4 className="text-center py-4">NOW PLAYING</h4>
        <div className="row flex-wrap gap-3">
          {getLocal
            ? movie.map((item) => {
                let checkFav = getLocal.find((i) => i.id === item.id);
                return (
                  <div key={item.id} className="card border-0 bg-transparant" style={{ width: "14rem" }}>
                    <Link to={`/detail/${item.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt={item.poster_path} />
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
            : movie.map((item) => {
                return (
                  <div key={item.id} className="card border-0 bg-transparant" style={{ width: "18rem" }}>
                    <Link to={`/detail/${item.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt={item.poster_path} />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title text-center">{item.title}</h5>
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-danger btn-sm" onClick={() => addToFav(item)}>
                        Favorite
                      </button>
                    </div>
                  </div>
                );
              })}
          {isReady ? <Pagination itemClass="page-item" linkClass="page-link" activePage={currentPage} totalItemsCount={data.total_results} prevPageText="Prev" nextPageText="Next" hideFirstLastPages={true} onChange={changePage} /> : ""}
        </div>
      </div>
    </Layout>
  );
};

export default NowPlaying;
