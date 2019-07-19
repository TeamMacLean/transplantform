<template>
  <div>
    <div v-if="mastersActive.length">
      <div class="columns" v-for="i in Math.ceil(mastersActive.length / 4)">
        <div class="column is-3" v-for="master in mastersActive.slice((i - 1) * 4, i * 4)">
          <nuxt-link v-bind:to="'/master/'+master._id">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <font-awesome-icon :icon="['fas', 'grip-horizontal']" class="fa-3x"/>
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{master.name}}</p>
                    <p class="subtitle is-6">#{{master.barcode}} @{{master.species}}</p>
                  </div>
                </div>

              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="tile">No Masters exist, to create one select wells from a&nbsp;<nuxt-link to="stocks">Stock Plate
      </nuxt-link>
        .
      </h1>
    </div>
  </div>
</template>

<script>

  export default {
    middleware: 'auth',
    asyncData({$axios, store}) {
      return $axios.get('/api/master')
        .then((res) => {
          return {
            mastersActive: res.data.stocksActive ? res.data.stocksActive : [],
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
