import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import Maps from "./components/Maps";
import Search from "./components/Search";
import "./App.css";

const url =
  "http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes";

const FAVORITE_LINES = ["881"];

class App extends Component {
  state = { data: [], loaded: false };

  componentDidMount() {
    fetch(url).then(response =>
      response.json().then(data => {
        this.setState({
          data: data.DATA.filter(
            line =>
              line[2] !== "" && FAVORITE_LINES.includes(line[2].toString())
          ),
          loaded: true
        });
      })
    );
  }

  handleSearch = busLine => {
    fetch(url).then(response =>
      response.json().then(data => {
        const filteredData = data.DATA.filter(
          line => line[2].toString() === busLine.toUpperCase()
        );
        this.setState({ data: filteredData });
      })
    );
  };

  render() {
    return (
      <div className="App">
        <Search handleSearch={this.handleSearch} />

        {this.state.loaded ? (
          <Maps
            data={this.state.data}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
              process.env.REACT_APP_GOOGLE_MAPS_KEY
            }`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: 600, marginTop: 16 }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        ) : (
          <div style={{ width: 500, margin: "200px auto" }}>
            <p>Carregando...</p>
            <LinearProgress />
          </div>
        )}
      </div>
    );
  }
}

export default App;
