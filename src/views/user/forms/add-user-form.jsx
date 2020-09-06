import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";
import { reqValidatUserID } from "@/api/user";
import userJson from "../user.json";

const { TextArea } = Input;
class AddUserForm extends Component {
  state = {
    userJson: userJson,
  };

  validatUserID = async (rule, value, callback) => {
    if (value) {
      if (!/^[a-zA-Z0-9]{1,6}$/.test(value)) {
        callback("用户ID必须为1-6位数字或字母组合");
      }
      let res = await reqValidatUserID(value);
      const { status } = res.data;
      if (status) {
        callback("该用户ID已存在");
      }
    } else {
      callback("请输入用户ID");
    }
    callback();
  };
  render() {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="新增"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          {this.state.userJson.formList.map((item) =>
            item.type === "input" ? (
              <Form.Item label={item.title} key={item.key}>
                {getFieldDecorator(item.key, {
                  rules: [
                    {
                      required: item.required,
                      validator: item.key == "id" ? this.validatUserID : null,
                      message: item.required == true ? item.placeholder : "",
                    },
                  ],
                })(<Input placeholder={item.placeholder} />)}
              </Form.Item>
            ) : item.type === "select" ? (
              <Form.Item label={item.title} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: item.options[0],
                })(
                  <Select style={{ width: 120 }}>
                    {item.options.map((option, index) => (
                      <Select.Option value={option} key={index}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            ) : item.type === "textArea" ? (
              <Form.Item label={item.title} key={item.key}>
                {getFieldDecorator(
                  item.key,
                  {}
                )(<TextArea rows={4} placeholder={item.placeholder} />)}
              </Form.Item>
            ) : null
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddUserForm" })(AddUserForm);
