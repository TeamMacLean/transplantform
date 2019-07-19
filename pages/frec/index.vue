<template>
  <div>
    <nuxt-link to="/frec/new" class="button is-primary">
      <font-awesome-icon :icon="['fas', 'plus']" style="margin-right:8px;"/>
      Add
    </nuxt-link>


    <div v-if="frecs.length">
      <hr/>


    </div>
  </div>
</template>


<script>
  export default {
    middleware: 'auth',
    asyncData({$axios, store}) {
      return $axios.get('/api/frec')
        .then((res) => {
          return {
            frecs: res.data.frecs ? res.data.frecs : [],
          }
        })
        .catch(err => {
          console.error(err);
          return {frecs:[]}
        })
    },
  }
</script>
