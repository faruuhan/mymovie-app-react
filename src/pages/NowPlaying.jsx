import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import "bootstrap/dist/css/bootstrap.min.css";

export default class NowPlaying extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [
        {
          id: 1,
          title: "The Batman 2022",
          rate: "8.2",
          genre: "Action, Crime, Drama",
          sinopsis: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
          image_link: "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
        },
        {
          id: 2,
          title: "The Adam Project",
          rate: "6.8",
          genre: "Action, Adventure, Comedy",
          sinopsis: "After accidentally crash-landing in 2022, time-traveling fighter pilot Adam Reed teams up with his 12-year-old self for a mission to save the future.",
          image_link: "https://m.media-amazon.com/images/M/MV5BOWM0YWMwMDQtMjE5NS00ZTIwLWE1NWEtODViMWZjMWI2OTU3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg",
        },
        {
          id: 3,
          title: "Turning Red",
          rate: "7.1",
          genre: "Animation, Adventure, Comedy",
          sinopsis: "A 13-year-old girl named Meilin turns into a giant red panda whenever she gets too excited.",
          image_link: "https://m.media-amazon.com/images/M/MV5BNjY0MGEzZmQtZWMxNi00MWVhLWI4NWEtYjQ0MDkyYTJhMDU0XkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_FMjpg_UX1000_.jpg",
        },
        {
          id: 4,
          title: "The Kashmir Files",
          rate: "8.3",
          genre: "Drama, History, Thriller",
          sinopsis: "The Kashmir Files' is a story, based on video interviews of the first generation victims of the Genocide of Kashmiri Pandit Community In 1990.",
          image_link: "https://m.media-amazon.com/images/M/MV5BNmUxYjA0NDYtM2UwNS00MzgyLTkxZTktNTFiZGU3MzIxNTI2XkEyXkFqcGdeQXVyOTE2NDU1NDM@._V1_.jpg",
        },
      ],
    };
  }

  async handleClick(item) {
    let getLocal = JSON.parse(localStorage.getItem("data"));
    if (getLocal) {
      getLocal.push(item);
      localStorage.setItem("data", JSON.stringify(getLocal));
    } else {
      localStorage.setItem("data", JSON.stringify([item]));
    }
  }

  render() {
    return (
      <div>
        <Navbar label="MyMovies" navpage1="Home" navpage2="Favorite" />
        <h4 className="text-center">Now Playing</h4>
        <Container className="pt-5">
          <div className="row justify-content-sm-center flex-wrap gap-3">
            {this.state.data.map((item) => {
              return (
                <div key={item.id} className="card pb-1" style={{ width: "18rem" }}>
                  <img src={item.image_link} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="fst-italic">{item.genre}</p>
                    <p className="card-text">{item.sinopsis}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <a href="#" className="btn btn-success">
                      Detail
                    </a>
                    <button className="btn btn-danger" onClick={() => this.handleClick(item)}>
                      Favorite
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
}
