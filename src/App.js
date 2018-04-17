import React, { Component } from "react";
import Player from "./components/player/Player";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">
                        The best player in the world (or almost)
                    </h1>
                </header>
                <div className="App-intro">
                    <Player />
                </div>
            </div>
        );
    }
}

export default App;
