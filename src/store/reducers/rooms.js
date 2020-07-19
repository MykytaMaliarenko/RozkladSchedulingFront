import {
    FETCH_ALL_ROOMS_IN_BUILDING_BEGIN,
    FETCH_ALL_ROOMS_IN_BUILDING_SUCCESS,
    FETCH_ALL_ROOMS_IN_BUILDING_FAILURE,
    FETCH_ALL_BUILDINGS_BEGIN,
    FETCH_ALL_BUILDINGS_FAILURE,
    FETCH_ALL_BUILDINGS_SUCCESS,
} from "../actions/rooms";

const defaultState = {
    buildings: {
        isFetching: false,
        hasError: false,

        data: [],
    },

    roomsByBuilding: {
        isFetching: false,
        hasError: false,

        building: null,
        data: [],
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_ALL_BUILDINGS_BEGIN:
            return {
                ...state,
                buildings: {
                    isFetching: true,
                    hasError: false
                }
            }

        case FETCH_ALL_BUILDINGS_SUCCESS:
            return {
                ...state,
                buildings: {
                    isFetching: false,

                    data: action.buildings
                }
            }

        case FETCH_ALL_BUILDINGS_FAILURE:
            return {
                ...state,
                buildings: {
                    isFetching: false,
                    hasError: true
                }
            }

        case FETCH_ALL_ROOMS_IN_BUILDING_BEGIN:
            return {
                ...state,
                roomsByBuilding: {
                    ...state.rooms,

                    isFetching: true,
                    hasError: false,

                    building: action.building,
                    data: [],
                }
            }

        case FETCH_ALL_ROOMS_IN_BUILDING_SUCCESS:
            return {
                ...state,
                roomsByBuilding: {
                    ...state.rooms,

                    isFetching: false,
                    hasError: false,

                    data: action.data,
                }
            }

        case FETCH_ALL_ROOMS_IN_BUILDING_FAILURE:
            return {
                ...state,
                roomsByBuilding: {
                    ...state.rooms,

                    isFetching: false,
                    hasError: true,
                }
            }

        default:
            return state;
    }
}