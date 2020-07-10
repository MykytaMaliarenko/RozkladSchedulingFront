import api from '../../api'

export const SEARCH_GROUP_BEGIN = "SEARCH_GROUP_BEGIN";
export const searchGroupBegin = (query, request) => ({
    type: SEARCH_GROUP_BEGIN,
    query,
    request
});

export const SEARCH_GROUP_SUCCESS = "SEARCH_GROUP_SUCCESS";
export const searchGroupSuccess = (query, result) => ({
    type: SEARCH_GROUP_SUCCESS,
    query,
    data: result,
});

export const SEARCH_GROUP_FAILURE = "SEARCH_GROUP_FAILURE";
export const searchGroupFailure = (error) => ({
    type: SEARCH_GROUP_FAILURE,
    error
});

export const SEARCH_UNLOAD = "SEARCH_UNLOAD";
export const searchUnload = () => ({
    type: SEARCH_UNLOAD,
});

export function searchGroup(query) {
    return async (dispatch, getState) => {
        let prevRequest = getState().groups.search.currentRequest;
        if (prevRequest)
            prevRequest.abort();

        let request = api.Groups.search(query);
        dispatch(searchGroupBegin(query, request));

        let result = null;
        try {
            result = await request;
        } catch (error) {
            dispatch(searchGroupFailure(error));
        }
        
        if (result)
            dispatch(searchGroupSuccess(request, result.body));
    }
}

export function searchStop() {
    return async (dispatch, getState) => {
        let prevRequest = getState().groups.search.query;
        if (prevRequest)
            prevRequest.abort();

        dispatch(searchUnload());
    }
}