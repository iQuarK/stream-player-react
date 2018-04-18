import React, { Component } from "react";
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
            let { song } = this.state;
            song.player.pause();
            song.player.src = "";
            song.player.load();
        }

        let song = {
            ...item,
            player: new Audio(`http://localhost:5000/listen/${item.filename}`)
        };

        this.setState({ playing: true, song }, () => {
            let { song } = this.state;
            song.player.play();
            song.player.ontimeupdate = this.updateBar;
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
                                "play-button": !playing,
                                "pause-button": playing
                            })}
                            onClick={this.togglePlay}
                        />
                        <div>
                            <span className="playing-title">
                                {(song &&
                                    ((playing && "Playing") ||
                                        (!playing && "Paused"))) ||
                                    "Waiting"}
                            </span>
                            <div className="song-title">
                                {!song && "Click in a song to start playing..."}
                                {song && `${song.title} - ${song.author}`}
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
