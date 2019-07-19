<template>
  <div>
    <nuxt-link to="/stocks/new" class="button is-primary">
      <font-awesome-icon :icon="['fas', 'plus']" style="margin-right:8px;"/>
      Add
    </nuxt-link>

    <div v-if="stocksActive.length">
      <hr/>
      <h1 class="title">Active</h1>
      <div class="columns" v-for="i in Math.ceil(stocksActive.length / 4)">
        <div class="column is-3" v-for="stock in stocksActive.slice((i - 1) * 4, i * 4)">
          <nuxt-link v-bind:to="'/stocks/'+stock._id">
            <StockCard :stock="stock"/>
          </nuxt-link>
        </div>
      </div>
    </div>


    <div v-if="stocksRetired.length">
      <hr/>
      <h1 class="title">Retired</h1>

      <div class="columns" v-for="i in Math.ceil(stocksRetired.length / 4)">
        <div class="column is-3" v-for="stock in stocksRetired.slice((i - 1) * 4, i * 4)">
          <nuxt-link v-bind:to="'/stocks/'+stock._id">
            <StockCard :stock="stock"/>
          </nuxt-link>
        </div>
      </div>

      <!--<div v-for="stock in stocksRetired">-->
        <!--<nuxt-link v-bind:to="'/stocks/'+stock._id">-->
          <!--<StockLevel :stock="stock"/>-->
        <!--</nuxt-link>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import StockCard from '../../components/StockCard'
  import StockLevel from '../../components/StockLevel'

  export default {
    middleware: 'auth',
    components: {StockCard, StockLevel},
    asyncData({$axios, store}) {
      return $axios.get('/api/stock')
        .then((res) => {
          return {
            stocksActive: res.data.stocksActive ? res.data.stocksActive : [],
            stocksRetired: res.data.stocksRetired ? res.data.stocksRetired : [],
          }
        })
        .catch(err => {
          console.error(err);
          return {
            stocksActive: [],
            stocksRetired: []
          }
        })
    },
  }
</script>
