import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Avatar, Icon, Button, Spin, Card} from 'antd';
import ReactMarkdown from 'react-markdown';
import * as stationLog from '../../action/stationLog';
import PropTypes from 'prop-types';
import "../../static/css/writeGrowthLog.css"
import StationLog from "../../reducers/stationLog";

class GrowthLog extends Component {

    constructor() {
        super();
        this.state = {
            contentOmitted: "",
            contentExpansionStatus: false
        }
    }


    changeExpansionStatus() {
        this.setState({
            contentExpansionStatus: !this.state.contentExpansionStatus
        })
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
                        <IconText type="star-o" text="156"/>,
                        <IconText type="like-o" text="156"/>,
                        <IconText type="message" text="2"/>,
                        <span onClick={this.changeExpansionStatus.bind(this)}>
                            <IconText type="file-word"
                                      text={this.state.contentExpansionStatus?"收起文章":"展开文章"}/></span>
                    ]}
            >
                <List.Item.Meta
                    className={this.state.contentExpansionStatus ? "" : "contentOmitted"}
                    description={
                        <Card title={item.logTitle}
                              extra={<p style={{color: "#878787"}}><span>{this.props.userName}</span>&nbsp;&nbsp;&nbsp;&nbsp;
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

export default GrowthLog;