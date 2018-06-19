import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "layouts/Login";
import Register from "layouts/Register";

const rootRoute = [
	{ path: "/login", component: Login },
	{ path: "/register", component: Register },
	{ path: "/", component: Dashboard, },
	
];
export default rootRoute;
