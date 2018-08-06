import axios from 'axios'
import router from '../router'
import { Message } from 'iview'
// 增加默认的请求的路径
// 拦截器
//axios.defaults.baseURL = 'http://47.94.105.145:8090';
axios.interceptors.response.use(res => {
  if(res.data.ErrorCode == 188){
    router.push('/login');
  }
  return res.data; // 在这里统一拦截结果 把结果处理成res.data
},error => {
  return Promise.reject(error);
});

export const getMaxTypePage = (data) =>{
  return axios.post('/api/MaxTypeApi/GetMaxTypePage',data)
};
export const getSubjectTypePages = (data) =>{
  return axios.post('/api/SubjectTypeApi/GetSubjectTypePages',data)
};
//管理员看到的列表
export const getUserSnameTable = (data) =>{
  return axios.post('/api/SubjectTypeApi/GetUserSnameTable',data)
};

export const getSnamePages = (data) =>{
  return axios.post('/api/SnameApi/GetSnamePages',data)
};
export const registerUser = (data) =>{
  return axios.post('/api/UserCommand/RegisterUser',data)
};
export const Userlogin = (data) =>{
  return axios.post('/api/UserCommand/CheckUserInfo',data)
};
export const SubmitSname = (data) =>{
  return axios.post('/api/SnameApi/SubmitSname',data)
};
export const getUserComment = (data) =>{
  return axios.post('/api/SubjectTypeApi/GetUserCommentUser',data)
};
export const getUserList = (data) =>{
  return axios.post('/api/SnameApi/GetUserSpecials',data)
};
export const getUserSingle = (data) =>{
  return axios.post('/api/SnameApi/GetUserSingle',data)
};
export const setUserPassword = (data) =>{
  return axios.post('/api/AdminOp/AdminSetPwd',data)
};