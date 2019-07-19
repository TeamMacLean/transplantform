<template>

  <nav class="level">
    <div class="level-item">
      <p class="subtitle is-5">
        <strong>{{stock.name}}</strong>
      </p>
    </div>
    <div class="level-item">
      #{{stock.barcode}}
    </div>
    <p class="level-item"> @{{stock.species}}</p>
  </nav>
</template>

<script>
  export default {
    props: ['stock']
  }
</script>
