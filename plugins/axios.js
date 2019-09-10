import * as axios from 'axios';
import Cookie from 'js-cookie';



var baseURL = 'http://test99.yunyikang.cn';
axios.defaults.withCredentials = true;
var http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest: function (data) {
        if (typeof data === 'object') {
            var newData = '';
            for (var k in data) {
                if (data.hasOwnProperty(k) === true) {
                    newData += encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
                }
            }
            return newData;
        }
        return data;
    }
})

http.interceptors.request.use(function (config) {
    // console.log(config)
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
http.interceptors.response.use(function(res) {
    // 全局拦截处理未登录
    var data = res.data;
        console.log('测试：=>',data)
    if (data.code == 406) {
        console.log('去登陆')
        Cookie.remove('_userlogin');
    }
   
    return res;
  }, function (error) {
    return Promise.reject(error)
  })

var newAxios = function (method, url, data) {
    return new Promise((resolve, reject) => {
        http({
            method,
            url,
            data: method === "post" || method === "put" ? data : null,
            params: method === "get" || method === "delelte" ? data : null
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}


export default {
    baseURL: baseURL,
    get: function (url, params) {
        return newAxios('get', url, params)
    },
    post: function (url, data) {
        return newAxios('post', url, data)
    }
}