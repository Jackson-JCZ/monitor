import axios from './axios.js'
export const getEchartData=(data)=>{
    return axios.request({
        url:'/home',
        method:'post',
        data:data
    })
}
//异常内容列表
export const getTemplate1=(data)=>{
    return axios.request({
        url:'home_data',
        method:'post',
        data:data
    })
}
//异常页面列表
export const getTemplate2=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}
//根据异常内容查询具体错误信息
export const getDetailByContent=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}
//根据异常URL查询具体错误信息
export const getDetailByUrl=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data:data
    })
}
//测试输出所有异常
export const test=(data)=>{
    return axios.request({
        url:'home_data',
        method:'post',
        data:data,
    })
}