import Vuex from '@wepy/x'

export default new Vuex.Store({
  state: {
    counter: 0,
    goodslist: [
      {
        name: '菠萝',
        id: '123',
        quantity: 1
      },
      {
        name: '苹果',
        id: '12345',
        quantity: 1
      },
      {
        name: '里头',
        id: '1245',
        quantity: 0
      },
      {
        name: '桃子',
        id: '2345',
        quantity: 0
      },
      {
        name: 'peach',
        id: '23452',
        quantity: 0
      },
      {
        name: 'liulian',
        id: '23945',
        quantity: 0
      }
    ]
  },
  mutations: {
    increment(state, key) {
      state.goodslist.filter(x => {
        return x.id === key
      })[0].quantity++
    },
    decrement(state, key) {
      state.goodslist.filter(x => {
        return x.id === key
      })[0].quantity--
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
