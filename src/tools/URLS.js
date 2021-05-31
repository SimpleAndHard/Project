import axios from 'axios'
// const URLS={
//     getSideList:"/getsidebar"
// }
const appkey = 'dd_1597654682810';
const request = axios.create({
baseURL:" https://mallapi.duyiedu.com/goods/",
params:{
    appkey
}
})


export default request