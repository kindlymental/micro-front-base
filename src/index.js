import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "@/styles/index.less";
import "./mock";
import "@/lib/monitor";
import { AliveScope } from "react-activation";
import { registerMicroApps, start } from "qiankun";

function render() {
  const container = document.getElementById("my-root");
  ReactDOM.render(
    <AliveScope>
      <App />
    </AliveScope>,
    container
  );
}

render({});

registerMicroApps([
  {
    name: "child",
    entry: "//localhost:8001",
    container: "#frame",
    activeRule: "/child"
  },
  {
    name: "react",
    entry: "//localhost:10100",
    container: "#frame",
    activeRule: "/react"
  }, 
  {
    name: "ejectreact",
    entry: "//localhost:9003",
    container: "#frame",
    activeRule: "/ejectreact"
  }
]);

start();
