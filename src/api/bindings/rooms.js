import requests from "../request";

const ApiPrefix = "rooms";

const Rooms = {
    getAllBuildings: () =>
        requests.get(`${ApiPrefix}/buildings`),

    getAllRooms: (building) => {
        return requests.get(`${ApiPrefix}/building/${building}`)
    },
}

export default Rooms;