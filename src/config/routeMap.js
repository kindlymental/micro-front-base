import Loadable from 'react-loadable';
import Loading from '@/components/Loading'

const Dashboard = Loadable({ loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'), loading: Loading });
const Table = Loadable({ loader: () => import(/*webpackChunkName:'Table'*/'@/views/table'), loading: Loading });
const ExportExcel = Loadable({ loader: () => import(/*webpackChunkName:'ExportExcel'*/'@/views/excel/exportExcel'), loading: Loading });
const UploadExcel = Loadable({ loader: () => import(/*webpackChunkName:'UploadExcel'*/'@/views/excel/uploadExcel'), loading: Loading });
const Zip = Loadable({ loader: () => import(/*webpackChunkName:'Zip'*/'@/views/zip'), loading: Loading });
const Error404 = Loadable({ loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'), loading: Loading });
const User = Loadable({ loader: () => import(/*webpackChunkName:'User'*/'@/views/user'), loading: Loading });

export default [
  { path: "/dashboard", component: Dashboard, roles: ["admin"] },
  { path: "/table", component: Table, roles: ["admin"] },
  { path: "/excel/export", component: ExportExcel, roles: ["admin"] },
  { path: "/excel/upload", component: UploadExcel, roles: ["admin"] },
  { path: "/zip", component: Zip, roles: ["admin"] },
  { path: "/user", component: User, roles: ["admin"] },
  { path: "/error/404", component: Error404 },
];
