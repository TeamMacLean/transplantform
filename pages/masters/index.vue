<template>
  <section class="section">
    <div class="buttons">
      <nuxt-link to="/masters/new" class="button is-primary">
        <font-awesome-icon icon="plus"/>
      </nuxt-link>
    </div>
    <div v-for="master in mastersActive">
      <div class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tweets</p>
            <p class="title">3,456</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Following</p>
            <p class="title">123</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Followers</p>
            <p class="title">456K</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Likes</p>
            <p class="title">789</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    asyncData() {
      return {mastersActive: [], mastersUsed:[]}
    }
  }
</script>
