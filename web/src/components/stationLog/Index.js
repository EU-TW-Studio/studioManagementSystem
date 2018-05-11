import React, {Component} from 'react';
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import StudentList from './StudentList';
import GrowthLogList from './GrowthLogList';
import * as studentListAction from '../../action/stationLog';

class Index extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.props.getStudentList();
    }

    render() {
        let studentListInfo = [];
        if (this.props.individualStudentSelectedState !== -1) {
            this.props.studentList.map(item => {
                if (this.props.individualStudentSelectedState === item.id) {
                    studentListInfo.push(item);
                }
            });
        }else {
            studentListInfo = this.props.studentList;
        }

        return (
            <div>
                <Row>
                    <Col span={8}><StudentList studentList={this.props.studentList}/></Col>
                    <Col span={16}><GrowthLogList studentList={studentListInfo}/></Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        studentList: state.StationLog.studentList,
        individualStudentSelectedState: state.Student.individualStudentSelectedState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStudentList: () => {
            dispatch(studentListAction.getStationLogList());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));