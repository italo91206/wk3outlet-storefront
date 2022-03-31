export const perfil = {
  namespaced: true,
  state: {
    perfil: {}
  },
  actions: {
    setPerfil({ commit }, perfil) {
      return commit('setPerfil', perfil);
    },
    getPerfil({ commit }) {
      return commit('getPerfil');
    },
  },
  getters: {
    isAdmin(state){
      return state.perfil.isAdmin;
    },
    getId(state){
      return state.perfil.id;
    },
    getPerfil(state){
      return state.perfil;
    }
  },
  mutations: {
    setPerfil(state, perfil) {
      state.perfil = perfil;
    },
    getPerfil(state) {
      return state.perfil;
    },
    unsetPerfil(state){
      state.perfil = {}
    }
  }
}
