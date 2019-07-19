<template>

  <td v-if="item" class=" has-text-centered tooltip is-unselectable" v-bind:data-tooltip="item.ec || 'Empty'"
      v-longpress="onLongPress"
      @click="onPress(item)"
      v-bind:class="{'is-selected':selected, 'is-warning':this.item.volume < 500, 'is-danger':this.item.volume < 200  || !item.fr && !item.ec}">


    <div v-if="editMode">
      <input class="input is-small" v-model="item.fr">
      <input class="input is-small" v-model="item.ec">
      <input type="number" class="input is-small" v-model="item.volume" max="900" min="0">
    </div>
    <div v-else>
      <span class="small-cell-text">{{item.fr}}</span>
      <div v-if="!editMode && item.fr && item.ec">
        {{item.volume}}
      </div>
    </div>

    <br/>

  </td>
  <td v-else class="has-text-centered">
    <div>
      N/A
    </div>
  </td>
</template>

<script>
  export default {
    computed: {
      selected() {
        return this.item ? this.item.selected : null
      }
    },
    props: ['item', 'editMode', 'onPress', 'onLongPress', 'pos'],
  }
</script>

<style>
  .small-cell-text {
    font-size: 0.65rem
  }

  /*.is-selected {*/
  /*border: 2px solid #37495C;*/
  /*}*/
</style>
