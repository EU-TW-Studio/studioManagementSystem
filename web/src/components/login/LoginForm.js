import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, Alert} from 'antd';
import * as login from '../../action/login';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../../static/css/login.css'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    constructor() {
        super();
        this.state = {
            isLogin: 0
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.getLandingState(values, () => {
                    this.setState({isLogin: 1})
                });
            }
        });
    };

    render() {
        if (this.props.isLogin) {
            this.props.history.push("/stationLog");
        }
        let width = window.innerWidth / 3;
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form"
                  style={{width: width, margin: "auto", marginTop: width / 3}}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入学号或者用户名登陆!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username or Student ID"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {this.state.isLogin === 1 ? <Alert message="用户名或密码输入错误" type="error"/> : ""}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.Login.isLogin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLandingState: (data, callback) => {
            dispatch(login.getLandingInfo(data, callback));
        }
    }
};

const LoginForm = Form.create()(NormalLoginForm);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
