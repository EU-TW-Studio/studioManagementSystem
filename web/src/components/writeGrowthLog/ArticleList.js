import React, {Component} from 'react';
import {Card, Row, Col, List, Button, Icon} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import * as student from '../../action/student';
import {connect} from 'react-redux';
import * as stationLogAction from "../../action/stationLog";

class ArticleList extends Component {
    static defaultProps = {
        currentEditArticleTitle: "",
    };

    constructor() {
        super();
        this.state = {
            newArticle: false,
            stationRecord: [],
        }
    }

    componentWillMount() {
        let stationRecord = this.props.userInfo ? this.props.userInfo.stationRecord : [];
        this.setState({
            stationRecord: stationRecord
        })
    }

    getDisplaySpecifiedArticle(item) {
        this.props.setDisplaySpecifiedArticle(item.id);
        this.setState({
            currentEditArticleId: item.id
        });
        this.props.loadingOriginalTitle(item.logTitle, item.logContent);
    }

    newArticle() {
        if (this.props.isLogin) {
            this.props.setDisplaySpecifiedArticle(-2);
            this.props.getNewArticle({type: "success", msg: "", title: new Date().toLocaleString(), content: ""}, true);
            this.props.getCurrentEditArticleTitle(new Date().toLocaleString());
            this.setState({
                newArticle: true
            });
        } else {
            this.props.getNewArticle({type: "warning", msg: "请登陆之后在操作"}, false);
        }
    }

    render() {
        let userInfo = this.props.userInfo ? this.props.userInfo : {};
        const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
        );
        return (
            <div>
                <List
                    header={<Button onClick={this.newArticle.bind(this)}>
                        <IconText type="plus" text="新建文章"/>
                    </Button>}
                    size="small"
                    bordered
                    dataSource={userInfo.stationRecord}
                    renderItem={item => (
                        <List.Item><a
                            onClick={this.getDisplaySpecifiedArticle.bind(this, item)}>{item.logTitle}</a></List.Item>)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let userInfo = state.StationLog.studentList.find(v => v.id === Number(document.cookie.split("=")[1]));
    return {
        userInfo: userInfo,
        displaySpecifiedArticle: state.Student.displaySpecifiedArticle,
        isLogin: state.Login.isLogin,
        currentEditArticleTitle: state.StationLog.currentEditArticleTitle,
        studentInfo: state.Login.userInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDisplaySpecifiedArticle: (id) => {
            dispatch(student.setDisplaySpecifiedArticle(id));
        },
        getCurrentEditArticleTitle: (currentTitle) => {
            dispatch(stationLogAction.setCurrentEditArticleTitle(currentTitle));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
