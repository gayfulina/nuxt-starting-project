import Vuex from 'vuex'
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },

    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    },

    mutations: {
      setPosts(state, posts) {
        this.state.loadedPosts = posts
      }
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
       return axios.get('https://nuxt-blog-e294b-default-rtdb.firebaseio.com/posts.json')
         .then(res => {
           const postArray = []
           for (const key in res.data) {
             postArray.push({...res.data[key],  id: key})
           }
           vuexContext.commit('setPosts', postArray)
         })
         .catch(e => context.error(e))
      },

          setPosts(vuexContext, posts) {
          vuexContext.commit('setPosts', posts)
        }
      }
    })
}

  export default createStore
