import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.mode === 'development' ?
    process.env["REACT_APP_API_ROOT_DEV"] : process.env["REACT_APP_API_ROOT_PROD"];

const responseBody = res => res.body;

const requests = {
    get: url =>
        superagent
            .get(`${API_ROOT}/${url}`)
            .type('json')
            .withCredentials()
            .then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}/${url}`, body).withCredentials().then(responseBody),
};

export default requests;