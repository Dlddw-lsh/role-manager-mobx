import { Button, Form, FormProps,message, Input } from "antd";
import "../assets/css/Login.css";
import { User } from "../api/login";
import { observer } from "mobx-react-lite";
import userStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const onFinish: FormProps<User>["onFinish"] = (values: User) => {
    // 发起请求的过程 在mobx中的action中进行
    const user = new userStore();
    user.login(values).then((data: any)=>{
        if (data.code == 200){
            message.success("登录成功");
            navigate("/index")
        }else{
          message.warning("登录失败");
        }
    }).catch((err)=>{
        message.error("登录出错")
    })
  };

  const onFinishFailed: FormProps<User>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="loginContainer">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<User>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<User>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default observer(Login);
