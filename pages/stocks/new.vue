<template>
  <div>
    <h1 class="title">New Stock Plate</h1>

    <form @submit="checkFormAndSave">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <b-field
            :type="nameInputErrorMessage && 'is-danger'"
            :message="nameInputErrorMessage"
          >
            <b-input
              placeholder="Stock plate name"
              v-model="plateName"
              minlength="5"
              @blur="checkName"
              required
            ></b-input>
          </b-field>
        </div>
        <p class="help is-success" v-if="nameIsOk">This plate name is available</p>
      </div>

      <b-field label="Type">
        <b-input v-model="type" maxlength="20"></b-input>
      </b-field>

      <b-field label="Receptor Type">
        <b-input v-model="receptorType" maxlength="30"></b-input>
      </b-field>

      <b-field label="Optimisation for plate">
          <b-select required v-model="optimisation" placeholder="Select an optimisation">
              <option value="soybean">Soybean-optimised</option>
              <option value="corn">Corn-optimised</option>
          </b-select>
      </b-field>

      <br />

      <div class="field" v-if="!plate">
        
          <label class="label">File</label>
          <b-field class="file is-primary" :class="{'has-name': !!file}">
            <b-upload v-model="file" class="file-label" :loading="isFileUploading">
                <span class="file-cta">
                    <b-icon class="file-icon" icon="upload"></b-icon>
                    <span class="file-label">Click to upload</span>
                </span>
                <span class="file-name" v-if="file">
                    {{ file.name }}
                </span>
            </b-upload>
          </b-field>

          <p class="help is-info">Please select a .xlsx file</p>

        <!-- file but no plate -->
        <b-button @click="createPlate" v-if="this.file" :loading="isCreatingPlate">
          Create Plate
        </b-button>
      </div>

      <div v-if="plate">
        <Plate 
          :plate="plate"
          :isEditable="true"
          :canSpawnMasters="false"
          checkUniqueFRs="true"
          :onCheckUniqueFRs="onCheckUniqueFRs"
        />
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
            :data-tooltip="canSubmit ? 'Submit me!' : saveErrorText"
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
        type: '',
        optimisation: '',
        receptorType: '',
        isFileUploading: false,
        isCreatingPlate: false,
        nameInputErrorMessage: '',
      }
    },
    methods: {
      calculateSubmissionButtonClass(canSubmit) {        
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
        // this.plateName && console.log('name to check', this.plateName)
        let targetName = this.plateName;
        this.nameIsOk = false;
        this.nameInputErrorMessage = '';

        if (targetName === ''){
          this.nameIsOk = false;
          this.nameInputErrorMessage = 'Name field is empty';  
                  
          return;
        }

        if (targetName.length < 6){
          this.nameIsOk = false;
          this.nameInputErrorMessage = 'Name field is must be at least 6 characters long';
          return;
        }
        
        return this.$axios.$post('/api/stock/check/name', {name: targetName})
          .then(res => {
            this.nameIsOk = res.ok;
            this.nameInputTypeAndMessage = res.ok ? null : 'Name field is already in database'
          })
          .catch(err => {
            console.error(err)
            this.nameIsOk = false;
            this.nameInputErrorMessage = 'Issue with checking name in database. Try again later, or contact your system administrator';
          })
      },
      createPlate() {
        this.isCreatingPlate = true;

        function formatPlate(table, vm) {
          // TODO make global constant
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
          const defaultVolume = 900

          labels.map((label, i) => {
            if (table[i + offset][1] && table[i + offset][2]) {
              plate[labels[i]] = {
                fr: table[i + offset][1], 
                ec: table[i + offset][2], 
                volume: defaultVolume
              }
            }
          });

          return plate;
        }

        try {
          console.log('this.file', this.file);
    
          const vm = this;
          const reader = new FileReader();

          reader.onload = function (e) {

            const data = new Uint8Array(e.target.result);
            console.log('data', data);

            const workbook = XLSX.read(data, {type: 'array'});
            console.log('workbook', workbook);

            const firstSheetName = workbook.SheetNames[0];
            console.log('firstSheetName', firstSheetName);

            const targetSheet = workbook.Sheets[firstSheetName];
            console.log('targetSheet', targetSheet);
            
            const table = XLSX.utils.sheet_to_json(targetSheet, {header: 1});
            console.log('table', table);

            const formattedPlate = formatPlate(table, vm);
            
            vm.$set(vm, 'plate', formattedPlate);
          };

          reader.readAsArrayBuffer(this.file);

        } catch (err) {
            console.error(err);
        } finally {
          this.isCreatingPlate = false;
        }
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
            receptorType: this.receptorType,
            plate: this.plate,
            optimisation: this.optimisation,
            type: this.type,
            species: this.species,
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
        this.plateName = '';
        this.nameIsOk = false;
      }
    },
    computed: {
      getNameInputType() {
        return 'is-danger';
      },
      getNameInputErrorMessage() {
        return 'is-danger';
      },  
      canSubmit() {
        return this.plate && this.nameIsOk && !this.frErrors
      },
      saveErrorText() {
        if (!this.plate) {
          return 'Error: No Plate';
        } else if (!this.nameIsOk) {
          return 'Error: Name is not valid';
        } else if (this.frErrors) {
          return 'Error: One of more FR numbers are already in use. Please see highlighted cells.';
        } else {
          return 'Unknown error';
        }
      }
    },
  }
</script>
