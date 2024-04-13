import { makeAutoObservable } from "mobx";
import { User, login } from "../api/login";

class userStore {
  // 可观察的属性, observable, computed, action
  constructor() {
    makeAutoObservable(this);
  }

  get user() {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user") || "");
    }
    return {};
  }

  set user(data) {
    sessionStorage.setItem("user", JSON.stringify(data));
  }

  get token() {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token") || "");
    }
    return "";
  }
  set token(data) {
    sessionStorage.setItem("token", data);
  }

  login = (user: User) => {
    // 只进行数据处理，不进行界面的提示信息
    return new Promise((resolve, reject) => {
      login(user)
        .then((data: any) => {
          console.log(data);
          this.user = data.data;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default userStore;
