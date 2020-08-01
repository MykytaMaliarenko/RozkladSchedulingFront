import api from '../../api'

export const SEARCH_TEACHER_BEGIN = "SEARCH_TEACHER_BEGIN";
export const searchTeacherBegin = (query, request) => ({
    type: SEARCH_TEACHER_BEGIN,
    query,
    request
});

export const SEARCH_TEACHER_SUCCESS = "SEARCH_TEACHER_SUCCESS";
export const searchTeacherSuccess = (query, result) => ({
    type: SEARCH_TEACHER_SUCCESS,
    query,
    data: result,
});

export const SEARCH_TEACHER_FAILURE = "SEARCH_TEACHER_FAILURE";
export const searchTeacherFailure = (error) => ({
    type: SEARCH_TEACHER_FAILURE,
    error
});

export const SEARCH_TEACHER_UNLOAD = "SEARCH_TEACHER_UNLOAD";
export const searchTeacherUnload = () => ({
    type: SEARCH_TEACHER_UNLOAD,
});

export function searchTeacher(query) {
    return async (dispatch, getState) => {
        let prevRequest = getState().teachers.search.currentRequest;
        if (prevRequest)
            prevRequest.abort();

        let request = api.Teachers.search(query);
        dispatch(searchTeacherBegin(query, request));

        let result = null;
        try {
            result = await request;
        } catch (error) {
            dispatch(searchTeacherFailure(error));
        }

        if (result)
            dispatch(searchTeacherSuccess(request, result.body));
    }
}

export function searchTeacherStop() {
    return async (dispatch, getState) => {
        let prevRequest = getState().groups.search.query;
        if (prevRequest)
            prevRequest.abort();

        dispatch(searchTeacherUnload());
    }
}