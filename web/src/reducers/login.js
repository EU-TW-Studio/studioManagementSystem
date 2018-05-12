const LANDING_JUDGMENT = "LANDING_JUDGMENT";

export default function (state={isLogin:false,userInfo:[]},action) {
    console.log(action, "action中");
    switch (action.type) {
        case LANDING_JUDGMENT:
            return {...state,isLogin:action.content.isLogin,userInfo:action.content};
        default:
            return state;
    }
}