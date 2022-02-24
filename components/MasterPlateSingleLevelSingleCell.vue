<template>

  <div 
    class="wrapper"
    v-if="this.ec" 
  >
    <div 
      class=" has-text-centered tooltip is-unselectable info-wrapper"
      v-bind:data-tooltip="this.tooltip"
      v-bind:class="getClassForTd"
    >
      <span class="small-cell-text">{{this.fr || 'n/a'}} {{this.volumeString}}</span>
      <span class="small-cell-text"><b>{{this.level}}</b> {{this.ec}} <span class="volume-text">{{this.slotNumber}}</span></span>

      <!-- TEMP REFORMAT TO MAKE MORE DEBUG FRIENDLY -->

      <!-- <span class="small-cell-text">{{this.fr || 'n/a'}}</span> -->
      <!-- <span class="volume-text"> -->
        {{
          //this.volumeString + ' (' + this.slotNumber + ')'
          /*this.slotNumber*/
          /*this.slotNumber ? (this.slotNumber + ', ' + this.volumeString) : this.volumeString*/
        }}
      <!-- </span>  -->
    </div>
  </div>

  <div v-else class="na-text">
    N/A
  </div> 

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
      isWarning() {
        return this.volume && this.volume > 0 && this.volume < 100
      },
      isDanger() {
        return this.volume && this.volume > 0 && this.volume < 30
      },
      tooltip(){
        return this.level + ' / ' + this.ec;
      },
      volumeString(){
        return (this.volume || 0) + 'µl';
      }
    },
    props: ['ec', 'fr', 'volume', 'slotNumber', 'level'],
  }
</script>

<style>
  .small-cell-text {
    font-size: 0.625rem
  }
  .wrapper {
    /* padding: 1rem; */
    min-height: 2rem;
    height: 2rem;
    max-height: 2rem;
  }
  .info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .volume-text {
    font-size: .75rem;
    font-weight: bold;
  }
  .na-text {
    font-size: .75rem;
    color: lightgray;
    min-height: 2rem;
    height: 2rem;
    max-height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
