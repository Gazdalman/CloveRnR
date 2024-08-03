const GET_SPOTS = 'spot/GET_ALL_SPOTS';
const CREATE_SPOT = 'spot/CREATE_SPOT';
const EDIT_SPOT = 'spot/EDIT_SPOT';
const GET_MORE_SPOTS = 'spot/GET_MORE_SPOTS';

const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

const getMoreSpots = (spots) => ({
    type: GET_MORE_SPOTS,
    spots
});

const editSpot = (spot) => ({
    type: EDIT_SPOT,
    spot
});

const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
});

export const getAllSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');

    if (res.ok) {
        const data = await res.json();
        dispatch(getSpots(data));
    }
}

export const getMoreSpotsThunk = (page) => async (dispatch) => {
    const res = await fetch(`/api/spots/${page}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getMoreSpots(data));
    }
}

const initialState = [];

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            return [...action.spots];
        case GET_MORE_SPOTS:
            return [...state, ...action.spots];
        case CREATE_SPOT:
            return [...state, action.spot];
        default:
            return state;
    }
}

export default spotReducer;
