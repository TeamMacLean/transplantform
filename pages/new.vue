<template>
  <div>
    <h1 class="title is-2">New Request</h1>

    <h3 v-if="isAdmin" class="title is-4">I am an admin user</h3>
    <h3 v-else-if="isGroupLeader" class="title is-4">I am a group leader</h3>
    <h3 v-else class="title is-4">I am a regular user</h3>

    <form>
      <b-field grouped>
        <b-field class="field">
          <label class="label custom-label">Date</label>
          <b-input
            v-model="date"
            required
            disabled
            class="custom-b-input"
          ></b-input>
        </b-field>

        <b-field v-if="!isAdmin">
          <label class="label">Username</label>
          <b-input
            v-model="username"
            required
            readonly
            class="custom-b-input"
          ></b-input>
        </b-field>
        <b-field grouped v-else>
          <div class="entire-field">
            <div class="label-and-input">
              <label class="label">Username</label>
              <b-input
                class="custom-b-input"
                v-model="username"
                required
              ></b-input>
            </div>

            <p class="username-message">
              Ensure correct username if manual entry - typos unforgiven!
            </p>
          </div>
        </b-field>

        <b-field v-if="signatories.length === 0">
          <div class="wrap-warning">
            <div>Warning: no signatories found!</div>
            <div>Please contact admin.</div>
          </div>
        </b-field>
        <b-field v-else-if="signatories.length === 1">
          <label class="label">Signatory</label>
          <b-input
            v-model="selectedsignatory"
            readonly
            required
            class="custom-b-input"
          ></b-input>
        </b-field>
        <b-field grouped v-else>
          <label class="label">Signatory</label>
          <b-select
            placeholder="Required"
            class="custom-b-input"
            v-model="selectedsignatory"
            required
          >
            <option
              v-for="option in signatories"
              :value="option.username"
              :key="option.username"
            >
              {{ option.name }}
            </option>
          </b-select>
        </b-field>
      </b-field>

      <hr />

      <b-field grouped>
        <b-field grouped>
          <div class="entire-field">
            <div class="label-and-input">
              <label class="label">Species</label>
              <b-select
                placeholder="Required"
                class="custom-b-input"
                v-model="selectedspecies"
                required
              >
                <option v-for="option in species" :value="option" :key="option">
                  {{ option }}
                </option>
              </b-select>
            </div>

            <p class="username-message">
              Please contact us if your species is unavailable
            </p>
          </div>
        </b-field>

        <b-field grouped>
          <div class="entire-field">
            <div class="label-and-input">
              <label class="label">Genotype</label>
              <b-autocomplete
                rounded
                class="custom-b-input"
                v-model="typedGenotype"
                :data="autocompleteGenotypes"
                required
                placeholder="Type to start search..."
                icon="magnify"
                clearable
                @select="(option) => (selected = option)"
              >
                <template #empty>No results found</template>
              </b-autocomplete>
            </div>
            <p class="username-message">
              Please find your genotype above, or type in a new entry to use
              instead
            </p>
          </div>
        </b-field>
      </b-field>

      <hr />

      <h3 class="title is-3">Constructs</h3>
      <h3 class="title is-6">Please create in priority order</h3>

      <div class="form-construct-cards-wrapper">
        <FormConstructCard
          v-for="(card, index) in formConstructCards"
          :theIndex="index"
          :card="card"
          :mustDisableDelete="onlyOneFormConstructCard"
          :key="index"
          :vectorSelections="vectorSelections"
          :tdnaSelections="tdnaSelections"
          :agroStrains="agroStrains"
          :removeConstruct="removeConstruct"
          :isConstructNameUnavailable="isConstructNameUnavailable(index)"
        />
        <b-button @click="addConstruct" class="add-construct-button"
          >Add Construct</b-button
        >
      </div>

      <hr />

      <b-field label="Notes to add">
        <b-input
          placeholder="If important construct priorities, please list here..."
          maxlength="200"
          type="textarea"
          v-model="notes"
        ></b-input>
      </b-field>

      <hr />

      <b-button @click.prevent="submitForm" :disabled="!canSubmitForm"
        >Submit</b-button
      >
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import FormConstructCard from '../components/FormConstructCard.vue';
import {
  getAutocompleteGenotypes,
  getSpecies,
  getPreviousConstructNames,
  getVectorSelections,
  getTdnaSelections,
  getAgroStrains,
} from '../modules/hardcodedData.js';

export default {
  middleware: 'auth',
  components: {
    FormConstructCard,
  },

  // TODO async data fetching
  data() {
    const { user } = this.$auth.$state;
    const { username, isAdmin, signatories, isGroupLeaderForObj } = user;

    const todaysDate = moment().format('DD-MM-YYYY');

    // TODO async
    const species = getSpecies();
    // TODO async
    const autocompleteGenotypes = getAutocompleteGenotypes();
    // TODO async
    const previousConstructNames = getPreviousConstructNames();
    // TODO async
    const vectorSelections = getVectorSelections();
    // TODO async
    const tdnaSelections = getTdnaSelections();
    // TODO async
    const agroStrains = getAgroStrains();

    return {
      date: todaysDate,
      username: username,
      isAdmin: isAdmin,
      signatories: signatories,
      isGroupLeaderForObj: isGroupLeaderForObj,
      selectedsignatory: signatories.length === 1 ? signatories[0].name : null,
      species: species,
      selectedspecies: null,
      autocompleteGenotypes: autocompleteGenotypes,
      typedGenotype: '',
      previousConstructNames: previousConstructNames,
      formConstructCards: [
        {
          constructName: '',
          binaryVectorBackbone: '',
          vectorSelection: null,
          tdnaSelection: null,
          agroStrain: null,
        },
      ],
      vectorSelections: vectorSelections,
      tdnaSelections: tdnaSelections,
      agroStrains: agroStrains,
      notes: '',
    };
  },
  methods: {
    // TODO trim whitespace from admin username
    submitForm() {
      const isGroupLeaderFor = this.isGroupLeaderForObj
        ? this.isGroupLeaderForObj.username
        : null;

      const signatoryObj = this.selectedsignatory
        ? this.signatories.find(
            (signatory) => signatory.name === this.selectedsignatory
          )
        : null;

      const newFormObj = {
        date: this.date,
        username: this.username,
        creatorIsAdmin: this.isAdmin,
        creatorIsGroupLeaderFor: isGroupLeaderFor,
        signatoryObj: signatoryObj,
        species: this.selectedspecies,
        genotype: this.typedGenotype,
        formConstructCards: this.formConstructCards,
        notes: this.notes,
      };

      // console.log('newFormObj');
      // console.log(newFormObj);
      // return;

      return this.$axios
        .post('/api/form/new', newFormObj)
        .then((res) => {
          this.$router.push({
            path: `/form?id=${res.data.id}`,
          });
        })
        .catch((err) => {
          console.error(err);
          this.$buefy.toast.open({
            message: 'Unexpected error. Please contact system admin.',
            type: 'is-danger',
          });
        });
    },
    addConstruct() {
      const newFormConstructCards = [
        ...this.formConstructCards,
        {
          constructName: '',
          binaryVectorBackbone: '',
          vectorSelection: null,
          tdnaSelection: null,
          agroStrain: null,
        },
      ];

      this.formConstructCards = newFormConstructCards;
    },
    removeConstruct(index) {
      let newCards = this.formConstructCards.slice();
      newCards.splice(index, 1);

      this.formConstructCards = newCards;
    },
    isConstructNameUnavailable: function (index) {
      const unavailableConstructNames =
        this.getUnavailableConstructNames(index);
      if (!unavailableConstructNames || !unavailableConstructNames.length) {
        return false;
      }

      const targetConstructName = this.formConstructCards[index].constructName;

      return unavailableConstructNames.includes(targetConstructName);
    },
    getUnavailableConstructNames: function (index) {
      const amended = this.formConstructCards.slice();
      amended.splice(index, 1);
      const currentOtherNames = amended.map((card) => card.constructName);
      return this.previousConstructNames.concat(currentOtherNames);
    },
  },
  computed: {
    canSubmitForm: function () {
      if (
        !this.date ||
        !this.username ||
        !this.selectedsignatory ||
        !this.selectedspecies ||
        !this.typedGenotype
      ) {
        return false;
      }

      let cardsAreValid = true;
      this.formConstructCards.forEach((card) => {
        if (
          !card.constructName ||
          !card.binaryVectorBackbone ||
          !card.vectorSelection ||
          !card.tdnaSelection ||
          !card.agroStrain
        ) {
          cardsAreValid = false;
        }
      });

      return cardsAreValid;
    },

    filteredDataArray() {
      return this.autocompleteGenotypes.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.typedGenotype.toLowerCase()) >= 0
        );
      });
    },
    onlyOneFormConstructCard: function () {
      return this.formConstructCards.length === 1;
    },
  },
};
</script>

<style scoped>
.username-message {
  font-size: 0.75rem;
}

.entire-field {
  display: flex;
  flex-direction: column;
}

.label-and-input {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.custom-b-input {
  margin-left: 10px;
}

.custom-label {
  margin-bottom: 0 !important;
  display: flex;
  flex-direction: column;
}

.wrap-warning {
  display: flex;
  flex-direction: column;
  color: red;
}

.form-construct-cards-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}

.form-construct-cards-wrapper > div {
  margin-bottom: 30px;
}
</style>
