import React, {Component} from 'react';
import {Card, Row, Col, List, Button, Icon} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import * as student from '../../action/student';
import {connect} from 'react-redux';

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
            this.setState({
                newArticle: true
            });
            let currentTitle = this.props.currentEditArticleTitle === "" ? new Date().toLocaleString() : this.props.currentEditArticleTitle;
            let newStationRecord = this.state.stationRecord.splice(0, 0, {
                id: -2,
                logTitle: currentTitle,
                logContent: ""
            });
            if (this.state.newArticle) {
                this.setState({
                    stationRecord: newStationRecord,
                });
            }
        } else {
            this.props.getNewArticle({type: "warning", msg: "请登陆之后在操作"}, false);
        }
    }

    render() {

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
                    dataSource={this.props.studentInfo.stationRecord}
                    renderItem={item => (
                        <List.Item><a
                            onClick={this.getDisplaySpecifiedArticle.bind(this, item)}>{item.logTitle}</a></List.Item>)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
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
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
