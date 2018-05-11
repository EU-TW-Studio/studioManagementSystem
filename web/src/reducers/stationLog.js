//action types
const INIT_STUDENT_LIST = "INIT_STUDENT_LIST";
const INIT_STATION_LOG_LIST = "INIT_STATION_LOG_LIST";
const LIST_CONTENT_EXPAND_STATUS = "LIST_CONTENT_EXPAND_STATUS";

//reducer
export default function (state = {studentList: []}, action) {
    switch (action.type) {
        case INIT_STUDENT_LIST:
            return {...state,studentList:action.content};
        default:
            return state;
    }
}

//action creators
export const initStudentList = (studentList) => {
    return {type: INIT_STUDENT_LIST, studentList};
};

export const initStationLogList = (stationLogList) => {
    return {type: INIT_STATION_LOG_LIST, stationLogList};
};