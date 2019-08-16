<template>
  <div>

    <div class="field has-addons">
      <div class="control">
        <a class="button is-static is-rounded is-large">
          EC
        </a>
      </div>
      <div class="control is-expanded has-icons-right">
        <input class="input is-rounded is-large" type="text" placeholder="" v-model="searchInput"
               @input="search(searchInput)">
        <span class="icon is-small is-right">
          <font-awesome-icon :icon="['fas', 'spinner']" v-if="isSearching" class="fa-spin"/>
          <font-awesome-icon :icon="['fas', 'search']" v-if="!isSearching"/>
        </span>
      </div>

    </div>


    <div class="dropdown-menu is-wide" v-bind:class="{'is-block':results.length}">
      <div class="dropdown-content">

        <a v-for="result in results" class="dropdown-item">
          <span>{{result.ec}} - {{result.fr}} - {{result.volume}} - {{result.plateID}}</span>
        </a>

      </div>
    </div>


  </div>
</template>


<script>
  export default {
    middleware: 'auth',
    data() {
      return {
        results: [],
        searchInput: '',
        isSearching: false,
      }
    },
    methods: {
      search(id) {
        this.isSearching = true;
        return this.$axios.$post('/api/frec/search', {id: 'EC' + id})
          .then(res => {
            this.results = res.results ? res.results : []
            this.isSearching = false;
          })
          .catch(err => {
            console.error(err);
            this.isSearching = false;
          })
      }
    }
    // asyncData({$axios, store}) {
    //   return $axios.get('/api/frec')
    //     .then((res) => {
    //       return {
    //         ecs: res.data.ecs ? res.data.ecs : [],
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err);
    //       return {ecs: []}
    //     })
    // },
  }
</script>

<style>
  .dropdown-menu.is-wide {
    min-width: 100%;
    max-width: 100%;
  }
</style>
