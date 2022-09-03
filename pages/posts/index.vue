<template>
  <div class="post-page">
    <post-list :posts="loadedPosts"/>
  </div>
</template>

<script>
export default {
  name: "index",
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
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
