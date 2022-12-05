import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import { Accounts } from "views/Accounts";
import { Records } from "views/Records";
import { NewRecord } from "components/Records/pages/NewRecord";
import { AccountView } from "components/Accounts/AccountView";

const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/budget",
    sidebar: true
  },
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
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
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
