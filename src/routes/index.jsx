import Dashboard from "layouts/Dashboard";
import Login from "layouts/Login";
import Register from "layouts/Register";
const rootRoute = [
	{ path: "/login", component: Login },
	// { path: "/dashboard", component: DashboardPage },
	{ path: "/register", component: Register },
	{ path: "/", component: Dashboard, },
	
];
export default rootRoute;
