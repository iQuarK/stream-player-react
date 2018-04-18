import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPlaylist } from "../../actions/playlist";
import classnames from "classnames";
import "./Playlist.css";

class Player extends Component {
    constructor() {
        super();
    }

    static propTypes = {
        onSelectSong: PropTypes.func,
        fetchPlaylist: PropTypes.func,
        playlist: PropTypes.object
    };

    state = {
        selectedSong: null,
        list: []
    };

    componentWillMount() {
        this.props.fetchPlaylist();
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
        const { playlist } = this.props;

        return (
            <div className="playlist">
                {playlist.fetching
                    ? "Fetching playlist..."
                    : playlist.list.length &&
                      playlist.list.map(song => (
                          <div
                              className={classnames("playlist-item", {
                                  active: song.title === selectedSong
                              })}
                              onClick={this.onSelectedSong.bind(this, song)}
                              key={song.title}
                          >
                              {song.title} - {song.author}
                          </div>
                      ))}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    playlist: state.playlist
});
const mapDispatchToProps = dispatch => ({
    fetchPlaylist: () => {
        dispatch(fetchPlaylist());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
