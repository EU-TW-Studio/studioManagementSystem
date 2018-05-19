import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Icon, List} from 'antd';
import ReactMarkdown from 'react-markdown';
import * as stationLog from '../../action/stationLog'
import "../../static/css/writeGrowthLog.css"

class GrowthLog extends Component {

    constructor() {
        super();
        this.state = {
            starStatus: 'star-o',
            numStars: 0,
            likeStatus: 'like-o',
            numLikes: 0,
            contentOmitted: "",
            contentExpansionStatus: false
        }
    }

    changeExpansionStatus() {
        this.setState({
            contentExpansionStatus: !this.state.contentExpansionStatus
        })
    }


    handleStar() {
        if (this.state.starStatus === 'star') {
            return;
        }
        let count = this.state.numStars;
        count++;
        this.setState({
            starStatus: "star",
            numStars: count
        })
        this.props.setStar({id:Number(document.cookie.split("=")[1])})
    }

    handleLike() {
        if (this.state.likeStatus === 'like') {
            return;
        }
        let count = this.state.numLikes;
        count++;
        this.setState({
            likeStatus: "like",
            numLikes: count
        })
    }

    handleMessage() {
        alert(123);
    }

    render() {

        let contentReg = /([\\#])/g;
        const item = this.props.growthLog;
        let incompleteContent = item.logContent.replace(contentReg, "")
        let contentDate = new Date();
        contentDate.setTime(Date.parse(item.releaseDate));
        const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
        );
        return (
            <List.Item
                style={{width: '100%', padding: 5}}
                actions={
                    [
                        <span onClick={this.handleStar.bind(this)}><IconText type={this.state.starStatus}
                                                                             text={this.state.numStars}/></span>,
                        <span onClick={this.handleLike.bind(this)}><IconText type={this.state.likeStatus}
                                                                             text={this.state.numLikes}/></span>,
                        <span onClick={this.handleMessage.bind(this)}><IconText type="message" text="2"/></span>,
                        <span onClick={this.changeExpansionStatus.bind(this)}>
                            <IconText type="file-word"
                                      text={this.state.contentExpansionStatus ? "收起文章" : "展开文章"}/></span>
                    ]}
            >
                <List.Item.Meta
                    className={this.state.contentExpansionStatus ? "" : "contentOmitted"}
                    description={
                        <Card title={item.logTitle}
                              extra={<p style={{color: "#878787"}}>
                                  <span>{this.props.userName}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span>{contentDate.toLocaleDateString()}</span></p>}
                              style={{width: '100%'}}>
                            <p>{this.state.contentExpansionStatus ?
                                <ReactMarkdown source={item.logContent}/> : incompleteContent}</p>
                        </Card>}
                />
            </List.Item>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setStar:(data) => dispatch(stationLog.setStar(data))
    }
}

export default connect(null, mapDispatchToProps)(GrowthLog);