import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin, Checkbox } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";
import logoImg from "@/assets/images/logo-p.png";
import GlobalFooter from '@/components/GlobalFooter';

const Login = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("登录成功");
        handleUserInfo(data.token);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  // 获取用户信息
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => { })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("检验失败!");
      }
    });
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <DocumentTitle title={"跨行资金管理平台"}>
      <div className="login-container">
          <Form onSubmit={handleSubmit} className="content">
            <div className='title-logo'>
              <img src={logoImg} alt="logo" />
            </div>
            <div className="title">
              <a>跨行资金管理平台</a>
            </div>
            <Spin spinning={loading} tip="登录中...">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入账户名！",
                    },
                  ],
                  initialValue: "", // 初始值
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入登录账号"
                    size="large"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入密码！",
                    },
                  ],
                  initialValue: "", // 初始值
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="请输入密码"
                    size="large"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Checkbox>自动登录</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                >
                  登录
              </Button>
              </Form.Item>
            </Spin>
          </Form>
          <GlobalFooter className="footer-view"
              copyright={
                <div>
                  Copyright <Icon type="copyright" /> 2018 交通银行股份有限公司
                </div>
              }
            />
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);
