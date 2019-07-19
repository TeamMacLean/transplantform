<template>
  <div>
  <Plate :plate="plate" :save="saveStock"/>
  </div>
</template>

<script>
  import Plate from '../../components/Plate';

  export default {
    computed: {
      plate() {
        return this.stock.plate
      }
    },
    components: {
      Plate
    },
    middleware: 'auth',
    asyncData({$axios, store}) {
      return $axios.get('/api/stock')
        .then((res) => {
          return {
            stock: res.data.stock
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    methods: {
      saveStock: function () {
        return this.$axios.post('/api/stock', {
          stock: this.stock
        })
      }
    }
  }
</script>

