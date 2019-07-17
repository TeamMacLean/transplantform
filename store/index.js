
export const state = () => ({
  user: null,
  stock: null
});

export const getters = {
  isAuthenticated: state => {
    return !!state.user
  },
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setStock(state, stock) {
    state.stock = stock
  }


};

export const actions = {
  async nuxtServerInit(store, context) {
  }
};
