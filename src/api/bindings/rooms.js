import requests from "../request";

const ApiPrefix = "rooms";

const Rooms = {
    getAllBuildings: () =>
        requests.get(`${ApiPrefix}/buildings`),

    getAllRooms: (building) => {
        return requests.get(`${ApiPrefix}/building/${building}`)
    },

    getFreeRooms: (building) => {
        return requests.get(`${ApiPrefix}/free/building/${building}`)
    }
}

export default Rooms;