import api from '../../api'

export const filters = {
    BY_GROUP: "BY_GROUP"
}

export const FETCH_CLASSES_BEGIN = "FETCH_CLASSES_BEGIN";
export const fetchClassesBegin = (filter, payload) => ({
    type: FETCH_CLASSES_BEGIN,
    filter,
    payload,
});

export const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";
export const fetchClassesSuccess = (filter, payload) => ({
    type: FETCH_CLASSES_SUCCESS,
    filter,
    payload,
})

export const FETCH_CLASSES_FAILURE = "FETCH_CLASSES_FAILURE";
export const fetchClassesFailure = (filter, error) => ({
    type: FETCH_CLASSES_FAILURE,
    filter,
    error,
})

export function fetchClasses(filter, apiMethod, apiPayload) {
    return async (dispatch) => {
        dispatch(fetchClassesBegin(filter, apiPayload));

        let result = null;
        try {
            result = await apiMethod(apiPayload);
        } catch (error) {
            dispatch(fetchClassesFailure(filter, error));
        }

        if (result) {
            let payload = {
                ...apiPayload,
                classes: result,
            };

            dispatch(fetchClassesSuccess(filter, payload));
        }
    }
}

export function fetchClassesByGroupIfNeeded(group) {
    return async (dispatch, getState) => {
        let classesByGroup = getState().classes.data[filters.BY_GROUP];
        if (!classesByGroup[group])
            dispatch(fetchClasses(filters.BY_GROUP, api.Classes.getByGroup, group));
    }
}


export default {
    FETCH_CLASSES_BEGIN,
    FETCH_CLASSES_SUCCESS,
    FETCH_CLASSES_FAILURE,
    fetchClassesByGroupIfNeeded,
    filters,
};