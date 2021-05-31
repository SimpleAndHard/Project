import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
  params: {
    appkey: 'maqi_1614864837058',
  },
});

// instance.interceptors.request.use((config)=>{

// },(error)=>{
//     return Promise.reject(error);
// })

export default instance;
