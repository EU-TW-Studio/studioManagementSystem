import React, {Component} from 'react';
import GrowthLog from './GrowthLog'
import {connect} from 'react-redux';
import {List, Card, Row, Col} from 'antd';
import * as stationLog from '../../action/stationLog';

class GrowthLogList extends Component {

    constructor(props) {
        super(props);
    }

    showAllArticles() {
        this.props.getShowAllArticlesStatus(-1);
    }

    render() {

        const pagination = {
            pageSize: 5,
        };

        return (
            <Card title="成长日志内容" extra={<a
                onClick={this.showAllArticles.bind(this)}>{this.props.individualStudentSelectedState === -1 ? "" : "全部显示"}</a>}
                  style={{margin: 5}}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={
                        {
                            onChange: (page) => {
                                console.log(page,"11");
                            },
                            pageSize: 5
                        }
                    }
                    dataSource={this.props.studentList}
                    renderItem={item => (
                        item.stationRecord.map((elem, i) =>
                            <GrowthLog
                                growthLog={elem}
                                userName={item.username}
                                key={i}/>)
                    )}
                />
            </Card>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        individualStudentSelectedState: state.Student.individualStudentSelectedState
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getShowAllArticlesStatus: (status) => {
            dispatch(stationLog.setShowAllArticlesStatus(status));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrowthLogList);