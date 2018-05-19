import React from 'react'
import * as stationLog from "./action/stationLog";
import {connect} from 'react-redux'

class AuthRoute extends React.Component {
    componentDidMount() {
        if (document.cookie.length > 0) {
            console.log(document.cookie, "缓存id");
            this.props.initStationLogList;
        }
    }

    render() {
        return (
            <div/>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initStationLogList:dispatch(stationLog.getStationLogList())
    };
}

export default connect(null, mapDispatchToProps)(AuthRoute)