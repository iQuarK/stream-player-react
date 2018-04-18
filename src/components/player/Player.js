import React, { Component } from "react";
import classnames from "classnames";
import io from "socket.io-client";
import Playlist from "../playlist/Playlist";
import Feed from "../feed/Feed";
import "./Player.css";

class Player extends Component {
    constructor() {
        super();

        this.socket = io("http://127.0.0.1:5000");
    }

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
            // emit song to be broadcasted into the feed
            this.socket.emit("feed", {
                id: this.socket.id,
                song: item
            });
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
                <Feed socket={this.socket} />
            </div>
        );
    }
}

export default Player;
