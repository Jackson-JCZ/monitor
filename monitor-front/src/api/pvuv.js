import axios  from "./axios";
//返回所有URL的类别+请求次数
export const getTemplate=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}


