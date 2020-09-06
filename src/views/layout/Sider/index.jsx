import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Logo from "./Logo";
import Menu from "./Menu";
const { Sider } = Layout;

const LayoutSider = (props) => {
  const { sidebarCollapsed, sidebarLogo } = props;
  return (
    <Sider
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
      width={276}
      style={{ zIndex: "10" }}
    >
      {sidebarLogo ? <Logo collapsed={sidebarCollapsed} /> : null}
      <Menu />
    </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.settings,
  };
};
export default connect(mapStateToProps)(LayoutSider);
