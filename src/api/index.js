import axios from 'axios'
// 增加默认的请求的路径
// 拦截器
axios.defaults.baseURL = 'http://47.93.195.202:8090';
axios.interceptors.response.use((res)=>{
  return res.data; // 在这里统一拦截结果 把结果处理成res.data
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