import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../static/css/App.css';
import {Link, withRouter} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Icon, Row, Col, Tabs, message} from 'antd'
import Index from './stationLog/Index'
import UserInfo from "./login/UserInfo";

const {SubMenu} = Menu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Content, Footer, Sider} = Layout;

class App extends Component {
    constructor() {
        super();
        this.state = {
            current: 'mail',
            pathName: "文章列表"
        }
    }

    path(pathName) {
        this.setState({pathName});
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Layout>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{height: '100%', width: '100%', borderRight: 0, backgroundColor: "#F0F1F5"}}
                >
                    <Menu.Item key="home">
                        <Icon type="home" />
                        工作室管理
                    </Menu.Item>
                    <Menu.Item style={{float: "right", marginRight: 40}}>
                        {
                            this.props.isLogin ? <UserInfo userInfo={this.props.userInfo}/> :
                                <div>
                                    <Link to={'/login'} onClick={this.path.bind(this, "登陆")}>
                                        登陆
                                    </Link>
                                     &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <Link to={'/register'} onClick={this.path.bind(this, "注册")}>
                                        注册
                                    </Link>
                                </div>
                        }

                    </Menu.Item>
                </Menu>
                <Layout>
                    <Sider style={{background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0, backgroundColor: "#F0F1F5"}}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user"/>成长计划</span>}>
                                <Menu.Item key="1">
                                    <Link to={'/stationLog'} onClick={this.path.bind(this, "文章列表")}>
                                        <span>
                                    <Icon type="bars"/>文章列表</span></Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to={'/writeGrowthLog'} onClick={this.path.bind(this, "我的日志")}>
                                        <span>
                                    <Icon type="edit"/>写文章</span></Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.pathName}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.Login.isLogin,
        userInfo: state.Login.userInfo
    }
};

export default withRouter(connect(mapStateToProps)(App));
