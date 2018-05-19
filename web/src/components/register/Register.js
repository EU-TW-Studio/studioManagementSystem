import React from 'react';
import {connect} from 'react-redux';
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Alert} from 'antd';
import '../../static/css/login.css'
import * as register from '../../action/register';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: '后端',
    label: '后端',
    children: [{
        value: 'java',
        label: 'java',
    }, {
        value: 'c/c++',
        label: 'c/c++',
    }, {
        value: 'python',
        label: 'python',
    }],
}, {
    value: '前端',
    label: '前端',
    children: [{
        value: 'react',
        label: 'react',
    }, {
        value: '小程序',
        label: '小程序'
    }],
}];

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        result: [],
        registerStatus: "",
        registerResult: "",
        registrationRequest: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.register(values, (data) => {
                    this.setState({
                        registerStatus: data.status,
                        registerResult: data.msg,
                        registrationRequest:true
                    })
                });
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleEmailSearch = (value) => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com', 'mail.com', 'msn.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({result});
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 12},
                sm: {span: 8},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 12,
                    offset: 0,
                },
                sm: {
                    span: 8,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const {result} = this.state;
        const children = result.map((email) => {
            return <Option key={email}>{email}</Option>;
        });

        return (
            <Form onSubmit={this.handleSubmit} style={{backgroundColor: "#F0F1F5", padding: 'auto'}}>
                <FormItem
                    {...formItemLayout}
                    label="学号">
                    {getFieldDecorator('studentId', {
                        rules: [{
                            required: true, message: '请输入学号'
                        }]
                    })(<Input placeholder="input your studentId"/>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: '请输入邮箱',
                        }],
                    })(
                        <AutoComplete
                            onSearch={this.handleEmailSearch}
                            placeholder="input your email"
                        >
                            {children}
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '确认输入密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              姓名&nbsp;
                            <Tooltip title="请输入你的真实姓名！">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入你的姓名!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </FormItem>
                {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="兴趣/方向"*/}
                {/*>*/}
                {/*{getFieldDecorator('hobbies', {*/}
                {/*initialValue: ['后端', 'java'],*/}
                {/*rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],*/}
                {/*})(*/}
                {/*<Cascader options={residences} />*/}
                {/*)}*/}
                {/*</FormItem>*/}
                <FormItem
                    {...formItemLayout}
                    label="电话号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: '请输入电话号码!'}],
                    })(
                        <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                    )}
                </FormItem>
                {
                    this.state.registrationRequest ? <FormItem {...formItemLayout} label="返回信息">
                        {this.state.registerStatus === "500" ?
                            <Alert message={this.state.registerResult} type="error"/> :
                            <Alert message={this.state.registerResult} type="success"/>}
                    </FormItem> : ""
                }

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (data, callback) => {
            dispatch(register.toRegister(data, callback));
        }
    }
};

const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default connect(null, mapDispatchToProps)(WrappedRegistrationForm);