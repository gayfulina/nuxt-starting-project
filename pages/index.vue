<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news</h1>
    </section>
    <post-list :posts="loadedPosts"/>
  </div>
</template>

<script>
import PostList from "../components/Posts/PostList";

export default {
  name: 'IndexPage',
  components: {
    PostList
  },
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
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

    }, 1500)
  },
}
</script>

<style>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('../assets/images/main-page-background.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>
