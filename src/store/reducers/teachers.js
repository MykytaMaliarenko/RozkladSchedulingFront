import {
    SEARCH_TEACHER_BEGIN,
    SEARCH_TEACHER_FAILURE,
    SEARCH_TEACHER_SUCCESS,
    SEARCH_TEACHER_UNLOAD
} from "../actions/teachers"

const defaultState = {
    isFetching: false,
    hasError: false,

    search: {
        currentRequest: null,
        query: null,
        data: [],
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH_TEACHER_BEGIN:
            return {
                ...state,
                isFetching: true,
                hasError: false,
                search: {
                    currentRequest: action.request,
                    query: action.query,
                    data: [],
                }
            }

        case SEARCH_TEACHER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                search: {
                    currentRequest: null,
                    data: action.data,
                }
            }

        case SEARCH_TEACHER_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: true,
                search: {
                    currentRequest: null,
                    query: null,
                }
            }

        case SEARCH_TEACHER_UNLOAD:
            return defaultState;

        default:
            return state;
    }
}