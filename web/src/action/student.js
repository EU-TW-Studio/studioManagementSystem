import * as request from '../request/request';
import * as StatusCode from '../constants/StatusCode'

export const setCurrentlySelectedStudents = (content) => {
    return {
        type: "SET_CURRENTLY_SELECTED_STUDENTS",
        content
    };
};

export const setDisplaySpecifiedArticle = (content) => {
    return {
        type: "SET_DISPLAY_SPECIFIED_ARTICLE",
        content
    }
};