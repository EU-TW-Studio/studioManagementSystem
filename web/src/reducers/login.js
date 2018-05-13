const LANDING_JUDGMENT = "LANDING_JUDGMENT";

export default function (state={isLogin:false,userInfo:[]},action) {
    switch (action.type) {
        case LANDING_JUDGMENT:
            return {...state,isLogin:action.content.isLogin,userInfo:action.content};
        default:
            return state;
    }
}