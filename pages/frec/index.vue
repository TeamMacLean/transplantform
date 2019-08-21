<template>
  <div>

    <div class="search-stuff">
    <div class="field has-addons is-center-custom">
      <div class="control">
        <a class="button is-static is-rounded is-medium">
          EC
        </a>
      </div>
      <div class="control is-expanded has-icons-right">
        <input class="input is-rounded  is-medium" type="text" placeholder="" v-model="searchInput"
               @input="search(searchInput)">
        <span class="icon is-small is-right">
          <font-awesome-icon :icon="['fas', 'spinner']" v-if="isSearching" class="fa-spin"/>
          <font-awesome-icon :icon="['fas', 'search']" v-if="!isSearching"/>
        </span>
      </div>

    </div>


    <div class="dropdown-menu is-center-custom" v-bind:class="{'is-block':results.length}" style="margin-top:-10px;">
      <div class="dropdown-content">
        <div class="make-scrollable">

          <a v-for="result in results" class="dropdown-item">
            <span>{{result.ec}} / {{result.fr}} - {{result.volume}}</span>
          </a>

        </div>
      </div>
    </div>
    </div>

    <div class="columns" v-for="i in Math.ceil(results.length / 6)">
      <div class="column is-2" v-for="result in results.slice((i - 1) * 6, i * 6)">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">John Smith</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
            this.results = res.results ? res.results : [];

            console.log(this.results);
            this.isSearching = false;
          })
          .catch(err => {
            console.error(err);
            this.isSearching = false;
          })
      }
    }
  }
</script>

<style>
  .make-scrollable {
    max-height: 256px;
    overflow-y: scroll;
  }

  .is-center-custom {
    max-width: 512px;
    margin: 0 auto;
    position: relative;
  }

  .dropdown-menu.is-wide {
    min-width: 100%;
    max-width: 100%;
  }

  .search-stuff{
    margin-bottom:32px;
  }
</style>
