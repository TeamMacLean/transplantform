<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <font-awesome-icon :icon="['fas', 'grip-horizontal']" class="fa-3x"/>
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{stock.name}}</p>
          <p class="subtitle is-6">#{{stock.barcode}} @{{stock.species}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['stock']
  }
</script>
