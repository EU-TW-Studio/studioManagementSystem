let SET_CURRENTLY_SELECTED_STUDENTS = "SET_CURRENTLY_SELECTED_STUDENTS";
let SET_DISPLAY_SPECIFIED_ARTICLE = "SET_DISPLAY_SPECIFIED_ARTICLE";

export default function (state={individualStudentSelectedState:-1},action) {
    switch (action.type) {
        case SET_CURRENTLY_SELECTED_STUDENTS:
            return {...state, individualStudentSelectedState: action.content};
        case SET_DISPLAY_SPECIFIED_ARTICLE:
            return {...state, displaySpecifiedArticle: action.content};
        default:
            return state;
    }
}