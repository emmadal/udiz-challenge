import Login from "../pages/Login";
import Register from "../pages/Register";

const pageRoutes = [
  { name: "login", pathname: "/login", component: <Login /> },
  { name: "register", pathname: "/register", component: <Register /> },
];

export default pageRoutes;
