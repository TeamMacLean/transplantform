<template>

  <td v-if="forcedItem" class=" has-text-centered tooltip is-unselectable"
      v-bind:data-tooltip="forcedItem.ec || 'Empty'"
      @click="onPress(forcedItem)"
      v-bind:class="this.getClassForTd">


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
      getClassForTd() {
        return {
          'is-selected': this.selected, 
          'is-warning': this.isWarning, 
          'is-danger': this.isDanger, 
          'is-danger-border': this.isDangerBorder
        };
      },
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
        //console.log('this.forcedItem', this.forcedItem);
        // TODO I think this line of code is a bug and incorrectly determines if selected
        // Please check
        const result = this.forcedItem ? this.forcedItem.selected : null
        //console.log('calculating if PlateCell is selected, determining:', result);        
        return result;
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
