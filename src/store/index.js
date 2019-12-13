import Vuex from '@wepy/x'

export default new Vuex.Store({
  state: {
    userinfo: {},
    counter: 0,
    goodslist: [
      {
        name: '菠萝',
		imagesrc: 'pineapple.png',
        id: '123',
        quantity: 0
      },
      {
        name: '苹果',
		imagesrc: 'apple.png',
        id: '12345',
        quantity: 0
      },
	  {
        name: '桃子',
		imagesrc: 'peach.jpg',
        id: '2345',
        quantity: 0
      },
      {
        name: '榴莲',
		imagesrc: 'liulian.jpg',
        id: '23945',
        quantity: 0
      },
      {
        name: '菠萝',
		imagesrc: 'pineapple.png',
        id: '1245',
        quantity: 0
      },
      
      {
        name: 'taozi',
		imagesrc: 'peach.jpg',
        id: '23452',
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
    },
    setinfo(info) {
      state.userinfo = info || {};
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
