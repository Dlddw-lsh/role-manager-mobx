// 用与创建路由(可以根据数据，生成动态的路由)

import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";

const PrivateRoute = () => {
  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/index",
      element: <Home />,
    },
  ]);
};

export default PrivateRoute;
