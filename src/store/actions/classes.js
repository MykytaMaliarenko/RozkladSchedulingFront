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

export function fetchClassesByGroup(group) {
    return async (dispatch) => {
        dispatch(fetchClassesBegin(filters.BY_GROUP, group));

        let result = null;
        try {
            result = await api.Classes.getByGroup(group);
        } catch (error) {
            dispatch(fetchClassesFailure(filters.BY_GROUP, error));
        }

        if (result)
            dispatch(fetchClassesSuccess(filters.BY_GROUP, {
                group,
                classes: result
            }));
    }
}

export function fetchClassesByGroupIfNeeded(group) {
    return async (dispatch, getState) => {
        let classesByGroup = getState().classes.data[filters.BY_GROUP];
        if (!classesByGroup[group])
            dispatch(fetchClassesByGroup(group));
    }
}


export default {
    FETCH_CLASSES_BEGIN,
    FETCH_CLASSES_SUCCESS,
    FETCH_CLASSES_FAILURE,
    fetchClassesByGroup,
    fetchClassesByGroupIfNeeded,
    filters,
};