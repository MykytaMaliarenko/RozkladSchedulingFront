import requests from "../request";

const ApiPrefix = "classes";

const Classes = {
    getByGroup: group =>
        requests.get(`${ApiPrefix}/group/${group}`),
    
    getByRoom: room =>
        requests.get(`${ApiPrefix}/room/${room}`),

    getByTeacher: teacher =>
        requests.get(`${ApiPrefix}/teacher/${teacher}`),
};

export default Classes;