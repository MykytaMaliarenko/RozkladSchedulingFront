import api from '../../api'

export const filters = {
    BY_GROUP: "BY_GROUP",
    BY_ROOM: "BY_ROOM"
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
                apiPayload,
                classes: result,
            };

            dispatch(unloadRandomClassIfNeeded());
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

export function fetchClassesByRoomIfNeeded(room) {
    return async (dispatch, getState) => {
        let classesByRoom = getState().classes.data[filters.BY_ROOM];
        if (!classesByRoom[room])
            dispatch(fetchClasses(filters.BY_ROOM, api.Classes.getByRoom, room))
    }
}


const MAX_CLASSES_SIZE = 10;
export const CLASSES_UNLOAD = "CLASSES_UNLOAD";
export const classesUnload = (filter, key) => ({
    type: CLASSES_UNLOAD,
    filter,
    key
})

export function unloadRandomClassIfNeeded() {
    return async (dispatch, getState) => {
        let totalSize = getState().classes.data.totalSize;
        if (totalSize >= MAX_CLASSES_SIZE) {
            let data = getState().classes.data;
            let filtersSortedBySize = Object.values(filters).sort(
                (a, b) => Object.keys(data[b]).length - Object.keys(data[a]).length
            );
            dispatch(classesUnload(filtersSortedBySize[0], Object.keys(data[filtersSortedBySize[0]])[0]));
        }
    }
}


export default {
    FETCH_CLASSES_BEGIN,
    FETCH_CLASSES_SUCCESS,
    FETCH_CLASSES_FAILURE,
    fetchClassesByGroupIfNeeded,
    fetchClassesByRoomIfNeeded,
    filters,
};