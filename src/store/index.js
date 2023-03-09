import { createStore } from 'vuex';

export default createStore({
  state: {
    usuario: {
      id: '',
      cargo: 1,
      edificacao: '',
    },
    token: '',
  },
  getters: {
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
  },
  modules: {
  },
});
