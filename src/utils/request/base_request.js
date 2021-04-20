/*
自己封装一个axios，创建一个axios示例的同时进行数据设置（默认路径，响应超时时间，发送前发送后的数据）
  封装axios：
  1、设置请求地址前缀(通过create设置基本url)
  2、设置公共的请求头 (token 请求拦截器)
  3、设置功能成功时得到具体的数据，功能失败时得到具体的原因 (请求拦截器中的设置，成功的反应，失败的反应)
  4、设置进度条 (mdn找nprogress进度条的组件)
  5、跨域解决，代理服务器
*/

import axios from "axios";
// 这里没用，就不导入了，要用时再下载依赖并引入
// import NProgress from "nprogress";
// import store from "@/store";

// 进度条
// import "nprogress/nprogress.css";


// 设置失败的对应显示数据，401-500这些不是写死的，可以根据后端进行修改
const errorMessages = {
  401: "未授权",
  403: "禁止访问",
  404: "资源未找到",
  500: "服务器出错",
};

const request = axios.create({
  // baseURL: "/api",
  timeout: 5000,
});


// ⭐设置请求拦截器
request.interceptors.request.use(
  config => {
  // 开始进度条
  // NProgress.start();

  // token操作暂不进行
  // const { token } = store.state.user.user;
  // if (token) {
  //   config.headers.token = token;
  // }

  return config;
  },
  // 请求失败时的操作
  error => {
    console.log(error);
    // 返回一个失败的Promise
    return Promise.reject();
  }
);


// ⭐设置响应拦截器
request.interceptors.response.use(
  response => {
    // 结束进度条
    // NProgress.done();

    // 请求成功 --> 响应状态200-299
    // ⭐⭐判断功能是否成功(判断的依据要看返回的数据中，状态码在哪)
    if (response.status === 200) {
      // 功能成功，返回具体的数据
      return response.data;
    }
    // 功能失败，返回具体的原因
    return Promise.reject(response.data.message);
  },
  error => {
    // 请求失败（一种是请求行为成功了，但是请求的数据失败；一种是请求的行为失败了，没发过去）
    // NProgress.done();
    // 如果响应回来，就会有error.response --> 401 403 404 500
    // 若没响应回来，则没有error.response --> 断网 请求超时
    if (error.response) {
     
      return Promise.reject(errorMessages[error.response.status]);
    }
    // 这是请求行为失败了，连请求都没发出去，由浏览器返回的错误
    if (error.message.indexOf("Network Error") !== -1) {
      return Promise.reject(new Error("请连接网络或打开wifi重试"));
    }

    if (error.message.indexOf("timeout") !== -1) {
      return Promise.reject(new Error("网络连接超时"));
    }

    return Promise.reject(new Error("未知错误，请联系管理员"));
  },
);

export default request;
