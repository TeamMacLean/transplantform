<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{stock.name}}</p>
          <div class="field is-grouped is-grouped-multiline">
            <div class="control" v-if="stock.barcode">
              <div class="tags has-addons"><span class="tag">barcode</span> <span
                class="tag is-outlined">{{stock.barcode}}</span></div>
            </div>
            <div class="control">
              <div class="tags has-addons"><span class="tag">species</span> <span class="tag is-outlined">{{stock.species}}</span>
              </div>
            </div>
            <div class="control">
              <div class="tags has-addons"><span class="tag">created</span> <span
                class="tag is-outlined">{{moment(stock.created).format('DD/MM/YYYY')}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: ['stock'],
    computed: {
      "moment": function () {
        return moment;
      }
    },
  }
</script>
