import * as ActionTypes from "../actions/types";

const initialState = { list: [], fetching: false, failed: false };

// Updates error message to notify about the failed fetches.
const playlist = (state = initialState, action) => {
    const { type, list } = action;

    if (type === ActionTypes.FETCHING_PLAYLIST) {
        return { ...initialState, fetching: true };
    } else if (type === ActionTypes.REQUEST_PLAYLIST) {
        return { list, fetching: false };
    } else if (type === ActionTypes.FAILED_PLAYLIST) {
        return { ...initialState, failed: true };
    }

    return state;
};

export default playlist;
