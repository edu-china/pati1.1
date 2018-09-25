// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import wxConfig from './assets/scripts/weixin.js'
import Axios from 'axios'
import qs from 'qs'
const {baseuri} = require('./myconfig.js')

Vue.prototype.wxConfig = wxConfig;
Vue.config.productionTip = false;
window.alert = function(str){
  console.log(str);
}

// Axios.defaults.baseURL = "http://m.edu-china.com/"
// const baseurl = 'http://m.shenzhoujiajiao.net/';
const baseurl = 'http://'+document.location.host+baseuri;
const timeout = 10000;
const transrequest = [function(data){
  var isjson = typeof(data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length;
  if(isjson) return qs.stringify(data);
  return data;
}];
// const requestHeader = {};
const requestHeader = {'currentPageUrl':window.location.href.split('#')[0]}
const setShare = (dt)=>{
  if(!dt) return;
  if(dt.hasOwnProperty('shareInfo')){
    let si = dt.shareInfo;
    if(si.hasOwnProperty('shareData')){
      if(!si.shareData.link){
        si.shareData.link = window.location.href;
      }
    }
    wxConfig(si,wx=>{});
  }
}
const httpIns = Axios.create({
  baseURL:baseurl,
  timeout:timeout,
  transformRequest:transrequest,
  headers:requestHeader
});
// httpIns.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
httpIns.interceptors.response.use(response => {
  if(response.status==200){
    const data = response.data;
    window.App.hideToast();
    switch (data.status-0) {
      case 200:
        setShare(data.data);
        return data.data;
        break;
      case 512:
        // if(/MicroMessenger/.test(window.navigator.userAgent)){
        //   window.location.href = ""
        // }else{
          // window.App.showToast({
          //   // icon:'warning',
          //   title:'未登录',
          //   complete:()=>{
          //     router.push({name:'Index'})
          //   }
          // });
        // }
        return Promise.reject(data.status-0);
        break;
      case 521:
        location.href = data.data.auth_link;
        return Promise.reject(data.status-0);
      break;
      default:
        window.App.showModal({
          title:'错误提示',
          content:data.info,
          showCancel:false
        });
        return Promise.reject(data.status-0);
    }
  }else{
    window.App.showModal({
      // response.status
      title:'系统错误',
      content:response.statusText,
      showCancel:false
    });
    return Promise.reject(response);
  }
}, err => { // 这里是返回状态码不为200时候的错误处理
  console.error(err);
  window.App.showToast({
    icon:'warning',
    title:'接口调用失败'
  });
  return Promise.reject(err)
});

httpIns.interceptors.request.use((config)=>{
  // console.log(config)
  if(config.showLoading!==false){
    window.App.showToast({
      title:'正在加载',
      icon:'loading',
      duration:0
    });
  }
  return config;
});

const axiosIns = Axios.create({
  baseURL:baseurl,
  timeout:timeout,
  transformRequest:transrequest,
  headers:requestHeader
});
axiosIns.interceptors.response.use(response => {
  let data = response.data;
  if(response.status==200 && data.status==200){
    setShare(data.data);
  }
  return data;
},err=>{
  return Promise.reject(err);
});

Vue.prototype.$http = httpIns;
Vue.prototype.axios = axiosIns;
Vue.prototype.host = baseurl;

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
