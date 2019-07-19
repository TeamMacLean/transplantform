<template>
  <div>
    <div v-if="plate">
      <p class="title is-4">{{stock.name}}</p>
      <!--<p class="subtitle is-6">Barcode: {{stock.barcode}}; Species: {{stock.species}}</p>-->
      <p class="subtitle is-6">#{{stock.barcode}} @{{stock.species}}</p>
      <p class="subtitle is-6"></p>
      <Plate :plate="plate" :save="saveStock" :isEditable="stock.active" :canSpawnMasters="stock.active"/>

      <hr/>

      <button type="button" class="button" @click="retireStock" v-if="stock.active">Retire</button>
      <button type="button" class="button" @click="activeateStock" v-if="!stock.active">Activate</button>
    </div>
  </div>
</template>

<script>
  import Plate from '../../components/Plate';

  export default {
    computed: {
      plate() {
        if (this.stock) {
          return this.stock.plate
        } else {
          return null;
        }
      }
    },
    components: {
      Plate
    },
    middleware: 'auth',
    asyncData({$axios, store, params}) {
      return $axios.get('/api/stock/' + params.id)
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
        return new Promise((good, bad) => {
          good();
        })
      },
      retireStock: function () {
        return this.$axios.post('/api/stock/' + this.stock._id + '/retire')
          .then((res) => {
            this.$set(this, 'stock', res.data.stock)
          })
          .catch(err => {
            console.error(err);
          })
      },
      activeateStock: function () {
        return this.$axios.post('/api/stock/' + this.stock._id + '/activate')
          .then((res) => {
            this.$set(this, 'stock', res.data.stock);
          })
          .catch(err => {
            console.error(err);
          })
      },
    }
  }
</script>

