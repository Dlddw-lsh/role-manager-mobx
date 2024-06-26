// 用与创建路由(可以根据数据，生成动态的路由)

import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
// react动态加载组件 @loadable/component
import lodable from "@loadable/component";
import { observer } from "mobx-react-lite";
import userStore from "../store/userStore";

const PrivateRoute = () => {
  const user = new userStore();
  console.log(user.user);

  function createRouter(list: any) {
    let arr = [];
    if (list && list.length > 0) {
      list.map((item: any) => {
        const children = item.children;
        item = item.menu;
        const Component = lodable(() => {
          return import("./" + item.componentPath);
        });
        if (children && children.length > 0) {
          arr.push({
            path: item.routePath,
            // element: <Component />,
            children: [...createRouter(children)],
          });
        } else {
          arr.push({
            path: item.routePath,
            element: <Component />,
          });
        }
      });
    }

    return arr;
  }

  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
      children: [...createRouter(user.user)],
    },
    {
      path: "/*",
      element: <Navigate to={"/login"}></Navigate>,
    },
  ]);
};

export default observer(PrivateRoute);
