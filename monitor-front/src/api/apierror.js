import axios  from "./axios";
//返回所有URL的类别+请求次数
export const getTemplate1=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}
//返回失败的URL类别+请求次数
export const getTemplate2=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}
//全部URL时 查看的详情 传入的参数是 时间范围和URL种类 ，需要的返回最新的一次请求内容，不论成功或失败
export const getDetailByUrl=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}
//失败的URL时，查看日志详情 传入的参数是时间范围和URL种类，需要的是返回一条请求内容，只能是失败的。
export const getErrorDetail=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}
