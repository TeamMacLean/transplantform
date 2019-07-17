<template>
  <td class="has-text-centered tooltip is-unselectable" v-bind:data-tooltip="item.name" v-longpress="onLongPress"
      @click="onPress(item)" v-bind:class="{'is-selected':selected}">

    <div v-if="edit">
      <input class="input is-small" v-model="item.name">
    </div>
    <div v-else>
      <span>{{item.name}}</span>
    </div>

    <br/>
    {{item.val}}
    <div v-if="item.val < 500 && item.val > 200">
      <span
        style="position: absolute;top:2px;left:2px;width:8px;height:8px;background-color: #FEDC62;border-radius: 50%;"></span>
    </div>

    <div v-if="item.val < 200">
      <span
        style="position: absolute;top:2px;left:2px;width:8px;height:8px;background-color: #FC3C63;border-radius: 50%;"></span>
    </div>


  </td>
</template>

<script>
  export default {
    computed: {
      selected() {
        return this.item.selected
      }
    },
    props: ['item', 'edit', 'onPress', 'onLongPress', 'pos'],
  }
</script>

<style>
  span {
    font-size: 0.65rem
  }

  /*.is-selected {*/
  /*border: 2px solid #37495C;*/
  /*}*/
</style>
