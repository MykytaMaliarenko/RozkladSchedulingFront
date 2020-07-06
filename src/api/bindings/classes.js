import requests from "../request";

const ApiPrefix = "classes";

const Classes = {
    getByGroup: group =>
        requests.get(`${ApiPrefix}/group/${group}`),
};

export default Classes;