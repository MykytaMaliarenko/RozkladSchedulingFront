import api from '../../api'

export const filters = {
    BY_GROUP: "BY_GROUP",
    BY_ROOM: "BY_ROOM",
    BY_TEACHER: "BY_TEACHER",
    BY_ID: "BY_ID"
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

export function fetchClassesByTeacherIfNeeded(teacher) {
    return async (dispatch, getState) => {
        let classesByTeacher = getState().classes.data[filters.BY_TEACHER];
        if (!classesByTeacher[teacher])
            dispatch(fetchClasses(filters.BY_TEACHER, api.Classes.getByTeacher, teacher))
    }
}


export function fetchClassByIdIfNeeded(id) {
    return async (dispatch, getState) => {
        let classesById = getState().classes.data[filters.BY_ID];
        if (!classesById[id])
            dispatch(fetchClasses(filters.BY_ID, api.Classes.getById, id))
    }
}


const MAX_CLASSES_SIZE = 250;
export const CLASSES_UNLOAD = "CLASSES_UNLOAD";
export const classesUnload = (filter, key) => ({
    type: CLASSES_UNLOAD,
    filter,
    key
})

const calculateClassesNumber = (filter, data) => {
    if (filter === filters.BY_ID)
        return Object.keys(data[filters.BY_ID]).length;
    else {
        return Object.keys(data[filter])
            .map(key => data[filter][key].length)
            .reduce((a, b) => a + b, 0)
    }
}

export function unloadRandomClassIfNeeded() {
    return async (dispatch, getState) => {
        let totalSize = getState().classes.data.totalSize;
        if (totalSize >= MAX_CLASSES_SIZE) {
            let data = getState().classes.data;
            let filtersSortedBySize = Object.values(filters).sort(
                (a, b) => calculateClassesNumber(b, data) - calculateClassesNumber(a, data)
            );
            dispatch(classesUnload(filtersSortedBySize[0], Object.keys(data[filtersSortedBySize[0]])[0]));
            dispatch(unloadRandomClassIfNeeded());
        }
    }
}


export default {
    FETCH_CLASSES_BEGIN,
    FETCH_CLASSES_SUCCESS,
    FETCH_CLASSES_FAILURE,
    fetchClassesByGroupIfNeeded,
    fetchClassesByRoomIfNeeded,
    fetchClassesByTeacherIfNeeded,
    fetchClassByIdIfNeeded,
    filters,
};