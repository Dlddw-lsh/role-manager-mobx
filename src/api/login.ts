import { myAxios } from "../utils/myAxios";

export interface User {
  username: string;
  password: string;
}

export function login(user: User) {
  return new Promise((resolve, reject) => {
    myAxios
      .post("/user/login", user)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
