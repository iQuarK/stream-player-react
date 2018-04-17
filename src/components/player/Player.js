import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Playlist from "../playlist/Playlist";
import "./Player.css";

class Player extends Component {
    state = {
        playing: false,
        song: null,
        barWidth: 0
    };

    onSelectSong = item => {
        if (this.state.song) {
            this.state.song.player.pause();
            this.state.song.player.src = "";
            this.state.song.player.load();
        }

        let song = {
            ...item,
            player: new Audio(`http://localhost:4000/listen/${item.filename}`)
        };

        this.setState({ playing: true, song }, () => {
            this.state.song.player.play();
            this.state.song.player.ontimeupdate = this.updateBar;
        });
    };

    updateBar = data => this.setState({ barWidth: data.path[0].currentTime });

    togglePlay = () => {
        const { playing, song } = this.state;
        if (song) {
            if (playing) {
                song.player.pause();
            } else {
                song.player.play();
            }
            this.setState({ playing: !playing });
        }
    };

    render() {
        const { playing, song, barWidth } = this.state;

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
                            <div className="song-title">
                                {song ? `${song.title} - ${song.author}` : ""}
                            </div>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="bar"
                            style={{ width: `${barWidth}%` }}
                        />
                    </div>
                </div>
                <Playlist onSelectSong={this.onSelectSong} />
            </div>
        );
    }
}

export default Player;
