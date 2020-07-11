import requests from "../request";

const ApiPrefix = "timeslots"

const TimeSlots = {
    getAll: () =>
        requests.get(`${ApiPrefix}/`),
}

export default TimeSlots;