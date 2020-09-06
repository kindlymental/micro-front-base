import React, { Component } from "react";
import { Card, Button, Table, message, Divider } from "antd";
import { getUsers, deleteUser, editUser, addUser } from "@/api/user";
import TypingCard from "@/components/TypingCard";
import EditUserForm from "./forms/edit-user-form";
import AddUserForm from "./forms/add-user-form";
import userJson from "./user.json";

const { Column } = Table;
class User extends Component {
  state = {
    users: [],
    editUserModalVisible: false,
    editUserModalLoading: false,
    currentRowData: {},
    addUserModalVisible: false,
    addUserModalLoading: false,

    userJson: userJson,
  };
  getUsers = async () => {
    const result = await getUsers();
    const { users, status } = result.data;
    if (status === 0) {
      this.setState({
        users,
      });
    }
  };
  handleEditUser = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editUserModalVisible: true,
    });
  };

  handleDeleteUser = (row) => {
    const { id } = row;
    if (id === "admin") {
      message.error("不能删除管理员用户！");
      return;
    }
    deleteUser({ id }).then((res) => {
      message.success("删除成功");
      this.getUsers();
    });
  };

  handleEditUserOk = (_) => {
    const { form } = this.editUserFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editModalLoading: true });
      editUser(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            editUserModalVisible: false,
            editUserModalLoading: false,
          });
          message.success("编辑成功!");
          this.getUsers();
        })
        .catch((e) => {
          message.success("编辑失败,请重试!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editUserModalVisible: false,
      addUserModalVisible: false,
    });
  };

  handleAddUser = (row) => {
    this.setState({
      addUserModalVisible: true,
    });
  };

  handleAddUserOk = (_) => {
    const { form } = this.addUserFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addUserModalLoading: true });
      addUser(values)
        .then((response) => {
          form.resetFields();
          this.setState({
            addUserModalVisible: false,
            addUserModalLoading: false,
          });
          message.success("添加成功!");
          this.getUsers();
        })
        .catch((e) => {
          message.success("添加失败,请重试!");
        });
    });
  };
  componentDidMount() {
    this.getUsers();
  }
  render() {
    const { users } = this.state;
    const title = this.state.userJson.action.add.flag ? (
      <span>
        <Button type="primary" onClick={this.handleAddUser}>
          {this.state.userJson.action.add.title}
        </Button>
      </span>
    ) : null;

    return (
      <div className="app-container">
        <TypingCard
          title={this.state.userJson.title}
          source={this.state.userJson.description}
        />
        <br />
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={users} pagination={false}>
            {this.state.userJson.fieldList.map((item) => (
              <Column
                title={item.title}
                dataIndex={item.key}
                key={item.key}
                align="center"
              />
            ))}

            <Column
              title="操作"
              key="action"
              align="center"
              render={(text, row) => (
                <span>
                  {this.state.userJson.action.edit.flag ? (
                    <Button
                      type="primary"
                      shape="circle"
                      icon="edit"
                      onClick={this.handleEditUser.bind(null, row)}
                    />
                  ) : null}
                  <Divider type="vertical" />
                  {this.state.userJson.action.delete.flag ? (
                    <Button
                      type="primary"
                      shape="circle"
                      icon="delete"
                      onClick={this.handleDeleteUser.bind(null, row)}
                    />
                  ) : null}
                </span>
              )}
            />
          </Table>
        </Card>
        <EditUserForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) => (this.editUserFormRef = formRef)}
          visible={this.state.editUserModalVisible}
          confirmLoading={this.state.editUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditUserOk}
        />
        <AddUserForm
          wrappedComponentRef={(formRef) => (this.addUserFormRef = formRef)}
          visible={this.state.addUserModalVisible}
          confirmLoading={this.state.addUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddUserOk}
        />
      </div>
    );
  }
}

export default User;
