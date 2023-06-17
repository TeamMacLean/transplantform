<template>
  <div :class="getWrapperClass">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Construct #{{ theIndex + 1 }}</p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="row-wrapper">
          <b-field label="Construct Name">
            <div>{{ card.constructName }}</div>
          </b-field>
          <b-field label="Short Name">
            <div>{{ card.shortName || '[None set]' }}</div>
          </b-field>
          <b-field label="Binary Vector Backbone">
            <div>{{ card.binaryVectorBackbone }}</div>
          </b-field>
        </div>

        <div class="row-wrapper">
          <b-field label="Vector Selection">
            <div>{{ card.vectorSelection }}</div>
          </b-field>
          <b-field label="T-DNA Selection">
            <div>{{ card.tdnaSelection }}</div>
          </b-field>
          <b-field label="AgroStrain">
            <div>{{ card.agroStrain }}</div>
          </b-field>
        </div>

        <div class="row-wrapper">
          <b-field label="Description">
            <div>{{ card.description || '[None set]' }}</div>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormConstructCard',
  props: ['theIndex', 'card', 'status'],
  computed: {
    getWrapperClass() {
      return this.status === 'deleted' ? 'deleted-wrapper' : '';
    },
  },
};
</script>
<style scoped>
.deleted-wrapper {
  z-index: -1;
  opacity: 40%;
}

.row-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.row-wrapper > * {
  flex: 1;
}

.row-wrapper > *:not(:first-child) {
  margin-left: 20px;
}
</style>
