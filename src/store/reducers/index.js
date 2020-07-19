import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import timeSlots from "./timeSlots";
import classes from "./classes";
import groups from "./groups";
import rooms from "./rooms";


export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    timeSlots,
    classes,
    groups,
    rooms
});