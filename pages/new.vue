<template>
  <div>
    <h1 class="title is-2">New Request</h1>

    <form @submit="checkFormAndSave">

      <div class="field">
        <label class="label">Date</label>
        <b-input
          v-model="todaysDate"
          required
          readonly
        ></b-input>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <b-input
          v-model="username"
          :disabled="!isAdmin"
        ></b-input>
      </div>


      <div class="field">
        <label class="label">Name2</label>
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
            :data-tooltip="canSubmit ? 'Submit me!' : saveErrorText"
          >
            Save
          </button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
  import moment from 'moment';
  import XLSX from 'xlsx'
  
  export default {
    middleware: 'auth',    
    // components: {
    //   Plate
    // },
    data() {

      return {
        todaysDate: moment().format('DD-MM-YYYY'),
        username: this.getUsername(),
        //
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
      //
      checkName() {
      },
      createPlate() {
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
      },
      getUsername() {
        return 'deeks';
      },
      isAdmin() {
        return true;
        //return getAdmins().includes(this.username);
      }
    },
    computed: {
      canSubmit() {
        return false
      },
      saveErrorText() {
        return 'Unknown error';
      }
    },
  }
</script>


<style scoped>



</style>
