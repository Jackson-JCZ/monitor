import axios from './axios'
export const test=(data)=>{
    return axios.request({
        url:'/home_data',
        method: 'post',
        data:data
    })
}

// export const test1=()=>{

// }
// export const test2=()=>{

// }
// export const test3=()=>{

// }
// export const test4=()=>{

// }
// export const test5=()=>{

// }
// export const test6=()=>{

// }