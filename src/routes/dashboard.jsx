import CustomersPage from 'views/Customers';
import DashboardPage from "views/Dashboard";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Expenses from "views/Expenses";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Employees from 'views/Employees';
import Orders from "views/Orders";

import {
  Dashboard,
  Person,
  ContentPaste,
  AttachMoney,
  BubbleChart,
  LocationOn,
  Notifications
} from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    // saga: import("views/Dashboard/sagas"),
    // reducer: import("views/Dashboard/reducer"),
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile,
    exclude: true,
  },
  {
    path: "/employees",
    params: "id",
    sidebarName: "员工管理",
    navbarName: "员工管理",
    icon: ContentPaste,
    component: Employees
  },
  {
    path: "/employee",
    navbarName: "员工管理",
    component: Employees,
    exclude: true,
  },
  {
    path: "/orders",
    sidebarName: "订单管理",
    navbarName: "订单管理",
    icon: AttachMoney,
    component: Orders
  },
  {
    path: "/expenses",
    sidebarName: "支出管理",
    navbarName: "支出管理",
    icon: AttachMoney,
    component: Expenses
  },
  {
    path: "/customers",
    params: "id",
    sidebarName: "客户管理",
    navbarName: "客户管理",
    icon: BubbleChart,
    component: CustomersPage
  },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
