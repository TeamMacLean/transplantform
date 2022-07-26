<template>
  <div class="container-index">
    <div>
      <div>
        <img src="/transplant.png" alt="FRIDGE Logo">
      </div>
      <h1 class="heading title title-index has-text-primary">
        <b>TransPlant</b>
      </h1>
      <h2 class="heading subtitle subtitle-index has-text-primary">
        <!-- Welcome to the TSL Plant Transformation service -->
        Auth User: {{this.$auth && this.$auth.user && this.$auth.user.name}}
      </h2>
      <h2 class="heading subtitle subtitle-index has-text-primary">
        Store User: {{this.$store.getters.getUser}}
      </h2>
      <h2 class="heading subtitle subtitle-index has-text-primary">
        Store Counter: {{this.$store.getters.getCounter}}
      </h2>
      <h2 class="heading subtitle subtitle-index has-text-primary">
        Auth: {{this.gary}}
      </h2>
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
        gary: JSON.stringify(this.$auth.loggedIn)
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
