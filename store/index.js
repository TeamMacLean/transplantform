export const state = () => ({
  counter: 0,
  user: null,
})

export const getters = {
  getCounter(state) {
    return state.counter
  },
  getUser(state) {
    return state.user
  }
}

export const mutations = {
  increment(state) {
    state.counter++
  },
  setUser(state, payload){
    state.user = payload;
  }
}

export const actions = {
  async fetchCounter(state) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}