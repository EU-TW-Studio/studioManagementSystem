import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {List, Avatar, Button, Spin} from 'antd';
import * as student from '../../action/student';
import GrowthLogList from './GrowthLogList';


class Student extends Component {

    constructor() {
        super();
        this.state = {
            individualStudentSelectedState: ""
        }
    }

    getCurrentlySelectedStudents() {
        this.props.setCurrentlySelectedStudents(this.props.student.id);
    }

    render() {
        const data = this.props.student;
        return (
            <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title={<a onClick={this.getCurrentlySelectedStudents.bind(this)}>{data.username}</a>}
                description={data.studentSkill}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        individualStudentSelectedState: state.individualStudentSelectedState
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentlySelectedStudents: (studentId) => {
            dispatch(student.setCurrentlySelectedStudents(studentId));
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Student);