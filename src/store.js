import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        companyList: [],
        warningNum: '',
        token: null,
        userLimits: [],
        statusList: [],
        currentPage: 1,
        currentActive: null,
        activeTask: 0
    },
    getters: {
    },
    mutations: {
        _setCurrentPage(state, data) {
            state.currentPage = data
        },
        _setCurrentActive(state, data) {
            state.currentActive = data
        },
        _setCurrentActiveTask(state, data) {
            state.activeTask = data
        },
        _setToken(state, data) {
            state.token = data
        },
    },
    actions: {
    }
})