import * as request from '../request/request';
import * as StatusCode from '../constants/StatusCode'

export const allStationLogList = (content) => {
    return {
        type: "INIT_STUDENT_LIST",
        content
    };
};

export const setShowAllArticlesStatus = (content) => {
    return {
        type: "SET_CURRENTLY_SELECTED_STUDENTS",
        content
    }
};

export const setCurrentEditArticleTitle = (content) => {
    return {
        type: "SET_CURRENT_EDIT_ARTICLE_TITLE",
        content
    }
}

export const getStationLogList = () => {
    return dispatch => {
        request.get(`/api/users`)
            .then(result => {
                    if (result.status === StatusCode.OK) {
                        dispatch(allStationLogList(result.data));
                    }
                }
            )
    }
};

export const saveGrowthLogAction = (growthLogInfo,callback) => {
    if (growthLogInfo.id === -2) {
        return dispatch => {
            request.post(`/api/articles/`, growthLogInfo)
                .then(result => {
                    if (result.status === StatusCode.OK) {
                        dispatch(getStationLogList());
                        callback();
                    }
                })
        };
    }else {
        return dispatch => {
            request.put(`/api/articles/`, growthLogInfo)
                .then(result => {
                    if (result.status === StatusCode.OK) {
                        dispatch(getStationLogList());
                        callback();
                    }
                })
        };
    }


};