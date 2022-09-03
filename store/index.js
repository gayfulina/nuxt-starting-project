import Vuex from 'vuex'
import process from "../nuxt.config";

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

      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return this.$axios
          .$post('https://nuxt-blog-e294b-default-rtdb.firebaseio.com/posts.json', createdPost)
          .then(data => {
            vuexContext.commit('addPost', {...createdPost, id: data.name})
          })
          .catch(err => console.log(err))
      },

      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(process.env.baseUrl + "/posts/" +
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
