import Vuex from '@wepy/x'

export default new Vuex.Store({
  state: {
    counter: 0,
    listItems: [
      { id: 123, name: '水果', quantity: 0 },
      { id: 143, name: '菠萝', quantity: 0 }
    ]
  },
  mutations: {
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment')
    },
    decrement({ commit }) {
      commit('decrement')
    },
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})
