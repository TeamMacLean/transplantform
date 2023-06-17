<template>
  <div>
    <b-loading is-full-page v-model="loading"></b-loading>

    <h1 class="title is-2">New Request</h1>

    <b-button @click="openChooseOldFormModal" type="is-info is-light"
      >Clone previous form contents</b-button
    >

    <b-modal
      :active.sync="isOldFormsModalActive"
      :can-cancel="['escape', 'outside', 'x']"
      has-modal-card
      class="card scrollable-content"
      full-screen
    >
      <div class="card">
        <div class="oldFormSelectWrapper">
          <h2 class="title is-3">
            Click to select a previously submitted form:
          </h2>
          <div>
            Then click confirm below the results to select or cancel. (Press
            'Esc' to close.)
          </div>

          <div class="tableWrapper">
            <b-table
              :data="oldFormsList"
              :selected.sync="selectedOldForm"
              focusable
            >
              <b-table-column field="date" label="Date" v-slot="props">
                {{ props.row.date }}
              </b-table-column>
              <b-table-column field="trfId" label="Trf ID" v-slot="props">
                {{ props.row.trfId }}
              </b-table-column>
              <b-table-column
                v-if="isAdmin"
                field="username"
                label="Username"
                v-slot="props"
              >
                {{ props.row.username }}
              </b-table-column>
              <b-table-column field="species" label="Species" v-slot="props">
                {{ props.row.species }}
              </b-table-column>
              <b-table-column field="genotype" label="Genotype" v-slot="props">
                {{ props.row.genotype }}
              </b-table-column>
              <b-table-column
                field="constructNames"
                label="Construct Names"
                v-slot="props"
              >
                <div
                  v-for="(constructObj, index) in props.row.constructs"
                  :key="index"
                >
                  {{ constructObj.constructName }}
                </div>
              </b-table-column>
            </b-table>
          </div>
          <b-field>
            <b-button
              type="is-success"
              :disabled="!selectedOldForm"
              @click="selectOldForm"
              >Confirm</b-button
            >
            <b-button
              class="ml10"
              type="is-danger"
              @click="closeChooseOldFormModal"
              >Cancel</b-button
            >
          </b-field>
        </div>
      </div>
    </b-modal>

    <hr />

    <form v-if="!fetchingError">
      <div class="row-wrapper">
        <div class="pl10">
          <b-field v-if="!isAdmin">
            <label class="label">Username</label>
            <b-input
              v-model="username"
              required
              disabled
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
        </div>
        <div class="pl10">
          <b-field v-if="signatories.length === 0">
            <div class="wrap-warning">
              <div>Warning: no signatories found!</div>
              <div>Please contact admin.</div>
            </div>
          </b-field>
          <b-field grouped v-else-if="signatories.length === 1">
            <label class="label">Signatory</label>
            <b-input
              :value="selectedSignatory.name"
              readonly
              disabled
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
                v-for="(option, index) in signatories"
                :value="option"
                :key="index"
              >
                {{ option.name }}
              </option>
            </b-select>
          </b-field>
        </div>
        <b-field class="field">
          <label class="label custom-label">Date</label>
          <b-input
            v-model="date"
            required
            disabled
            class="custom-b-input"
          ></b-input>
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
                <option
                  v-for="(option, index) in species"
                  :value="option"
                  :key="index"
                >
                  {{ option }}
                </option>
              </b-select>
            </div>

            <p class="username-message">
              Please contact us if your species is unavailable
            </p>
          </div>
        </b-field>

        <b-field
          grouped
          :type="{ 'is-danger': clearedTypedGenotypeField }"
          :message="clearedTypedGenotypeField ? 'Please create a Genotype' : ''"
        >
          <div class="entire-field">
            <div class="label-and-input">
              <label class="label">Genotype</label>
              <b-autocomplete
                rounded
                class="custom-b-input"
                v-model="typedGenotype"
                :data="filteredAutocompleteGenotypes"
                placeholder="Type to start search..."
                icon="magnify"
                clearable
                @select="(option) => (selected = option)"
              >
                <template #empty>No results found</template>
              </b-autocomplete>
            </div>
            <p class="username-message">
              Start typing to find previously selected genotypes on our system.
              Entering a new genotype is possible and will be added to our
              system.
            </p>
          </div>
        </b-field>
      </div>

      <hr />

      <h3 class="title is-3">Constructs</h3>
      <div class="title is-6">
        <span>Please create in priority order. </span
        ><span v-if="onlyOneConstructAndItIsEmpty" class="is-dangerous"
          >At least 1 construct must be created.</span
        >
      </div>

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
          >Add Another Construct</b-button
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

      <b-button
        type="is-success"
        @click.prevent="submitForm"
        :disabled="!canSubmitForm"
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
  asyncData({ $axios }) {
    return $axios
      .get('/api/form/new')
      .then((res) => {
        const todaysDate = moment().format('DD-MM-YYYY');

        const {
          species,
          genotypes,
          vectorSelections,
          tdnaSelections,
          agroStrains,
          previousConstructNames,
          sessionUser,
          oldFormsFromUser,
        } = res.data;

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

        const activeSpecies = getActiveNamesFromObj(species);
        const activeGenotypes = getActiveNamesFromObj(genotypes);
        const activeVectorSelections = getActiveNamesFromObj(vectorSelections);
        const activeTdnaSelections = getActiveNamesFromObj(tdnaSelections);
        const activeAgroStrains = getActiveNamesFromObj(agroStrains);

        const { username, isAdmin, signatories, isGroupLeaderForObj } =
          sessionUser;
        const selectedSignatory =
          signatories.length === 1 ? signatories[0] : null;

        return {
          date: todaysDate,
          fetchingError: '',
          username,
          isAdmin,
          signatories,
          isGroupLeaderForObj,
          selectedSignatory,
          sessionUser: res.data.sessionUser,
          species: activeSpecies,
          selectedSpecies: null,
          autocompleteGenotypes: activeGenotypes,
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
              description: '',
            },
          ],
          vectorSelections: activeVectorSelections,
          tdnaSelections: activeTdnaSelections,
          agroStrains: activeAgroStrains,
          notes: '',
          loading: false,
          isOldFormsModalActive: false,
          oldFormsList: oldFormsFromUser,
          selectedOldForm: null,
          temp: false,
          clearedTypedGenotypeField: false,
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
  watch: {
    typedGenotype(newValue, oldValue) {
      // determine is user has cleared the typed genotype field
      if (oldValue && !newValue) {
        this.clearedTypedGenotypeField = true;
      } else if (
        oldValue === '' &&
        this.clearedTypedGenotypeField &&
        newValue !== oldValue
      ) {
        this.clearedTypedGenotypeField = false;
      }
    },
  },
  methods: {
    submitForm() {
      this.loading = true;
      const isGroupLeader = !!this.isGroupLeaderForObj;

      const newFormObj = {
        date: this.date,
        username: this.username.trim().toLowerCase(),
        creatorIsAdmin: this.isAdmin,
        creatorIsGroupLeader: isGroupLeader,
        signatoryObj: this.selectedSignatory,
        species: this.selectedSpecies.trim(),
        genotype: this.typedGenotype.trim(),
        constructs: this.constructs.map((construct) => ({
          constructName: construct.constructName.trim(),
          binaryVectorBackbone: construct.binaryVectorBackbone.trim(),
          vectorSelection: construct.vectorSelection.trim(),
          tdnaSelection: construct.tdnaSelection.trim(),
          agroStrain: construct.agroStrain.trim(),
          description: construct.description.trim(),
        })),
        notes: this.notes.trim(),
      };

      return this.$axios
        .post('/api/form/new', newFormObj)
        .then((res) => {
          if (res.status === 200) {
            console.log('created form, trfId:', res.data.trfId, res.trfId);
            if (res.data.error) {
              this.loading = false;
              this.$buefy.toast.open({
                message:
                  'Form added to database but another error occurred: ' +
                  res.data.error,
                type: 'is-danger',
              });
              this.$router.push('/new');
            } else {
              this.loading = false;
              this.$buefy.toast.open({
                message: 'Added to database!',
                type: 'is-success',
              });
              if (!!res.data.trfId) {
                this.loading = false;
                this.$router.push(`/form?id=${res.data.trfId}`);
              } else {
                this.loading = false;
                this.$router.push('/new');
              }
            }
          } else if (res.status === 500 && res.data.error) {
            this.loading = false;
            this.$buefy.toast.open({
              message: 'Unexpected error. Please contact system admin.',
              type: 'is-danger',
            });
            this.$router.push('/new');
          } else {
            this.loading = false;
            this.$buefy.toast.open({
              message: 'Unexpected error. Please contact system admin.',
              type: 'is-danger',
            });
            this.$router.push('/new');
          }
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
          this.$buefy.toast.open({
            message:
              err.message || 'Unexpected error. Please contact system admin.',
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
          description: '',
        },
      ];

      this.constructs = newConstructs;
    },
    closeChooseOldFormModal() {
      this.selectedOldForm = null;
      this.isOldFormsModalActive = false;
    },
    openChooseOldFormModal() {
      this.isOldFormsModalActive = true;
    },
    selectOldForm() {
      let warningString = '';

      if (this.species.includes(this.selectedOldForm.species)) {
        this.selectedSpecies = this.selectedOldForm.species;
      } else {
        warningString += `Species '${this.selectedOldForm.species}' not in list of active species. Please select a new species. `;
      }

      const oldFormSigIdString = this.oldFormsList.find(
        (form) => form.trfId === this.selectedOldForm.trfId
      ).signatoryId;

      const availableSignatoriesIdStrings = this.signatories.map((s) => s._id);

      if (availableSignatoriesIdStrings.includes(oldFormSigIdString)) {
        this.selectedSignatory = this.signatories.find(
          (s) => s._id === oldFormSigIdString
        );
      } else {
        warningString += `Signatory '${this.selectedOldForm.signatoryObj}' unavailable. Please select a new signatory.`;
      }

      this.typedGenotype = this.selectedOldForm.genotype;
      this.selectedGenotype = this.selectedOldForm.genotype;

      this.constructs = this.selectedOldForm.constructs;

      this.notes = this.selectedOldForm.notes;

      if (warningString) {
        this.$buefy.toast.open({
          message: warningString,
          type: 'is-warning',
        });
      } else {
        this.$buefy.toast.open({
          message: `Form TRF${this.selectedOldForm.trfId} copied! Please change construct names as necessary!`,
          type: 'is-success',
        });
      }

      this.selectedOldForm = null;
      this.isOldFormsModalActive = false;
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
    onlyOneConstructAndItIsEmpty: function () {
      if (this.constructs.length !== 1) {
        return false;
      } else if (
        this.constructs[0].constructName === '' &&
        this.constructs[0].binaryVectorBackbone === '' &&
        this.constructs[0].vectorSelection === null &&
        this.constructs[0].tdnaSelection === null &&
        this.constructs[0].agroStrain === null
      ) {
        return true;
      } else {
        return false;
      }
    },
    filteredAutocompleteGenotypes: function () {
      if (!this.typedGenotype || this.typedGenotype === '') {
        return this.autocompleteGenotypes;
      } else {
        const unfiltered = this.autocompleteGenotypes.slice();
        const filtered = unfiltered.filter((genotypeStr) => {
          return (
            genotypeStr
              .toLowerCase()
              .indexOf(this.typedGenotype.toLowerCase()) !== -1
          );
        });
        return filtered;
      }
    },
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
      this.constructs.forEach((card, index) => {
        if (
          !card.constructName ||
          !card.binaryVectorBackbone ||
          !card.vectorSelection ||
          !card.tdnaSelection ||
          !card.agroStrain ||
          this.isConstructNameUnavailable(index)
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
  color: #ff3860;
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

.pl10 {
  padding-left: 10px;
}

.ml10 {
  margin-left: 10px;
}

.oldFormSelectWrapper {
  padding: 2rem;
}

.tableWrapper {
  margin-bottom: 20px;
  margin-top: 10px;
}

.scrollable-content {
  overflow-y: auto;
}

.is-dangerous {
  color: #ff3860;
  font-style: italic;
}
</style>
