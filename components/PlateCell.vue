<template>

  <td v-if="forcedItem" class=" has-text-centered tooltip is-unselectable"
      v-bind:data-tooltip="forcedItem.ec || 'Empty'"
      @click="onPress(forcedItem)"
      v-bind:class="{'is-selected':selected, 'is-warning':isWarning, 'is-danger':isDanger, 'is-danger-border':isDangerBorder}">


    <div v-if="editMode">
      <input class="input is-small" v-model="forcedItem.fr">
      <input class="input is-small" v-model="forcedItem.ec">
      <input type="number" class="input is-small" v-model="forcedItem.volume" max="900" min="0">
    </div>
    <div v-else>
      <span class="small-cell-text">{{forcedItem.fr}}</span>
      <div v-if="!editMode && forcedItem.fr && forcedItem.ec">
        {{forcedItem.volume}}µl
      </div>
    </div>

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
      isDangerBorder() {
        // return true;
        return this.forcedItem.frTaken
      },
      isWarning() {
        return this.forcedItem.fr && this.forcedItem.ec && this.forcedItem.volume <= Math.ceil(((this.maxVolume / 100) * 20)) //below 30% of total
      },
      isDanger() {
        return this.forcedItem.fr && this.forcedItem.ec && this.forcedItem.volume <= Math.ceil(((this.maxVolume / 100) * 10)) //below 10% of total
      },
      selected() {
        return this.forcedItem ? this.forcedItem.selected : null
      },
      forcedItem() {
        return this.item ? this.item : {}
      }
    },
    props: ['item', 'editMode', 'onPress', 'onSelectMode', 'pos', 'maxVolume'],

  }
</script>

<style>
  .small-cell-text {
    font-size: 0.65rem
  }

  .is-danger-border {
    outline: 2px solid #FC3C63;
  }

  /*.is-selected {*/
  /*border: 2px solid #37495C;*/
  /*}*/
</style>
