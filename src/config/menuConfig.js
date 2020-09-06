/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: "首页",
    path: "/dashboard",
    icon: "home",
    roles: ["admin"],
  },
  {
    title: "子应用8001",
    path: "/child/",
    icon: "home",
    roles: ["admin"],
    children: [
      {
        title: "首页",
        path: "/child/",
        roles: ["admin"],
      },
      {
        title: "表格",
        path: "/child/table",
        roles: ["admin"],
      },
    ],
  },
  {
    title: "子应用10010",
    path: "/react/",
    icon: "home",
    roles: ["admin"],
    children: [
      {
        title: "首页",
        path: "/react/",
        roles: ["admin"],
      },
      {
        title: "表格",
        path: "/react/list",
        roles: ["admin"],
      },
    ],
  },
  {
    title: "子应用9003",
    path: "/ejectreact",
    icon: "home",
    roles: ["admin"],
  },
  {
    title: "用户管理",
    path: "/user",
    icon: "usergroup-add",
    roles: ["admin"],
  },
  {
    title: "表格",
    path: "/table",
    icon: "table",
    roles: ["admin"],
  },
  {
    title: "Excel",
    path: "/excel",
    icon: "file-excel",
    roles: ["admin"],
    children: [
      {
        title: "导出Excel",
        path: "/excel/export",
        roles: ["admin"],
      },
      {
        title: "上传Excel",
        path: "/excel/upload",
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Zip",
    path: "/zip",
    icon: "file-zip",
    roles: ["admin"],
  },
];
export default menuList;
