import {defineStore} from "pinia";

import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    authenticated: false,
    loading: false
  }),
  persist: {
    storage: localStorage,
  },
  getters: {
    getUsername(state) {
      if (state.user && state.user.name) {
        return state.user.name
      } else {
        return null;
      }
    },
    getUserDetails(state) {
      return state.user
    },
    getAuthenticatedStatus(state) {
      return state.authenticated
    }
  },
  actions: {
    async fetchUser() {
      axios.get('/api/user')
          .then(function (response) {
            this.user = response.data.user;
          })
          .catch(function (error) {
            this.emitter.emit('show-notification', {
              'title': 'Cannot fetch user',
              'type': "error",
              'message': error.response.data.message,
              'timeout': 6000
            })
          });
    },

    // update username saved in the localStorage
    updateLocalStorageUsername(name) {
      localStorage.removeItem('username')
      localStorage.setItem('username', name)
    },

    getLocalStorageUsername() {
      return localStorage.getItem('username')
    },
    setProfileDetails(user) {
      this.authenticated = true
      this.user = user

      // save username in the local storage
      if (user.name) {
        this.updateLocalStorageUsername(user.name);
      }

      this.loading = false

      this.router.push({name: "dashboard"});
    },
    async register(name, email, password, password_confirmation) {
      let _vm = this
      this.loading = true
      axios.get('/sanctum/csrf-cookie').then(response => {

        const headers = {
          'Content-Type': 'application/json'
        }

        axios.post('/api/register', {
              name,
              email,
              password,
              password_confirmation
            },
            headers
        )
            .then(function (response) {

              _vm.router.push({name: "login"});

              _vm.loading = false

            })
            .catch(function (error) {
              _vm.router.push({name: "reset-password"})

              _vm.loading = false
            });
      });
    },
    async login(email, password, remember) {

      let _vm = this

      this.loading = true

      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      axios.post('/api/login', {
        email,
        password,
        remember
      }, headers)
          .then((response) => {
            this.loading = false
            if (response.data.two_factor) {
              window.location.href = '/two/factor/verification'
            } else {
              this.setProfileDetails(response.data.user)
            }

          })
          .catch((error) => {
            this.router.push({name: "login"});
            this.loading = false
          });


    },
    async forgotPassword(email) {
      let _vm = this
      this.loading = true
      axios.get('/sanctum/csrf-cookie').then(response => {

        const headers = {
          'Content-Type': 'application/json'
        }

        axios.post('/api/forgot-password', {
          email
        }, headers)
            .then(function (response) {
              _vm.loading = false
            })
            .catch(function (error) {
              _vm.loading = false
            });
      });
    },

    async resetPassword(token, email, password, password_confirmation) {
      let _vm = this
      this.loading = true
      axios.get('/sanctum/csrf-cookie').then(response => {

        const headers = {
          'Content-Type': 'application/json'
        }

        axios.post('/api/reset-password', {
              token,
              email,
              password,
              password_confirmation
            },
            headers
        )
            .then(function (response) {

              _vm.router.push({name: "login"});

              _vm.loading = false

            })
            .catch(function (error) {
              _vm.router.push({name: "reset-password"})

              _vm.loading = false
            });
      });
    },

    async logout() {
      let _vm = this
      this.$reset()

      await axios.post('/api/logout')
          .then(function (response) {
            _vm.router.push({name: 'login'})
          })
          .catch(function (error) {
            window.location.pathname = '/login'
          });
    },
  }
});

