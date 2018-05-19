import React, {Component} from 'react';
import {withRouter,Redirect} from 'react-router-dom';
import {Button, Menu, Dropdown, Icon, Modal, Popconfirm, message} from 'antd';


class UserInfo extends Component {
    constructor() {
        super();
        this.delCookie = this.delCookie.bind(this);
    }


    delCookie() {
        alert(123);
        // document.cookie = `userid='';path=/`
    }

    confirm(e) {
        console.log(e);
        message.success('退出成功');
        document.cookie = `userid='';path=/`;
        window.location.reload();
    }

    cancel(e) {
        console.log(e);
        message.warning('回到当前页面');
    }


    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1">个人中心</Menu.Item>
                {/*<Menu.Item key="3"><Button type="primary" onClick={this.delCookie}>退出</Button></Menu.Item>*/}
                <Menu.Item key="3">
                    <Popconfirm title="你确定要退出吗?" onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)}
                                okText="Yes" cancelText="No">
                        退出
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        );
        return <div>
            <Dropdown overlay={menu}>
                <Button>
                    {this.props.userInfo.username}<Icon type="down"/>
                </Button>
            </Dropdown>
        </div>
    }
}

export default withRouter(UserInfo);