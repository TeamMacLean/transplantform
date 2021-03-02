<template>

    <div :class="getCellsWrapperStyles">

      <!-- I'm explicitly prop drilling for clarity during dev; could refactor in future -->
      <MasterPlateSingleLevelSingleCell
        level="Upper"
        :ec="item && item.upper && item.upper.ec"
        :fr="item && item.upper && item.upper.fr"
        :volume="item && item.upper && item.upper.volume"
        :slotNumber="item && item.upper && item.upper.slotNumber"
      />

      <div class="cell-divider"></div>

      <MasterPlateSingleLevelSingleCell
        level="Lower"
        :ec="item && item.lower && item.lower.ec"
        :fr="item && item.lower && item.lower.fr"
        :volume="item && item.lower && item.lower.volume"
        :slotNumber="item && item.lower && item.lower.slotNumber"
      />
    
    </div>
  
</template>

<script>
  import MasterPlateSingleLevelSingleCell from '../components/MasterPlateSingleLevelSingleCell';
  export default {
    props: ['item'],
    computed: {
      getCellsWrapperStyles() {
        let result = '.levels-wrapper';
        if (this.item && this.item.frTaken){
          result += ' .is-danger-border';
        }
        return result;
      }
    },
    components: {MasterPlateSingleLevelSingleCell}
  }
</script>

<style>
  .levels-wrapper {
    display: flex;
    flex-direction: column;
  }
  .is-danger-border {
    outline: 2px solid #FC3C63;
  }
  .cell-divider {
    border-bottom: 1px dashed gray;
  }
</style>
