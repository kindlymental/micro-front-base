import React, { Component, Fragment } from "react";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import { getMenuItemInMenuListByProperty } from "@/utils";
import routeList from "@/config/routeMap";
import menuList from "@/config/menuConfig";

const microLibraryList = [
  'base', 'react', 'child'
]

class LayoutContent extends Component {
  
  render() {
    const { location } = this.props;
    const { pathname } = location;
    const { Content } = Layout;

    const getPageTitle = (menuList, pathname) => {
      let title = "管理平台";
      let item = getMenuItemInMenuListByProperty(menuList, "path", pathname);
      if (item) {
        title = `${item.title} - 管理平台`;
      }
      return title;
    };
    const isMicro = microLibraryList.map(item => {
      return pathname.indexOf(item) != -1
    })

    console.log(isMicro.includes(true));

    return (
      isMicro.includes(true) ? <div id="frame"></div> :
      
      <DocumentTitle title={getPageTitle(menuList, pathname)}>
        <Content style={{ height: "calc(100% - 100px)" }}>
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={500}
              classNames="fade"
              exit={false}
            >
              <Switch location={location}>
                <Redirect exact from="/" to="/dashboard" />
                {
                  routeList.map((route) => {
                    return (
                      (
                        <Route
                          component={route.component}
                          key={route.path}
                          path={route.path}
                        />
                      )
                    );
                  })
                }
                }
            <Redirect to="/error/404" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Content>
      </DocumentTitle>
    );
  }
};

export default connect((state) => state.user)(withRouter(LayoutContent));
