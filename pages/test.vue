<template>
  <div id="app" class="container">
    <div v-for="(item, index) in paginatedItems" :key="index">
      {{ item }}
    </div>

    <b-pagination :total="total" :current.sync="current" :per-page="perPage">
    </b-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      current: 1,
      perPage: 5,
    };
  },
  created() {
    // populate array
    for (var i = 1; i <= 100; i++) {
      this.items.push(i);
    }
  },
  computed: {
    total() {
      return this.items.length;
    },
    /*
        Filtered items that are shown in the table
      */
    paginatedItems() {
      let page_number = this.current - 1;

      return this.items.slice(
        page_number * this.perPage,
        (page_number + 1) * this.perPage
      );
    },
  },
};
</script>
<style scoped>
.rightPadding {
  padding-right: 10px;
}
</style>
