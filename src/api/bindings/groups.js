import requests from "../request";

const ApiPrefix = "groups";

const Groups = {
    search: request =>
        requests.rawGet(`${ApiPrefix}/search/${request}`)
};

export default Groups;