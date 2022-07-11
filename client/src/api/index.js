import axios from 'axios';


const api = axios.create({
  baseURL: "https://mern-places-2k2.herokuapp.com",
});

api.interceptors.request.use((req)=>{
  const item = localStorage.getItem('profile');
  if(item){
    req.headers.authorization = `Bearer ${JSON.parse(item).token}`;
  }
  return req;
})

export default api;