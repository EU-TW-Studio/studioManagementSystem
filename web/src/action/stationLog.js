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

export const setArticlePublishingStatus = (content) => {
    console.log(content,"setArticlePublishingStatus 该函数被执行");
    return {
        type: "ARTICLE_PUBLISHING_STATUS",
        content
    }
}

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
                console.log(result, "restltt0......................");
                    if (result.status === StatusCode.OK) {
                        dispatch(allStationLogList(result.data));
                    }
                }
            )
    }
};

export const saveGrowthLogAction = (growthLogInfo) => {

    if (growthLogInfo.id === -2) {
        return dispatch => {
            request.post(`/api/articles/`, growthLogInfo)
                .then(result => {
                    if (result.status === StatusCode.OK) {
                        dispatch(getStationLogList());
                    }
                })
        };
    }else {
        return dispatch => {
            request.put(`/api/articles/`, growthLogInfo)
                .then(result => {
                    if (result.status === StatusCode.OK) {
                        dispatch(getStationLogList());
                    }
                })
        };
    }


};