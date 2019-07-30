import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 设置状态
  state: {
    count: 0
  },
  mutations: {
    // 改变状态
    increment (state) {
      state.count++
    }
  }
})

// 要唤醒一个 mutation handler，唯一的接口是store.commit，如果你熟悉事件监听，commit 就类似于 Vue 的$emit，jquery 的trigger。
store.commit('increment') // 提交改变的状态
// console.log(store.state.count)

export default store
