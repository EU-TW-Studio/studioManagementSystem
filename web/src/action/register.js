import * as request from '../request/request';
import * as StatusCode from '../constants/StatusCode'

export const regisrter = (content) => {
    return {
        type: 'REGISTER',
        content
    }
};

export const toRegister = (data, callback) => {
    return dispatch => {
        request.post(`/api/register`, data)
            .then(result => {
                if (result.status === StatusCode.OK) {
                    callback(result.data);
                }
            })
    }
};

