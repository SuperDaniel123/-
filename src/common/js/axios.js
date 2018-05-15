import Vue from 'vue'
import axios from "axios"
import qs from "qs"
axios.defaults.baseURL='/';

axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.defaults.shouldRetry = (error) => true;


let api = function(url,type,options){

    /*  url       请求地址
    *   type      请求类型
    *   options   请求参数
    *   instance  请求首选项
    */
    url = "api" + url
    let opt = options || {};
    let instance = axios.create({
        timeout: 5000,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    instance.interceptors.response.use(undefined, (err) => {
        var config = err.config;
        // 判断是否配置了重试
        if(!config || !config.retry) return Promise.reject(err);
    
        if(!config.shouldRetry || typeof config.shouldRetry != 'function') {
           return Promise.reject(err);
        }
    
        //判断是否满足重试条件
        if(!config.shouldRetry(err)) {
          return Promise.reject(err);
        }
    
        // 设置重置次数，默认为0
        config.__retryCount = config.__retryCount || 0;
    
        // 判断是否超过了重试次数
        if(config.__retryCount >= config.retry) {
            return Promise.reject(err);
        }
    
        //重试次数自增
        config.__retryCount += 1;
    
        //延时处理
        var backoff = new Promise(function(resolve) {
            setTimeout(function() {
                resolve();
            }, config.retryDelay || 1);
        });
    
        //重新发起axios请求
        return backoff.then(function() {
            return instance(config);
        });
    });
    

    return new Promise((resolve,reject)=>{
        if(type === 'POST' || type === 'post'){
            instance.post(url,qs.stringify(opt))

            .then(response => {
                if(response.data.ResultCD == 'E999'){
                    sessionStorage.removeItem('MID')
                    sessionStorage.removeItem('UID')
                    alert('登录超时')
                    location.reload()
                    return;
                }
                resolve(response)
            })
            .catch(error => {
                console.log("loading failed")
            })
        }else if(type === 'GET' || type === 'get'){
            let getOpt = qs.stringify(opt);
            if(getOpt){
                getOpt = '?'+ getOpt
            }

            instance.get(url + getOpt)

            .then(response => {
                resolve(response)
            })
            .catch(error => {
                alert("loading failed")
            })
        }
        
    })
}


Vue.prototype.$ajax = api;
Vue.use(axios);