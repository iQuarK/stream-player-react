import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./Playlist.css";

class Player extends Component {
    constructor() {
        super();
    }

    static propTypes = {
        onSelectSong: PropTypes.func
    };

    state = {
        selectedSong: null
    };

    get songs() {
        return [
            {
                type: "song",
                title: "S.O.B.",
                author: "Nathaniel Rateliff and the Night Sweats",
                filename: "sob.mp3"
            },
            {
                type: "song",
                title: "Sunshine, lollipops and rainbows",
                author: "Lesley Gore",
                filename: "shunlora.mp3"
            }
        ];
    }

    // blocks if the song was already selected
    onSelectedSong = song => {
        if (this.state.selectedSong !== song.title) {
            this.setState({ selectedSong: song.title });
            if (this.props.onSelectSong) {
                this.props.onSelectSong(song);
            }
        }
    };

    togglePlay = () => this.setState({ playing: !this.state.playing });

    render() {
        const { selectedSong } = this.state;

        return (
            <div className="playlist">
                {this.songs.map(song => (
                    <div
                        className={classnames("playlist-item", {
                            active: song.title === selectedSong
                        })}
                        onClick={this.onSelectedSong.bind(this, song)}
                        key={song.title}
                    >
                        {song.title}
                    </div>
                ))}
            </div>
        );
    }
}

export default Player;
