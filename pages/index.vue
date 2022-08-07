<template>
  <div class="container-index">
    <div>
      <div>
        <img src="/transplant.png" alt="Transplant Logo" />
      </div>
      <h1 class="heading title title-index has-text-primary">
        <b>TransPlant</b>
      </h1>
      <p>Welcome to the TSL Plant Transformation service</p>
      <br />
      <NuxtLink to="/new">
        <b-button> New Request </b-button>
      </NuxtLink>
      <div class="spaced">
        Any problems? Please <NuxtLink to="/contact">contact us here</NuxtLink>.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      submitting: false,
    };
  },
};
</script>

<style scoped>
img {
  width: 200px;
}

.container-index {
  margin: 0 auto;
  min-height: calc(100vh - 55px);
  display: flex;
  justify-content: center;
  text-align: center;
}

.title-index {
  display: block;
  font-weight: 300 !important;
  font-size: 100px !important;
  letter-spacing: 1px !important;
}

.subtitle-index {
  font-weight: 300 !important;
  font-size: 42px !important;
  word-spacing: 5px !important;
  padding-bottom: 15px !important;
}

.spaced {
  padding-top: 25px;
}
</style>
