<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Construct #{{ theIndex + 1 }}
      </p>
      <button class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </header>
    <div class="card-content">
      <b-field label="Construct Name"
        :type="isConstructNameUnavailable ? 'is-danger' : null"
        :message="isConstructNameUnavailable ? 'Name duplicated' : null"
      >
        <b-input 
          placeholder="Required"
          v-model="card.constructName"
          :value="card.constructName"
        ></b-input>
      </b-field>
    </div>
    <footer class="card-footer" @click="removeConstruct(theIndex)">
      <a 
        href="#"
        v-if="!mustDisableDelete" 
        class="card-footer-item"
      >
        Delete
      </a>
    </footer>
  </div>
</template>

<script>
import { resolveObjectURL } from 'buffer';

  export default {
    name: 'FormConstructCard',
    props: ['removeConstruct', 'theIndex', 'card', 'mustDisableDelete', 'isConstructNameUnavailable'],
  }
</script>
<style>


  .navbar-menu > .navbar-item.is-active {
    background-color: #F7F7F7 !important;
  }
</style>
