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

        let stuList = this.props.studentList;

        let oldSortList = [];
        if (stuList.length !== 0) {
            stuList.map(item => {
                item.stationRecord.map(elem => {
                    oldSortList.push(Object.assign(elem, {username: item.username}));
                })
            })
        }

        let newSortList = oldSortList.sort((item, elem) => Number(elem.id) - Number(item.id));
        console.log(newSortList);

        return (
            <Card title={stuList.length === 1 ? `${stuList[0].username}的成长日志` : `成长日志内容`} extra={<a
                onClick={this.showAllArticles.bind(this)}>{this.props.individualStudentSelectedState === -1 ? "" : "全部显示"}</a>}
                  style={{margin: 5}}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={
                        {
                            onChange: (page) => {
                                console.log(page, "11");
                            },
                            pageSize: 5
                        }
                    }
                    dataSource={newSortList}
                    renderItem={item => (
                        <GrowthLog
                            growthLog={item}
                            userName={item.username}
                        />)
                    }
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