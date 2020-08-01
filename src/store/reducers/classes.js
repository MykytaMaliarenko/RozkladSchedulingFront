import {
    FETCH_CLASSES_BEGIN,
    FETCH_CLASSES_FAILURE,
    FETCH_CLASSES_SUCCESS,
    CLASSES_UNLOAD,
    filters
} from "../actions/classes"

const defaultState = {
    isFetching: false,
    hasError: false,
    data: {
        [filters.BY_GROUP]: {},
        [filters.BY_ROOM]: {},
        [filters.BY_TEACHER]: {},

        totalSize: 0,
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
                        [action.payload.apiPayload]: action.payload.classes
                    },
                    totalSize: state.data.totalSize + 1,
                }
            }

        case FETCH_CLASSES_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: true,
            }


        case CLASSES_UNLOAD:
            let data = Object.assign({}, state.data);
            delete data[action.filter][action.key];

            return {
                ...state,
                data: {
                    ...data,
                    totalSize: state.data.totalSize - 1,
                }
            }

        default:
            return state;
    }
}