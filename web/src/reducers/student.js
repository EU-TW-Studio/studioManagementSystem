let SET_CURRENTLY_SELECTED_STUDENTS = "SET_CURRENTLY_SELECTED_STUDENTS";

export default function (state={individualStudentSelectedState:-1},action) {
    switch (action.type) {
        case SET_CURRENTLY_SELECTED_STUDENTS:
            return {...state, individualStudentSelectedState: action.content};
        default:
            return state;
    }
}