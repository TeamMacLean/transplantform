<template>
  <div>
    <h1 class="title is-2">Contact Us</h1>

    <p>
      For technical issues with the website, please contact the Webmaster
      <a href="mailto:george.deeks@tsl.ac.uk">here</a>.
    </p>

    <br />

    <p>
      For questions about orders, please contact the plant tissue culture
      service <a href="mailto:SL-TC@nbi.ac.uk">here</a>.
    </p>
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
