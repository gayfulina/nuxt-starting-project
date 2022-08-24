<template>
  <section class="post-list">
    <post-preview
      id="1"
      :is-admin="isAdmin"
      title="Hello there!"
      previewText="This is my first post!"
      thumbnail="https://th.bing.com/th/id/R.ef1acd569d096bb82714d9212d07569d?rik=Il1EzLd5AVzHBg&pid=ImgRaw&r=0"
    />

    <post-preview
      id="2"
      :is-admin="isAdmin"
      title="Hello there! - the second time!"
      previewText="This is my second post!"
      thumbnail="https://st.depositphotos.com/1518767/5176/v/600/depositphotos_51763069-stock-video-math-equations-and-shapes-on.jpg"
    />

    <post-preview
      id="3"
      :is-admin="isAdmin"
      title="Hi!"
      previewText="This is my third post!"
      thumbnail="https://th.bing.com/th/id/R.ef1acd569d096bb82714d9212d07569d?rik=Il1EzLd5AVzHBg&pid=ImgRaw&r=0"
    />
  </section>
</template>

<script>
import PostPreview from "./PostPreview";

export default {
  name: "PostList",
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
