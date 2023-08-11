<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Construct #{{ theIndex + 1 }}
        <span v-if="incompleteConstruct" class="is-dangerous pl-1rem"
          >Construct incomplete.</span
        ><span v-else class="is-successful pl-1rem">Construct valid</span>
      </p>
      <button class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </header>
    <div class="card-content">
      <div class="row-wrapper">
        <!-- 
        <b-field
          label="Construct Name"
          :type="isConstructNameUnavailable ? 'is-danger' : null"
          :message="
            isConstructNameUnavailable
              ? 'Name duplicated in database or on form'
              : null
          "
        >  
        -->
        <b-field label="Construct Name">
          <b-input
            placeholder="Required"
            v-model="card.constructName"
            required
            maxlength="30"
            :value="card.constructName"
          ></b-input>
        </b-field>

        <b-field label="Construct Description">
          <b-input
            placeholder="Optional"
            v-model="card.description"
            :value="card.description"
            maxlength="50"
            rows="1"
            ref="messageInput"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
      <div class="row-wrapper">
        <b-field label="Construct ID">
          <b-input
            placeholder="Optional - Admins can assign this later"
            v-model="card.shortName"
            maxlength="20"
            :value="card.shortName"
          ></b-input>
        </b-field>
      </div>
      <div class="row-wrapper">
        <b-field label="Binary Vector Backbone">
          <b-input
            placeholder="Required"
            v-model="card.binaryVectorBackbone"
            required
            :value="card.binaryVectorBackbone"
          ></b-input>
        </b-field>

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
      </div>

      <div class="row-wrapper">
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
    //'isConstructNameUnavailable',
    'vectorSelections',
    'tdnaSelections',
    'agroStrains',
  ],
  computed: {
    incompleteConstruct() {
      return (
        !this.card.constructName ||
        !this.card.binaryVectorBackbone ||
        !this.card.vectorSelection ||
        !this.card.agroStrain ||
        !this.card.tdnaSelection //||
        //this.isConstructNameUnavailable customer killed feature
      );
    },
  },
  watch: {
    message: function (newItem, oldItem) {
      let { messageInput } = this.$refs;
      const lineHeightInPixels = 24;

      // Reset messageInput Height
      messageInput.setAttribute(
        `style`,
        `height:${lineHeightInPixels}px;overflow-y:hidden;`
      );

      // Calculate number of lines (soft and hard)
      const height = messageInput.style.height;
      const scrollHeight = messageInput.scrollHeight;
      messageInput.style.height = height;
      const count = Math.floor(scrollHeight / lineHeightInPixels);

      this.$nextTick(() => {
        messageInput.setAttribute(
          `style`,
          `height:${count * lineHeightInPixels}px;overflow-y:hidden;`
        );
      });
    },
  },
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

.is-dangerous {
  color: #ff3860;
  font-style: italic;
}

.pl-1rem {
  padding-left: 1rem;
}

.is-successful {
  color: green;
}
</style>
