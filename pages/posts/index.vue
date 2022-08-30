<template>
  <div class="post-page">
    <post-list :posts="loadedPosts"/>
  </div>
</template>

<script>
import PostList from "../../components/Posts/PostList";

export default {
  name: "index",
  components: {
    PostList
  },
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
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
          ]
        })
      }, 1000)
    })
      .then(data => {
        return data
      })
      .catch(e => {
      context.error(new Error());
    })
  }
}
</script>

<style scoped>
.post-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
