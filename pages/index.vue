<template>
  <div class="container-index">
    <div>
      <div>
        <img src="/fridge.png">
      </div>
      <h1 class="heading title title-index has-text-primary">
        <b>fridge</b>
      </h1>
      <h2 class="heading subtitle subtitle-index has-text-primary" style="font-size: 2rem;">
        plate tracking
      </h2>
    </div>
  </div>
</template>

<style>
  .container-index {
    margin: 0 auto;
    min-height: calc(100vh - 55px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title-index {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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

</style>
