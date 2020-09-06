import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";
import userJson from "../user.json";

const { TextArea } = Input;
class EditUserForm extends Component {
  state = {
    userJson: userJson,
  };

  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      currentRowData,
    } = this.props;
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
        title="编辑"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          {this.state.userJson.formList.map((item) =>
            // 不可编辑
            item.enableEdit === false ? (
              <Form.Item label={item.title} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: currentRowData[item.key],
                })(<Input disabled />)}
              </Form.Item>
            ) : // input
            item.type === "input" ? (
              <Form.Item label={item.title} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: currentRowData[item.key],
                  rules: [
                    {
                      required: item.required,
                      validator: item.key == "id" ? this.validatUserID : null,
                      message: item.required == true ? item.placeholder : "",
                    },
                  ],
                })(<Input placeholder={item.placeholder} />)}
              </Form.Item>
            ) : // 多选框
            item.type === "select" ? (
              <Form.Item label={item.title} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: currentRowData[item.key],
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
            ) : // 文本框textArea
            item.type === "textArea" ? (
              <Form.Item label={item.title} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: currentRowData[item.key],
                })(<TextArea rows={4} placeholder={item.placeholder} />)}
              </Form.Item>
            ) : null
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditUserForm" })(EditUserForm);
