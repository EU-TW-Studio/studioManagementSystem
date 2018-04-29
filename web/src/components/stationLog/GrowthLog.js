import React, {Component} from 'react';
import {List, Avatar, Icon, Button, Spin} from 'antd';
import PropTypes from 'prop-types'

class GrowthLog extends Component {

    render() {
        const item = this.props.growthLog;
        const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
        );
        return (
            <List.Item
                key={item.title}
                actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                    <IconText type="message" text="2"/>]}
                extra={<img width={272} alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar}/>}
                    title={<a href={item.href}>{item.logTitle}</a>}
                    description={item.description}
                />
                {item.logContent}
            </List.Item>
        )
    }
}

export default GrowthLog;