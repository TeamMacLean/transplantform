<template>
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
        <b-field
          label="Construct Name"
          :type="isConstructNameUnavailable ? 'is-danger' : null"
          :message="
            isConstructNameUnavailable
              ? 'Name duplicated in database or on form'
              : null
          "
        >
          <b-input
            placeholder="Required"
            v-model="card.constructName"
            required
            maxlength="30"
            :value="card.constructName"
          ></b-input>
        </b-field>

        <b-field label="Binary Vector Backbone">
          <b-input
            placeholder="Required"
            v-model="card.binaryVectorBackbone"
            required
            :value="card.binaryVectorBackbone"
          ></b-input>
        </b-field>
      </div>

      <div class="row-wrapper">
        <b-field grouped>
          <div class="entire-field">
            <div class="label-and-input">
              <label class="label">Vector Selection</label>
              <b-select
                placeholder="Required"
                class="custom-b-input"
                v-model="card.vectorSelection"
                required
              >
                <option
                  v-for="option in vectorSelections"
                  :value="option"
                  :key="option"
                >
                  {{ option }}
                </option>
              </b-select>
            </div>
          </div>
        </b-field>

        <b-field grouped>
          <div class="entire-field">
            <div class="label-and-input">
              <label class="label">T-DNA Selection</label>
              <b-select
                placeholder="Required"
                class="custom-b-input"
                required
                v-model="card.tdnaSelection"
              >
                <option
                  v-for="option in tdnaSelections"
                  :value="option"
                  :key="option"
                >
                  {{ option }}
                </option>
              </b-select>
            </div>
          </div>
        </b-field>

        <b-field grouped>
          <div class="entire-field">
            <div class="label-and-input">
              <label class="label">AgroStrains</label>
              <b-select
                placeholder="Required"
                class="custom-b-input"
                v-model="card.agroStrain"
                required
              >
                <option
                  v-for="option in agroStrains"
                  :value="option"
                  :key="option"
                >
                  {{ option }}
                </option>
              </b-select>
            </div>
          </div>
        </b-field>
      </div>
    </div>

    <footer class="card-footer" @click="removeConstruct(theIndex)">
      <a href="#" v-if="!mustDisableDelete" class="card-footer-item">
        Delete
      </a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FormConstructCard',
  props: [
    'removeConstruct',
    'theIndex',
    'card',
    'mustDisableDelete',
    'isConstructNameUnavailable',
    'vectorSelections',
    'tdnaSelections',
    'agroStrains',
  ],
};
</script>
<style scoped>
.row-wrapper {
  display: flex;
  flex-direction: row;
}

.row-wrapper > * {
  flex: 1;
}

.row-wrapper > *:not(:first-child) {
  padding-left: 20px;
}
</style>
