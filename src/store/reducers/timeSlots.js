import {
    FETCH_TIME_SLOTS_BEGIN,
    FETCH_TIME_SLOTS_FAILURE,
    FETCH_TIME_SLOTS_SUCCESS
} from "../actions/timeSlots";

const defaultState = {
    data: [],
    isFetching: false,
    hasError: false,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_TIME_SLOTS_BEGIN:
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };

        case FETCH_TIME_SLOTS_SUCCESS:
            return {
                ...state,
                data: action.data,
                isFetching: false,
            };

        case FETCH_TIME_SLOTS_FAILURE:
            return {
                ...state,
                hasError: true,
            };

        default:
            return state;
    }
}