import api from '../../api'

export const FETCH_TIME_SLOTS_BEGIN = "FETCH_TIME_SLOTS_BEGIN";
export const fetchTimeSlotsBegin = () => ({
    type: FETCH_TIME_SLOTS_BEGIN,
});

export const FETCH_TIME_SLOTS_SUCCESS = "FETCH_TIME_SLOTS_SUCCESS";
export const fetchTimeSlotsSuccess = (data) => ({
    type: FETCH_TIME_SLOTS_SUCCESS,
    data,
});

export const FETCH_TIME_SLOTS_FAILURE = "FETCH_TIME_SLOTS_FAILURE";
export const fetchTimeSlotsFailure = (error) => ({
    type: FETCH_TIME_SLOTS_FAILURE,
    error,
});

export function fetchTimeSlotsIfNeeded() {
    return async (dispatch, getState) => {
        let data = getState().timeSlots.data;
        if (!data || data.length !== 0)
            return;

        dispatch(fetchTimeSlotsBegin());

        let result = null;
        try {
            result = await api.TimeSlots.getAll();
        } catch (error) {
            dispatch(fetchTimeSlotsFailure(error));
        }

        if (result)
            dispatch(fetchTimeSlotsSuccess(result));
    }
}

export default {
    FETCH_TIME_SLOTS_BEGIN,
    FETCH_TIME_SLOTS_SUCCESS,
    FETCH_TIME_SLOTS_FAILURE,
    fetchTimeSlotsIfNeeded,
}