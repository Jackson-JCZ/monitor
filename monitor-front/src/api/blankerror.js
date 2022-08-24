import axios  from "./axios";
//返回所有URL的类别+请求次数
export const getTemplate=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}

//发生空白URL时 查看的详情 传入的参数是 时间范围和URL种类 ，需要的返回最新的一次请求内容，不论成功或失败
export const getDetailByUrl=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}

