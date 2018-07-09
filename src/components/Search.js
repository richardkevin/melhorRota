import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class Search extends Component {
  state = { line: "" };

  handleSearch = e => {
    this.props.handleSearch(this.state.line);
  };

  onEnterPress = e => {
    if (e.keyCode == 13) {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div>
        <TextField
          label="Linha de ônibus"
          value={this.state.line}
          onBlur={this.handleSearch}
          onKeyDown={this.onEnterPress}
          onChange={e => this.setState({ line: e.target.value })}
        />
        <Button
          color="primary"
          onClick={this.handleSearch}
          size="small"
          style={{ marginLeft: 16 }}
          variant="contained"
        >
          Procurar
        </Button>
      </div>
    );
  }
}
