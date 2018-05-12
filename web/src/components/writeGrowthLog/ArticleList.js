import React, {Component} from 'react';
import {Card, Row, Col, List} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import * as student from '../../action/student';
import {connect} from 'react-redux';

class ArticleList extends Component {

    getDisplaySpecifiedArticle(item) {
        this.props.setDisplaySpecifiedArticle(item.id);
        this.props.loadingOriginalTitle(item.logTitle, item.logContent);
    }

    render() {
        return (
            <div>
                <List
                    size="small"
                    bordered
                    dataSource={this.props.userInfo ? this.props.userInfo.stationRecord : {}}
                    renderItem={item => (
                        <List.Item><a onClick={this.getDisplaySpecifiedArticle.bind(this, item)}>{item.logTitle}</a></List.Item>)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        displaySpecifiedArticle: state.displaySpecifiedArticle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDisplaySpecifiedArticle: (id) => {
            dispatch(student.setDisplaySpecifiedArticle(id));
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(ArticleList);
