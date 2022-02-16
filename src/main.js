import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/fontawesome'
import { message } from './plugins/resetMessage'
import router from './router'
import store from './store'
import moment from 'vue-moment-filter'
import axios from 'axios'
import './assets/less/publics.less'
import 'default-passive-events'
Vue.config.productionTip = false
Vue.prototype.$message = message;
Vue.prototype.$hasLimits = (str) => {
    if (!str) return true
    return store.state.userLimits.indexOf(str) !== -1
}
Vue.use(moment)


//axios全局配置
Vue.prototype.$axios = axios
axios.defaults.timeout = 200*1000
axios.defaults.baseURL = '/api/'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;'

var ajaxElVm = null;
var ajaxTimeout = null

//输入拦截
axios.interceptors.request.use(function(config) {
    if (ajaxElVm) {
        ajaxElVm.close();
        clearTimeout(ajaxTimeout)
    }
    config.headers['Authorization'] = localStorage.getItem('token')
    ajaxElVm = Vue.prototype.$notify({
        iconClass: 'el-icon-loading',
        customClass: 'el-notify--ajax',
        duration: 0,
        message: '数据请求中...',
        position: 'bottom-right',
        showClose: false
    });

    return config;
});

//输出拦截
axios.interceptors.response.use((response) => {
    if (ajaxElVm) {
        ajaxTimeout = setTimeout(() => ajaxElVm.close(), 1000);
    }
    if (response.status == 200) {
        var data = response.data;
        // 判断是否为blob类型
        if (response.config && response.config.responseType == 'blob') {
            return data
        }
        if (data.code !== 0 && data.code !== 403) {
            Vue.prototype.$message.error(data.msg);
            return Promise.reject(data.msg)
        } else if (data.code === 0){
            return response.data;
        } else if (data.code === 403){
            localStorage.clear()
            store.commit('_setToken', '')
            setTimeout(()=>{
                router.push({path: '/login'})
            })
        }
    }else{
        Vue.prototype.$message.error('网络请求错误');
    }
}, function(error) {
    if (ajaxElVm) {
        ajaxTimeout = setTimeout(() => ajaxElVm.close(), 1000);
    }
    if(error.response.status == 403){
        Vue.prototype.$message.error('登录失效，请重新登录');
        localStorage.clear()
        store.commit('_setToken', '')
        console.log(40000)
        setTimeout(()=>{
            router.push({path: '/login'})
        })
    }else if(error.response.status == 401){
        Vue.prototype.$message.error('权限不足');
        return Promise.reject('权限不足')
    } else {
        Vue.prototype.$message.error(error.response.data.message ? error.response.data.message : '服务器请求错误');
        return Promise.reject(error)
    }
});


new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app')
