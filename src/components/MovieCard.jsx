import React, { Component } from "react";

class MovieCard extends Component {
  constructor(props) {
    super();
  }

  render() {
    let getLocal = JSON.parse(localStorage.getItem("data"));
    let checkFav = getLocal.find((i) => i.id === this.props.data.id);
    console.log(this.props.data);
    return (
      <>
        <div key={this.props.data.id} className="card" style={{ width: "18rem" }}>
          <img src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{this.props.data.title}</h5>
            <p className="card-text">Original Title : {this.props.data.original_title}.</p>
            <p className="card-text">Release Date : {this.props.data.release_date}.</p>
          </div>
          <div className="d-flex justify-content-end mb-2">
            <button className={checkFav ? "btn btn-outline-danger" : "btn btn-danger"} onClick={() => this.addToFav()}>
              {checkFav ? "Favorited" : "Favorite"}
            </button>
          </div>
        </div>
      </>
    );
  }
}

class MovieCardIsReady extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <>
        <div key={this.props.data.id} className="card" style={{ width: "18rem" }}>
          <img src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{this.props.data.title}</h5>
            <p className="card-text">Original Title : {this.props.data.original_title}.</p>
            <p className="card-text">Release Date : {this.props.data.release_date}.</p>
          </div>
          <div className="d-flex justify-content-end mb-2">
            <button className="btn btn-danger" onClick={() => this.addToFav()}>
              Favorite
            </button>
          </div>
        </div>
      </>
    );
  }
}

export { MovieCard, MovieCardIsReady };
