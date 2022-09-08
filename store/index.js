import Vuex from 'vuex'
import process from "../nuxt.config"
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },

    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      }
    },

    mutations: {
      setPosts(state, posts) {
        this.state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        )
        state.loadedPosts[postIndex] = editedPost
      },

      setToken(state, token) {
        state.token = token
      },

      clearToken(state) {
        state.token = null
      }
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('/posts.json')
          .then(data => {
            const postArray = []
            for (const key in data) {
              postArray.push({...data[key], id: key})
            }
            vuexContext.commit('setPosts', postArray)
          })
          .catch(e => context.error(e))
      },

      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },

      authenticateUser(vuexContext, authData) {
        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey
        if (!authData.isLogin) {
          authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey
        }

        return this.$axios.$post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
          .then(res => {
            vuexContext.commit('setToken', res.idToken)
            localStorage.setItem('token', res.idToken)
            localStorage.setItem('tokenExpiration', new Date().getTime() + +res.expiresIn * 1000)
            Cookie.set('jwt', res.idToken)
            Cookie.set('expirationDate', new Date().getTime() + +res.expiresIn * 1000)
            vuexContext.dispatch('setLogoutTimer', res.expiresIn * 1000)

            return this.$axios.$post('http://localhost:3000/api/track-data', {
              data: 'Authenticated!'
            })
          })
          .catch(err => {
            console.log(err)
          })
      },

      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return this.$axios
          .$post('https://nuxt-blog-e294b-default-rtdb.firebaseio.com/posts.json?auth=' + vuexContext.state.token,
            createdPost)
          .then(data => {
            vuexContext.commit('addPost', {...createdPost, id: data.name})
          })
          .catch(err => console.log(err))
      },

      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(process.env.baseUrl + "/posts/" + editedPost.id + ".json?auth=" + vuexContext.state.token,
            editedPost)
          .then(() => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => console.log(e))
      },

      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit('clearToken')
        }, duration)
      },

      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      },

      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }

    }
  })
}

export default createStore
