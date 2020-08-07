import requests from "../request";

const ApiPrefix = "teachers";

const Teachers = {
    search: query =>
        requests.rawGet(`${ApiPrefix}/search/${query}`)
};

export default Teachers;