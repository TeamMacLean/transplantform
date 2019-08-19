<template>
  <div>
    <div v-if="mastersActive.length">
      <h1 class="title">Active</h1>
      <div class="columns" v-for="i in Math.ceil(mastersActive.length / 4)">
        <div class="column is-3" v-for="master in mastersActive.slice((i - 1) * 4, i * 4)">
          <nuxt-link v-bind:to="'/masters/'+master._id">
            <StockCard :stock="master"></StockCard>
          </nuxt-link>
        </div>
      </div>
    </div>


    <div v-if="mastersRetired.length">
      <hr/>
      <h1 class="title">Retired</h1>

      <div class="columns" v-for="i in Math.ceil(mastersRetired.length / 4)">
        <div class="column is-3" v-for="master in mastersRetired.slice((i - 1) * 4, i * 4)">
          <nuxt-link v-bind:to="'/masters/'+master._id">
            <StockCard :stock="master"></StockCard>
          </nuxt-link>
        </div>
      </div>

      <!--<div v-for="stock in stocksRetired">-->
      <!--<nuxt-link v-bind:to="'/stocks/'+stock._id">-->
      <!--<StockLevel :stock="stock"/>-->
      <!--</nuxt-link>-->
      <!--</div>-->
    </div>

    <div v-if="!mastersActive.length && !mastersRetired.length">
      <div v-else>
        <p>No Masters Found.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import StockCard from '../../components/StockCard'
  export default {
    middleware: 'auth',
    components: {StockCard},
    asyncData({$axios, store}) {
      return $axios.get('/api/master')
        .then((res) => {
          return {
            mastersActive: res.data.mastersActive ? res.data.mastersActive : [],
            mastersRetired: res.data.mastersRetired ? res.data.mastersRetired : []
          }
        })
        .catch(err => {
          console.error(err);
          return {
            mastersActive: [],
            mastersRetired: []
          }
        })
    },
  }
</script>
