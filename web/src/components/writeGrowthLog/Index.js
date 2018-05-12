import React, {Component} from 'react';
import {Button, Card, Col, Row, Input, Form, Alert} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../static/css/writeGrowthLog.css'
import ArticleList from './ArticleList';
import EditArticles from './EditArticles';
import EditArticlesByMarkdown from './EditArticlesByMarkdown';
import * as stationLogAction from "../../action/stationLog";


class Index extends Component {
    static defaultProps = {
        isLogin: false
    }

    constructor() {
        super();
        this.state = {
            editContent: "",
            editContentTitle: "",
            loading: false,
            iconLoading: false,
            selectViewOne: true,
            selectViewOneWidth: 8,
            selectViewTwo: true,
            selectViewTwoWidth: 16,
            selectViewThr: false,
            selectViewThrWidth: 12,
            roleName: "预览",
            messageText: "",
            typeText: "success"
        };
    }

    enterLoading = () => {
        if (!this.props.isLogin) {
            this.setState({
                messageText: "请登陆后发表文章",
                typeText: "warning"
            });
            return;
        } else {
            if (!this.state.editContentTitle) {
                this.setState({
                    messageText: "文章标题不能为空",
                    typeText: "warning"
                });
                return;
            }
            if (!this.state.editContent) {
                this.setState({
                    messageText: "文章内容不能为空",
                    typeText: "warning"
                });
                return;
            }
        }
        let stationRecord = {
            logContent: this.state.editContent,
            logTitle: this.state.editContentTitle,
            userId: this.props.userInfo.id
        };
        this.props.saveGrowthLog(stationRecord);
    };

    getEditContent(e) {
        this.setState({
            editContent: e
        });
    }

    selectView() {
        let whetherToPreviewThr = this.state.selectViewThr;
        let whetherToPreviewOne = this.state.selectViewOne;
        this.setState(
            {
                selectViewThr: !whetherToPreviewThr,
                selectViewOne: !whetherToPreviewOne,
                selectViewTwoWidth: whetherToPreviewThr ? 16 : 12,
                roleName: whetherToPreviewThr ? "预览" : "关闭预览"
            })
    }



    getArticleTitle(e) {
        if (e.target.value) {
            this.setState({
                editContentTitle: e.target.value,
                messageText: "",
                typeText: "success"
            })
        } else {
            this.setState({
                messageText: "文章标题不能为空",
                typeText: "warning"
            })
        }
    }

    loadingOriginalTitle(title,content){
        this.setState({
            editContentTitle: title,
            editContent:content
        })
    }

    render() {


        return (
            <div>
                <Row>
                    {this.state.typeText === 'success' ? "" :
                        <Alert message={this.state.messageText}
                               type={this.state.typeText}
                               showIcon
                               style={{width: '30%', float: 'left', marginLeft: 5}}
                        />}
                    <Button className="postButton" type="primary" loading={this.state.loading}
                            onClick={this.enterLoading.bind(this)}>
                        发布
                    </Button>
                </Row>
                <Row>
                    {
                        this.state.selectViewOne ? <Col span={this.state.selectViewOneWidth}>
                            <Card title="成长日志列表" extra={<a href="#">More</a>} style={{margin: 5}}>
                                <ArticleList userInfo={this.props.userInfo}
                                             loadingOriginalTitle={this.loadingOriginalTitle.bind(this)}/>
                            </Card>
                        </Col> : ""
                    }

                    {
                        this.state.selectViewTwo ? <Col span={this.state.selectViewTwoWidth}>
                            <Card
                                title={<Input
                                    style={{width: '60%', height: '100%'}}
                                    onChange={this.getArticleTitle.bind(this)}
                                    placeholder="ArticleTitle"
                                    value={this.state.editContentTitle}
                                />}

                                extra={<a onClick={this.selectView.bind(this)}>{this.state.roleName}</a>}
                                style={{margin: 5, padding: 0}}>
                                <EditArticles articleContent={this.state.editContent}
                                              getEditContent={this.getEditContent.bind(this)}/>
                            </Card>
                        </Col> : ""
                    }

                    {
                        this.state.selectViewThr ? <Col span={this.state.selectViewThrWidth}>
                            <Card title="预览" extra={<a href="#">More</a>} style={{margin: 5}}>
                                <EditArticlesByMarkdown editContent={this.state.editContent}/>
                            </Card>
                        </Col> : ""
                    }
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.Login.userInfo,
        isLogin: state.Login.isLogin,
        displaySpecifiedArticle: state.Student.displaySpecifiedArticle
    }
};

const mapDispatchProps = (dispatch) => {
    return {
        saveGrowthLog: (growthLogInfo) => {
            dispatch(stationLogAction.saveGrowthLogAction(growthLogInfo))
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchProps)(Index));