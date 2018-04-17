import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Playlist from "../playlist/Playlist";
import "./Player.css";

class Player extends Component {
    state = {
        playing: false
    };

    onSelectSong = item => console.log("TODO, call server to play song", item);

    togglePlay = () => this.setState({ playing: !this.state.playing });

    render() {
        const { playing } = this.state;

        return (
            <div className="container">
                <div className="player">
                    <div className="play">
                        <i
                            className={classnames("audio main-button", {
                                ["play-button"]: !playing,
                                ["pause-button"]: playing
                            })}
                            onClick={this.togglePlay}
                        />
                        <div className="g-col">
                            <span className="playing-title">Playing:</span>
                            <div className="song-title">title!</div>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <div className="bar" />
                    </div>
                </div>
                <Playlist onSelectSong={this.onSelectSong} />
            </div>
        );
    }
}

export default Player;
