import * as request from '../request/request';
import * as StatusCode from '../constants/StatusCode'

export const landingJudgment = (content) => {
    if (Object.keys(content).length === 0) {
        Object.assign(content,{isLogin: false});
    }else {
        Object.assign(content,{isLogin: true});
    }
    return {
        type: "LANDING_JUDGMENT",
        content
    };
};

export const getLandingInfo = (data,callback) => {
    return dispatch => {
        request.get(`/api/user?username=${data.username}&password=${data.password}`,)
            .then(result => {
                if (result.status === StatusCode.OK) {
                    dispatch(landingJudgment(result.data));
                }
                callback();
            })
    }
}