
import Vue from 'vue'
import Router from 'vue-router'
const index = () => import(/* webpackChunkName: "monitor" */ './views/index.vue')

Vue.use(Router)

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    routes: [
        {
            path: '/',
            component: index,
        },

    ]
})
