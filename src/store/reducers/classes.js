import {
    FETCH_CLASSES_BEGIN,
    FETCH_CLASSES_FAILURE,
    FETCH_CLASSES_SUCCESS,
    filters
} from "../actions/classes"

const defaultState = {
    isFetching: false,
    hasError: false,
    data: {
        [filters.BY_GROUP]: {},
    },
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_CLASSES_BEGIN:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }

        case FETCH_CLASSES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: {
                    ...state.data,
                    [action.filter]: {
                        ...state.data[action.filter],
                        [action.payload.group]: action.payload.classes
                    }
                }
            }

        case FETCH_CLASSES_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: true,
            }

        default:
            return state;
    }
}