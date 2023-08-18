import axios from 'axios';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: {}
  },
  getters: {
    authenticated(state) {
      return state.authenticated;
    },
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },
    SET_USER(state, value) {
      state.user = value;
    }
  },
  actions: {
    login({ commit }) {
      return axios
        .get('/api/user')
        .then(({ data }) => {
          commit('SET_USER', data);  // Using the 'data' variable
          commit('SET_AUTHENTICATED', true);
          router.push({ name: 'dashboard' });
        })
        .catch(() => {
          commit('SET_USER', {});
          commit('SET_AUTHENTICATED', false);
        });
    },
    logout({ commit }) {
      commit('SET_USER', {});
      commit('SET_AUTHENTICATED', false);
    }
  }
};
