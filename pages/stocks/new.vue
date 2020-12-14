<template>
  <div>
    <h1 class="title">New Stock Plate</h1>

    <form @submit="checkFormAndSave">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Stock plate name" v-model="plateName" minlength="5"
                 @input="checkName" required>
        </div>
        <p class="help is-success" v-if="nameIsOk">This plate name is available</p>
      </div>

      <div class="field" v-if="!plate">
        <label class="label">File</label>
        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" name="file" ref="file" id="file" accept=".xlsx"
                   v-on:change="handleFileUpload">
            <span class="file-cta">
      <span class="file-icon">
       <font-awesome-icon :icon="['fas', 'upload']"/>
      </span>
      <span class="file-label" id="file-label">
        Choose a file…
      </span>
    </span>
          </label>
        </div>
        <p class="help is-info">Please select a .xlsx file</p>
      </div>


      <div v-if="plate">
        <Plate 
          :plate="plate" :isEditable="true" :canSpawnMasters="false" checkUniqueFRs="true"
          :onCheckUniqueFRs="onCheckUniqueFRs"/>
      </div>


      <hr/>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-text" type="button" v-on:click="reset">
            Reset
          </button>
        </div>
        <div class="control">
          <button 
            type="submit" 
            :disabled="!canSubmit"
            :class="calculateSubmissionButtonClass(canSubmit)" 
            :data-tooltip="saveErrorText"
          >
            Save
          </button>
        </div>
      </div>
    </form>

    <br/>
    <a href="/test_data.xlsx" class="button is-info is-small">Download test data</a>

  </div>
</template>

<script>
  import XLSX from 'xlsx'
  import Plate from '../../components/Plate'

  export default {
    middleware: 'auth',
    components: {
      Plate
    },
    data() {
      return {
        file: null,
        plate: null,
        plateName: '',
        barcode: '',
        species: '',
        nameIsOk: false,
        frErrors: false,
      }
    },
    methods: {
      calculateSubmissionButtonClass(canSubmit) {

      // v-bind:data-tooltip="saveErrorText" v-bind:class="{'tooltip':!canSubmit, 'has-tooltip-right': true}"
        
        let result = 'button is-primary';
        if (!canSubmit){
          result += ' tooltip has-tooltip-right'
        }




        return result;
      },
      onCheckUniqueFRs(results) {
        this.frErrors = !!results;
      },
      checkName() {

        return this.$axios.$post('/api/stock/check/name', {name: this.plateName})
          .then(res => {
            this.nameIsOk = !!(this.plateName && this.plateName.length > 5 && res && res.ok);
          })
          .catch(err => {
            this.nameIsOk = false;
          })

      },
      handleFileUpload() {
        this.file = this.$refs.file.files[0];
        const vm = this;

        function formatPlate(table) {
          const labels = [
            'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12',
            'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12',
            'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12',
            'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12',
            'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12',
            'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
            'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12',
          ];

          vm.$set(vm, 'barcode', table[0][1]);
          vm.$set(vm, 'species', table[0][3]);

          const plate = {};

          const offset = 2;

          labels.map((label, i) => {
            if (table[i + offset][1] && table[i + offset][2]) {
              plate[labels[i]] = {fr: table[i + offset][1], ec: table[i + offset][2], volume: 900}
            }
          });

          return plate;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, {type: 'array'});
          const table = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1, {header: 1});


          try {
            vm.$set(vm, 'plate', formatPlate(table));
          } catch (err) {
            console.error(err);
          }

        };
        reader.readAsArrayBuffer(this.file);
      },

      checkFormAndSave: function (e) {
        e.preventDefault();
        if (this.canSubmit) {
          this.save();
        }
      },
      save() {

        return this.$axios.post('/api/stock/new', {
          stock: {
            name: this.plateName,
            barcode: this.barcode,
            species: this.species,
            plate: this.plate
          }
        })
          .then((res) => {
            this.$router.push({
              path: `/stocks/${res.data.stock._id}`
            })
          })
          .catch(err => {
            console.error(err);
          })
      },
      reset() {
        this.file = null;
        this.plate = null;
        this.plateName = '';
        this.checkName();
      }
    },
    computed: {
      canSubmit() {
        return this.plate && this.nameIsOk && !this.frErrors
      },
      saveErrorText() {
        if (!this.plate) {
          return 'Error: No Plate'
        } else if (!this.nameIsOk) {
          return 'Error: Name is not valid'
        } else {
          return 'Error: One of more FR numbers are already in use'
        }
      }
    },

  }
</script>
