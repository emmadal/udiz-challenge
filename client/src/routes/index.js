import Login from "../pages/Login";
import Register from "../pages/Register";
import ListRoof from "../pages/ListRoof";

const pageRoutes = [
  { name: "login", pathname: "/login", component: <Login /> },
  { name: "register", pathname: "/register", component: <Register /> },
  {
    name: "roof-list",
    pathname: "/",
    component: <ListRoof />,
    protected: true,
  },
];

export default pageRoutes;
