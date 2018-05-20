import React, {Component} from 'react';
import {Card, Row, Col, List, Button, Icon, Timeline, Modal, message} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import * as student from '../../action/student';
import {connect} from 'react-redux';
import * as stationLogAction from "../../action/stationLog";
import '../../static/css/writeGrowthLog.css'


const confirm = Modal.confirm;


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
        let stationRecords = userInfo.stationRecord ? userInfo.stationRecord : [];
        let _this = this.props;
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
                >
                    <Timeline style={{padding: 10}}>
                        {stationRecords.sort((i, e) => e.id - i.id).map((item, i) => {
                            return <Timeline.Item
                                key={i}>
                                <a className='article-title-list'
                                   onClick={this.getDisplaySpecifiedArticle.bind(this, item)}>
                                    {item.logTitle}
                                    <span style={{float: 'right'}}>
                                    ...{(item.releaseDate ? item.releaseDate : "").split("T")[0]}
                                        &nbsp;<Button onClick={() => Modal.confirm({
                                        title: '确定要1删除这篇文章吗?',
                                        content: '点击OK按钮后，该对话框将在1秒后关闭',
                                        onOk() {
                                            return new Promise((resolve, reject) => {
                                                _this.deleteArticle(item.id);
                                                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                            }).catch(() => message.success('删除文章成功'));
                                        },
                                        onCancel() {
                                            message.success('取消删除');
                                        },
                                    })}
                                                      className='del-article' size='small'
                                                      type="danger">删除</Button>
                                </span>
                                </a>
                            </Timeline.Item>
                        })}
                    </Timeline>
                </List>
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
        deleteArticle: (id) => {
            dispatch(stationLogAction.deleteArticle(id));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
