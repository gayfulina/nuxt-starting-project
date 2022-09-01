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
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        )
        state.loadedPosts[postIndex] = editedPost
      }
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-e294b-default-rtdb.firebaseio.com/posts.json')
          .then(res => {
            const postArray = []
            for (const key in res.data) {
              postArray.push({...res.data[key], id: key})
            }
            console.log(postArray, 'postArray')
            vuexContext.commit('setPosts', postArray)
          })
          .catch(e => context.error(e))
      },

      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },

      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return axios
          .post('https://nuxt-blog-e294b-default-rtdb.firebaseio.com/posts.json', createdPost)
          .then(res => {
            vuexContext.commit('addPost', {...createdPost, id: res.data.name})
          })
          .catch(err => console.log(err))
      },

      editPost(vuexContext, editedPost) {
        return axios
          .put("https://nuxt-blog-e294b-default-rtdb.firebaseio.com/posts/" +
          editedPost.id +
          ".json", editedPost)
          .then( () => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => console.log(e))
      }
    }
  })
}

export default createStore
