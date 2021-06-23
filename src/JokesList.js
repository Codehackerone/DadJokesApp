import React, { Component } from "react";
import axios from "axios";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }
  async componentDidMount() {
    //Load Jokes
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json" },
      });
      jokes.push({joke:res.data.joke,votes:0});
    }
    this.setState({ jokes: jokes });
  }
  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>DAD</span> Jokes
          </h1>
          <img src="laugh.svg" alt="laughing emoji"/>
          <button className="JokeList-getmore">New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map((j) => (
            <div>{j.joke}-{j.votes}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
