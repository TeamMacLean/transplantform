<template>
  <div>
    <div v-if="ecs.length">

      <div>

        <div class="columns" v-for="i in Math.ceil(ecs.length / 6)">
          <div class="column is-2" v-for="ec in ecs.slice((i - 1) * 6, i * 6)">
            <strong>{{ec.ec}}</strong>: {{ec.volume}}µl
            <div>
              <div v-for="fr in ec.frs">
                <nuxt-link v-bind:to="`/plates/${fr.plateID}`">{{fr.fr}}</nuxt-link>
                : {{fr.volume}}µl
              </div>
            </div>
          </div>
        </div>


      </div>
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
            ecs: res.data.ecs ? res.data.ecs : [],
          }
        })
        .catch(err => {
          console.error(err);
          return {ecs: []}
        })
    },
  }
</script>
