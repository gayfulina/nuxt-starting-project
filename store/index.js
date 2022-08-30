import Vuex from 'vuex'

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
        // if(!process.client) {
        //   console.log(context.req.session)
        // }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              vuexContext.commit('setPosts', [
                {
                  id: "1",
                  title: "First Post!",
                  previewText: "This is my first post!",
                  thumbnail: "https://th.bing.com/th/id/R.ef1acd569d096bb82714d9212d07569d?rik=Il1EzLd5AVzHBg&pid=ImgRaw&r=0"
                },
                {
                  id: "2",
                  title: "Hello there! - the second time!",
                  previewText: "This is my second post!",
                  thumbnail: "https://st.depositphotos.com/1518767/5176/v/600/depositphotos_51763069-stock-video-math-equations-and-shapes-on.jpg"
                },
                {
                  id: "3",
                  title: "Hi!",
                  previewText: "This is my third post!",
                  thumbnail: "https://th.bing.com/th/id/R.ef1acd569d096bb82714d9212d07569d?rik=Il1EzLd5AVzHBg&pid=ImgRaw&r=0"
                }
              ])
              resolve()
            }, 1000)
        });
      },

          setPosts(vuexContext, posts) {
          vuexContext.commit('setPosts', posts)
        }
      }
    })
}

  export default createStore
