<template>
  <div class="container-index">
    <div>
      <div>
        <img src="/transplant.png" alt="FRIDGE Logo">
      </div>
      <h1 class="heading title title-index has-text-primary">
        <b>TransPlant</b>
      </h1>
      <p>
        <!-- TODO revert -->
        <!-- Welcome to the TSL Plant Transformation service -->
        Auth User: {{this.$auth && this.$auth.user && this.$auth.user.name}}
      </p>
      <p>
        Store User: {{this.$store.getters.getUser}}
      </p>
      <p>
        Store Counter: {{this.$store.getters.getCounter}}
      </p>
      <p>
        Auth: {{this.gary}}
      </p>
      <NuxtLink to="/new">
        <b-button>
          New Request
        </b-button>
      </NuxtLink>
      <div class="spaced">Any problems? Please <a href="mailto:SL-TC@nbi.ac.uk">contact us by email</a>.</div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        submitting: false,
      }
    }
  }
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
