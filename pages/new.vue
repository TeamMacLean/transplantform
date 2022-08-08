<template>
  <div>
    <h1 class="title is-2">New Request</h1>

    <form v-if="!fetchingError">
      <div class="row-wrapper">
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
              Ensure correct username & signatory if manual entry - typos
              unforgiven! (<b>Admin</b> only)
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
            v-model="selectedSignatory"
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
            v-model="selectedSignatory"
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
      </div>

      <hr />

      <div class="row-wrapper">
        <b-field grouped>
          <div class="entire-field">
            <div class="label-and-input">
              <label class="label">Species</label>
              <b-select
                placeholder="Required"
                class="custom-b-input"
                v-model="selectedSpecies"
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
      </div>

      <hr />

      <h3 class="title is-3">Constructs</h3>
      <h3 class="title is-6">Please create in priority order</h3>

      <div class="form-construct-cards-wrapper">
        <FormConstructCard
          v-for="(card, index) in constructs"
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
    <div v-else>
      <div class="error-message">
        <div class="title is-3">Error</div>
        <div class="message">{{ fetchingError }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import FormConstructCard from '../components/FormConstructCard.vue';

export default {
  middleware: 'auth',
  components: {
    FormConstructCard,
  },
  mounted() {
    const { user } = this.$auth.$state;
    const { username, isAdmin, signatories, isGroupLeaderForObj } = user;

    this.username = username;
    this.isAdmin = isAdmin;
    this.signatories = signatories;
    this.selectedSignatory =
      signatories.length === 1 ? signatories[0].name : null;
    this.isGroupLeaderForObj = isGroupLeaderForObj;
  },
  asyncData({ $axios }) {
    return $axios
      .get('/api/form/new')
      .then((res) => {
        const todaysDate = moment().format('DD-MM-YYYY');

        const getActiveNamesFromObj = (arrOfObj) => {
          if (!arrOfObj) {
            return [];
          }
          if (!arrOfObj.length) {
            return [];
          }
          return arrOfObj
            .filter((obj) => !obj.archived)
            .map((filteredObj) => filteredObj.name);
        };

        const species = getActiveNamesFromObj(res.data.species);
        const autocompleteGenotypes = getActiveNamesFromObj(res.data.genotypes);
        const vectorSelections = getActiveNamesFromObj(
          res.data.vectorSelections
        );
        const tdnaSelections = getActiveNamesFromObj(res.data.tdnaSelections);
        const agroStrains = getActiveNamesFromObj(res.data.agroStrains);
        const previousConstructNames = res.data.previousConstructNames;

        return {
          date: todaysDate,
          fetchingError: '',
          username: '',
          isAdmin: false,
          signatories: [],
          isGroupLeaderForObj: null,
          selectedSignatory: null,

          species: species,
          selectedSpecies: null,
          autocompleteGenotypes: autocompleteGenotypes,
          typedGenotype: '',
          previousConstructNames: previousConstructNames.map((name) =>
            name.trim()
          ),
          constructs: [
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
      })
      .catch((err) => {
        console.error(err);
        return {
          fetchingError:
            'Error fetching data. Please try again later or contact system admin.',
        };
      });
  },
  methods: {
    submitForm() {
      const selectedSignatoryObj = this.signatories.find(
        (signatory) => signatory.username === this.selectedSignatory
      );
      const isGroupLeader = !!this.isGroupLeaderForObj;

      const newFormObj = {
        date: this.date,
        username: this.username.trim(),
        creatorIsAdmin: this.isAdmin,
        creatorIsGroupLeader: isGroupLeader,
        signatoryObj: selectedSignatoryObj, // backend will fetch obj
        species: this.selectedSpecies.trim(),
        genotype: this.typedGenotype.trim(),
        constructs: this.constructs.map((construct) => ({
          constructName: construct.constructName.trim(),
          binaryVectorBackbone: construct.binaryVectorBackbone.trim(),
          vectorSelection: construct.vectorSelection.trim(),
          tdnaSelection: construct.tdnaSelection.trim(),
          agroStrain: construct.agroStrain.trim(),
        })),
        notes: this.notes.trim(),
      };

      return this.$axios
        .post('/api/form/new', newFormObj)
        .then((res) => {
          this.$router.push({
            path: `/form?id=${res.data.trfId}`,
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
      const newConstructs = [
        ...this.constructs,
        {
          constructName: '',
          binaryVectorBackbone: '',
          vectorSelection: null,
          tdnaSelection: null,
          agroStrain: null,
        },
      ];

      this.constructs = newConstructs;
    },
    removeConstruct(index) {
      let newCards = this.constructs.slice();
      newCards.splice(index, 1);

      this.constructs = newCards;
    },
    isConstructNameUnavailable: function (index) {
      // no error message if no construct name
      if (this.constructs[index].constructName === '') {
        return false;
      }

      const unavailableConstructNames =
        this.getUnavailableConstructNames(index);
      if (!unavailableConstructNames || !unavailableConstructNames.length) {
        return false;
      }

      const targetConstructName = this.constructs[index].constructName.trim();

      return unavailableConstructNames.includes(targetConstructName);
    },
    getUnavailableConstructNames: function (index) {
      const amended = this.constructs.slice();
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
        !this.selectedSignatory ||
        !this.selectedSpecies ||
        !this.typedGenotype
      ) {
        return false;
      }

      let cardsAreValid = true;
      this.constructs.forEach((card) => {
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
      return this.constructs.length === 1;
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
  margin-bottom: 20px;
}

.row-wrapper {
  display: flex;
  flex-direction: row;
}

.row-wrapper > * {
  flex: 1;
}
</style>
