import axios from 'axios';


const api = axios.create({
  baseURL: "http://localhost:1317",
});

api.interceptors.request.use((req)=>{
  const item = localStorage.getItem('profile');
  if(item){
    req.headers.authorization = `Bearer ${JSON.parse(item).token}`;
  }
  return req;
})

export default api;