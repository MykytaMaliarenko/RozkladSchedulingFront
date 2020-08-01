import {
    SEARCH_GROUP_BEGIN,
    SEARCH_GROUP_FAILURE,
    SEARCH_GROUP_SUCCESS,
    SEARCH_GROUP_UNLOAD
} from "../actions/groups"

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
        case SEARCH_GROUP_BEGIN:
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

        case SEARCH_GROUP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                search: {
                    currentRequest: null,
                    data: action.data,
                }
            }

        case SEARCH_GROUP_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: true,
                search: {
                    currentRequest: null,
                    query: null,
                }
            }

        case SEARCH_GROUP_UNLOAD:
            return defaultState;

        default:
            return state;
    }
}