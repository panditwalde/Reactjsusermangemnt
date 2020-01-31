import axios from "axios";
export function logout(token) {
  return axios.get("http://localhost:8080/user/logout", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function getUserList(token) {
  return axios.get("http://localhost:8080/user/getUserList", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function addUser(user, token) {
  return axios.post("http://localhost:8080/user/register", user, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function getUser(token) {
  return axios.get("http://localhost:8080/user/getUser", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function getLocationWiseUserCount(token) {
  return axios.get("http://localhost:8080/user/getLocationWiseUserCount", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function login(loginDto) {
  return axios.post("http://localhost:8080/user/login", loginDto, {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
}
