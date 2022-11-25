import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import { Accounts } from "views/Accounts";
import { Records } from "views/Records";
import { NewRecord } from "components/Records/pages/NewRecord";
import { AccountView } from "components/Accounts/AccountView";

const dashboardRoutes = [
  {
    path: "/accounts",
    name: "Accounts",
    icon: "nc-icon nc-bag",
    component: Accounts,
    layout: "/budget",
    sidebar: true
  },
  {
    path: "/records",
    name: "Records",
    icon: "nc-icon nc-money-coins",
    component: Records,
    layout: "/budget",
    sidebar: true
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/budget",
    sidebar: true
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/budget",
    sidebar: true
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/budget",
    sidebar: true
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/budget",
    sidebar: true
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/budget",
    sidebar: true
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/budget",
    sidebar: true
  },


  {
    path: "/records/new",
    name: "New Record",
    icon: "",
    component: NewRecord,
    layout: "/budget",
    sidebar: false
  },
  {
    path: "/accounts/:id",
    name: "New Record",
    icon: "",
    component: AccountView,
    layout: "/budget",
    sidebar: false
  },


];

export default dashboardRoutes;
