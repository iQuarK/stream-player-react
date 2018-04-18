import fetch from "cross-fetch";
import * as ActionTypes from "./types";

const fetchingPlaylist = () => ({
    type: ActionTypes.FETCHING_PLAYLIST
});

const receivePlaylist = data => {
    return {
        type: ActionTypes.REQUEST_PLAYLIST,
        list: data && data.list ? data.list : []
    };
};

export const fetchPlaylist = () => async dispatch => {
    try {
        dispatch(fetchingPlaylist());

        fetch(`http://127.0.0.1:5000/playlist.json`)
            .then(
                response => response.json(),
                error => console.log("An error occurred.", error)
            )
            .then(json => dispatch(receivePlaylist(json)));
    } catch (error) {
        dispatch({ type: ActionTypes.FAILED_PLAYLIST });
    }
};
