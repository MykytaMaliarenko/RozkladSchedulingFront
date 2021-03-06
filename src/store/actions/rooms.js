import api from '../../api'

export const FETCH_ALL_ROOMS_IN_BUILDING_BEGIN = "FETCH_ALL_ROOMS_IN_BUILDING_BEGIN";
export const fetchAllRoomsInBuildingBegin = (building) => ({
    type: FETCH_ALL_ROOMS_IN_BUILDING_BEGIN,
    building,
});

export const FETCH_ALL_ROOMS_IN_BUILDING_SUCCESS = "FETCH_ALL_ROOMS_IN_BUILDING_SUCCESS";
export const fetchAllRoomsInBuildingSuccess = (result) => ({
    type: FETCH_ALL_ROOMS_IN_BUILDING_SUCCESS,
    data: result,
});

export const FETCH_ALL_ROOMS_IN_BUILDING_FAILURE = "FETCH_ALL_ROOMS_IN_BUILDING_FAILURE";
export const fetchAllRoomsInBuildingFailure = (error) => ({
    type: FETCH_ALL_ROOMS_IN_BUILDING_FAILURE,
    error
});

export function fetchAllRoomsInBuildingIfNeeded(building) {
    return async (dispatch, getState) => {
        let lastFetchedBuilding = getState().rooms.building;
        if (lastFetchedBuilding === building)
            return;

        dispatch(fetchAllRoomsInBuildingBegin(building));

        let result;
        try {
            result = await api.Rooms.getAllRooms(building);
        } catch (error) {
            dispatch(fetchAllRoomsInBuildingFailure(error));
        }

        if (result)
            dispatch(fetchAllRoomsInBuildingSuccess(result));
    }
}

export const FETCH_ALL_BUILDINGS_BEGIN = "FETCH_ALL_BUILDINGS_BEGIN";
export const fetchAllBuildingsBegin = () => ({
    type: FETCH_ALL_BUILDINGS_BEGIN
});

export const FETCH_ALL_BUILDINGS_SUCCESS = "FETCH_ALL_BUILDINGS_SUCCESS";
export const fetchAllBuildingsSuccess = (buildings) => ({
    type: FETCH_ALL_BUILDINGS_SUCCESS,
    buildings
});

export const FETCH_ALL_BUILDINGS_FAILURE = "FETCH_ALL_BUILDINGS_FAILURE";
export const fetchAllBuildingsFailure = (error) => ({
    type: FETCH_ALL_BUILDINGS_FAILURE,
    error
});

export function fetchAllBuildingsIfNeeded() {
    return async (dispatch, getState) => {
        let buildings = getState().rooms.buildings.data;
        if (buildings.length === 0) {
            dispatch(fetchAllBuildingsBegin());

            let result;
            try {
                result = await api.Rooms.getAllBuildings();
            } catch (error) {
                dispatch(fetchAllBuildingsFailure(error));
            }

            if (result)
                dispatch(fetchAllBuildingsSuccess(result));
        }
    }
}

export const FETCH_FREE_ROOMS_BEGIN = "FETCH_FREE_ROOMS_BEGIN";
export const fetchFreeRoomsBegin = (building) => ({
    type: FETCH_FREE_ROOMS_BEGIN,
    building
});

export const FETCH_FREE_ROOMS_SUCCESS = "FETCH_FREE_ROOMS_SUCCESS";
export const fetchFreeRoomsSuccess = (building, data) => ({
    type: FETCH_FREE_ROOMS_SUCCESS,
    building,
    data
});

export const FETCH_FREE_ROOMS_FAILURE = "FETCH_FREE_ROOMS_FAILURE";
export const fetchFreeRoomsFailure = (error) => ({
    type: FETCH_FREE_ROOMS_FAILURE,
    error
});

export function fetchFreeRoomsInBuildingIfNeeded(building) {
    return async (dispatch, getState) => {
        let data = getState().rooms.freeRoomsByBuilding.data;
        if (!(building in data)) {
            dispatch(fetchFreeRoomsBegin(building));

            let result;
            try {
                result = await api.Rooms.getFreeRooms(building);
            } catch (error) {
                dispatch(fetchFreeRoomsFailure(error));
            }

            if (result)
                dispatch(fetchFreeRoomsSuccess(building, result));
        }
    }
}

export default {
    FETCH_ALL_ROOMS_IN_BUILDING_BEGIN,
    FETCH_ALL_ROOMS_IN_BUILDING_SUCCESS,
    FETCH_ALL_ROOMS_IN_BUILDING_FAILURE,
    fetchAllRoomsInBuildingIfNeeded,

    FETCH_ALL_BUILDINGS_BEGIN,
    FETCH_ALL_BUILDINGS_SUCCESS,
    FETCH_ALL_BUILDINGS_FAILURE,
    fetchAllBuildingsIfNeeded,

    FETCH_FREE_ROOMS_BEGIN,
    FETCH_FREE_ROOMS_SUCCESS,
    FETCH_FREE_ROOMS_FAILURE,
    fetchFreeRoomsInBuildingIfNeeded
}