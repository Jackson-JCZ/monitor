import axios from 'axios'
import config from '@/config'

const baseUrl = process.env.NODE_ENV == 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest{
    constructor(baseUrl){
        this.baseUrl=baseUrl;
    }
    getInsideConfig(){
        const config={
            baseURL:this.baseUrl,
            headers:{
                'Content-Type':'text/plain'
            }      
        }
        return config;
    }
    interceptors(instance){
        instance.interceptors.request.use(function (config){
            //拦截器 增加内容
            return config;
        },function(e){
            //失败的回调
            return Promise.reject(e);
        });
        instance.interceptors.response.use(function(response){
            //添加相应拦截器
            const res = response;
            if ((res.status < 200) && (res.status >= 300)) {
               
                return Promise.reject(new Error(res.data || 'Error'));
            } else {
                return response.data;
            }
        },function(error){
            let res=error.response.data;
            // 错误提示 输出错误信息提示
            
            return Promise.reject(error);
        })
    }
    request(options){
        const instance=axios.create();
        options={...this.getInsideConfig(),...options}
        this.interceptors(instance);
        return instance(options);
    }  
}
export default new HttpRequest(baseUrl);