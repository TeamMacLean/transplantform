<template>
  <div>

    <table class="table is-bordered is-fullwidth" v-bind:class="{ 'is-select-mode': selectMode }">
      <thead>
      <tr>
        <th style="border: none;"></th>
        <th class="has-text-centered">1</th>
        <th class="has-text-centered">2</th>
        <th class="has-text-centered">3</th>
        <th class="has-text-centered">4</th>
        <th class="has-text-centered">5</th>
        <th class="has-text-centered">6</th>
        <th class="has-text-centered">7</th>
        <th class="has-text-centered">8</th>
        <th class="has-text-centered">9</th>
        <th class="has-text-centered">10</th>
        <th class="has-text-centered">11</th>
        <th class="has-text-centered">12</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><div class='middle'><strong>A</strong></div></td>
        <td><MasterPlateDualCell :item="masterPlate.a1" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a2" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a3" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a4" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a5" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a6" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a7" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a8" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a9" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a10" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a11" /></td>
        <td><MasterPlateDualCell :item="masterPlate.a12" /></td>
      </tr>
      <tr>
        <td class="heading-td"><div class="middle"><strong>B</strong></div></td>
        <td><MasterPlateDualCell :item="masterPlate.b1" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b2" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b3" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b4" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b5" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b6" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b7" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b8" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b9" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b10" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b11" /></td>
        <td><MasterPlateDualCell :item="masterPlate.b12" /></td>
      </tr>
      <tr>
        <td class="heading-td"><div class="middle"><strong>C</strong></div></td>
        <td><MasterPlateDualCell :item="masterPlate.c1" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c2" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c3" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c4" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c5" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c6" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c7" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c8" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c9" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c10" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c11" /></td>
        <td><MasterPlateDualCell :item="masterPlate.c12" /></td>
      </tr>
      <tr>
        <td class="heading-td"><div class="middle"><strong>D</strong></div></td>
        <td><MasterPlateDualCell :item="masterPlate.d1" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d2" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d3" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d4" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d5" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d6" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d7" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d8" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d9" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d10" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d11" /></td>
        <td><MasterPlateDualCell :item="masterPlate.d12" /></td>
      </tr>
      <tr>
        <td class="heading-td"><div class="middle"><strong>E</strong></div></td>
        <td><MasterPlateDualCell :item="masterPlate.e1" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e2" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e3" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e4" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e5" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e6" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e7" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e8" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e9" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e10" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e11" /></td>
        <td><MasterPlateDualCell :item="masterPlate.e12" /></td>
      </tr>
      <tr>
        <td class="heading-td"><div class="middle"><strong>F</strong></div></td>
        <td><MasterPlateDualCell :item="masterPlate.f1" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f2" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f3" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f4" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f5" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f6" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f7" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f8" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f9" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f10" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f11" /></td>
        <td><MasterPlateDualCell :item="masterPlate.f12" /></td>
      </tr>
      <tr>
        <td class="heading-td"><div class="middle"><strong>G</strong></div></td>
        <td><MasterPlateDualCell :item="masterPlate.g1" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g2" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g3" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g4" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g5" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g6" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g7" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g8" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g9" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g10" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g11" /></td>
        <td><MasterPlateDualCell :item="masterPlate.g12" /></td>
      </tr>
      <tr>
        <td class="heading-td"><div class="middle"><strong>H</strong></div></td>
        <td><MasterPlateDualCell :item="masterPlate.h1" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h2" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h3" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h4" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h5" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h6" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h7" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h8" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h9" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h10" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h11" /></td>
        <td><MasterPlateDualCell :item="masterPlate.h12" /></td>
      </tr>
      </tbody>
    </table>

    <div class="take-volume-wrapper">
        
      <b-numberinput 
        type="number" 
        min="0"
        :max="maxVolCanTake"
        v-model="volumeToTake"
        required
        placeholder="0"
        :disabled="maxVolCanTake === 0"
      ></b-numberinput>
        
      <b-button 
        class="take-volume-button"
        @click="takeVolumeAction"
        :disabled="isTakeVolumeButtonDisabled"
      >
        <font-awesome-icon :icon="['fas', 'fill-drip']" style="margin-right:8px;"/>
        Take Volume
      </b-button>

    </div>

  </div>
</template>

<script>
  import MasterPlateDualCell from '../components/MasterPlateDualCell';

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

  export default {
    props: ['initialPropMasterPlate', 'save', 'canSpawnMasters', 'canTakeVolume', 'forceReload', 'checkUniqueFRs', 'onCheckUniqueFRs'],
    data() {
      return {
        selectMode: true,
        volumeMode: true,
        masterPlate: this.initialPropMasterPlate,

        _beforeEditingCache: null,
        saving: false,
        volumeToTransfer: 0,
        replicates: 3,
        noOfMasterPlates: 3,
        // unedited: null,
        masterLayout: 0,
        repsLayout: 'vertically',
        masterName: '',
        volumeToTake: 0,
        selectedWells: [],
        validSelectedWellsCounts: [12, 18, 24, 30, 36, 42, 48],
        haveTakenVolume: false,
      }
    },
    computed: {
      isTakeVolumeButtonDisabled() {
        if (this.volumeToTake < 1 || this.volumeToTake > this.maxVolCanTake) {
          return true;
        } else {
          return false;
        }
      },
      allWells() {
        return labels.map(l => this.masterPlate[l])
      },
      makeButtonLabel() {

        if (!this.selectedWells || !this.selectedWells.length) {
          return 'No wells selected'
        } else if (!this.validSelectedWellsCounts.includes(this.selectedWells.length)) {
          const acceptableCountsStr = this.validSelectedWellsCounts.join(', ');
          return 'Must select one of these counts of wells: ' 
            + acceptableCountsStr 
            + '.\nCurrently you have selected ' + this.selectedWells.length + ' wells.'
          ; 
        } else if (this.volumeToTransfer < 1) {
          return 'Volume not selected'
        } else if (this.volumeToTransfer > this.newMasterMaxVolume) {
          return 'Maximum volume to transfer is ' + this.newMasterMaxVolume;
        } else if (this.selectedWells.length > this.newMasterMaxWells) {
          return 'Too many wells selected, maximum is ' + this.newMasterMaxWells;
        } else if (!this.masterName || !this.masterName.length) {
          return 'Name for new master not provided'
        } else if (this.checkingUniqueFrs) {
          return 'Checking if FRs are unique'
        } else if (this.uniqueFrErrors) {
          return 'Duplicate FRs fround'
        } else {
          return 'Please submit!'
        }
      },
      maxVolCanTake() {
        const BAD_VALUE = 9999999999999;
        let maxVolInWells = BAD_VALUE;
        Object.keys(this.masterPlate).forEach(mpKey => {
          if (this.masterPlate && this.masterPlate[mpKey] && this.masterPlate[mpKey].upper && this.masterPlate[mpKey].upper.volume){
            if (this.masterPlate[mpKey].upper.volume < maxVolInWells){
              maxVolInWells = this.masterPlate[mpKey].upper.volume;
            }
          }
          if (this.masterPlate && this.masterPlate[mpKey] && this.masterPlate[mpKey].lower && this.masterPlate[mpKey].lower.volume){
            if (this.masterPlate[mpKey].lower.volume < maxVolInWells){
              maxVolInWells = this.masterPlate[mpKey].lower.volume;
            }
          }          
        })
        if (maxVolInWells === BAD_VALUE){
          return 0;
        }
        return maxVolInWells;
      },
      newMasterMaxVolume() {
        if (this.masterPlate) {
          const varA = this.selectedWells.reduce((prev, curr) => {
            if (curr && curr.volume) {
              return prev.volume < curr.volume ? prev : curr;
            } else {
              return prev;
            }
          }, 900).volume;

          return varA / this.replicates / this.noOfMasterPlates


        } else {
          return 0;
        }
      },
      newMasterMaxWells() {
        // HACK
        return 48;
        //return Math.floor((96 - (2 * this.replicates)) / this.replicates)
      },      
      selectedWellsBattleshipGridReferences() {
        // console.log('this selectedwells', this.selectedWells);
        // console.log('objectkeythis plates', Object.key(this.masterPlates));
        if (!this.selectedWells || this.selectedWells.length === 0) {
          return [];
        }

        const targetFrs = this.selectedWells.map(well => well.fr);

        return targetFrs.map(fr => Object.keys(this.masterPlate).find(key => this.masterPlate[key].fr === fr))
      },
      canCreateMaster() {        
        return (
          this.selectedWells.length 
          &&
          this.validSelectedWellsCounts.includes(this.selectedWells.length)
          && 
          this.volumeToTransfer > 0 
          && 
          this.replicates > 0 
          && 
          this.masterName 
          && 
          this.masterName.length 
          && 
          this.volumeToTransfer <= this.newMasterMaxVolume 
          && 
          this.selectedWells.length <= this.newMasterMaxWells
        );
      }
    },
    methods: {

      // NB we don't need to checkFRs (see Plate.vue) because we cannot edit

      showError(err) {
        this.$swal({
          title: 'Error!',
          text: err,
          type: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      },

      setOriginal() {
        // Keep track of the original task information
        // this._beforeEditingCache = Object.assign({}, this.masterPlate);
        this._beforeEditingCache = JSON.parse(JSON.stringify(this.masterPlate))
      },
      restoreOriginal() {
        // console.log(this._beforeEditingCache);
        if (this._beforeEditingCache) {
          // Return the title back to it’s previous state
          Object.assign(this.masterPlate, this._beforeEditingCache);
          // Exit editing mode
          this._beforeEditingCache = null;
        }
      },
      cancelEdit() {
        this.restoreOriginal();
      },
      takeVolumeAction() {

        const keyNamesWithFrTaken = Object.keys(this.masterPlate).filter(labelKeyName =>
          this.masterPlate &&
          labelKeyName &&
          this.masterPlate[labelKeyName] &&
          this.masterPlate[labelKeyName].upper &&
          this.masterPlate[labelKeyName].upper.volume &&
          this.masterPlate[labelKeyName].upper.volume > 0
        );

        this.$axios.post(`/api/masterPlate/${this.masterPlate._id}/take`, {volume: this.volumeToTake})
          .then(res => {
            this.volumeToTake = 0;
            this.masterPlate = res.data.masterPlate;

            // all vols taken mark
            keyNamesWithFrTaken.forEach(keyNameWithFrTaken => {
              // we just want frTaken to be in Vue state, not in API, so it doesn't persist past user 'session' (w/e that is)
              this.masterPlate[keyNameWithFrTaken].frTaken = true;
            });

            this.$swal({
              title: 'Success!',
              text: 'Volume successfully taken',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Hooray!'
            })

          })
          .catch(err => {
            this.showError(err);
          })
      },
      takeVolume() {
        this.volumeMode = true;
      },
      resetSelect() {
        this.selectNone();
        this.selectMode = true;
        this.volumeToTransfer = 0;
        this.replicates = 3;
        this.noOfMasterPlates = 3;
        this.masterLayout = 0;
        this.repsLayout = 'vertically';
        this.masterName = '';
        this.volumeToTake = 0;
      },
      selectAll() {
        const self = this;
        if (self.selectMode) {
          const keys = Object.keys(this.masterPlate).filter(k => k.indexOf('_') !== 0 && !this.masterPlate[k].selected && this.masterPlate[k].fr && this.masterPlate[k].ec);
          const self = this;
          keys.map(key => {
            self.$set(this.masterPlate[key], 'selected', true);
          });
        }
      },
      onSelectMode() {
        // probably useless
        Object.keys(this.masterPlate).forEach(
          gridKeyName => {
            if (this.masterPlate[gridKeyName].selected){
              delete this.masterPlate[gridKeyName].selected
            }
          }
        );
        // TODO test to see if this does anything... consolelog anyone?
        // i.e. selectNone();
        const selectedWells = [...this.selectedWells];
        const self = this;
        selectedWells.map(selectedWell => {
          self.$set(selectedWell, 'selected', false);
        });
        this.selectedWells = [];

        // useful
        if (this.canSpawnMasters) {
          if (!this.selectMode) {
            this.selectMode = true;
          }
        }
      },
      selectNone() {
        const selectedWells = [...this.selectedWells];
        const self = this;
        selectedWells.map(selectedWell => {
          self.$set(selectedWell, 'selected', false);
        });
        this.selectedWells = [];
      },
      onPress(item) {
        if (this.canSpawnMasters) {
          if (this.selectMode) {

            if (item && item.fr && item.ec && item.volume) {
              if (item.selected) {
                this.$set(item, 'selected', false);
                const oldSelectedWells = [...this.selectedWells];

                this.selectedWells = oldSelectedWells.filter(well => well.fr !== item.fr)
              } else {
                if (this.selectedWells.length < this.newMasterMaxWells) {
                  this.$set(item, 'selected', true);
                  this.selectedWells.push(item)
                }
              }
            }
          }
        }
      },
      createMaster() {
        if (this.selectedWells.length <= this.newMasterMaxWells) {
          //allowed

          const objToSend = {
            plate: {id: this.masterPlate._id, _id: this.masterPlate._id, items: []},
            volume: this.volumeToTransfer,
            layout: this.masterLayout,
            repsLayout: this.repsLayout,
            replicates: this.replicates,
            noOfMasterPlates: this.noOfMasterPlates,
            masterName: this.masterName
          };


          this.selectedWells
            .map(well => {
              objToSend.masterPlate.items.push({ec: well.ec, fr: well.fr});
            });
          this.$axios.post('/api/master/new', objToSend)
            .then((res) => {             
              const { data } = res;
              const { master } = data;
              const { id } = master;

              // console.log('tigerlog', tempString);              

              // this.$swal({
              //   title: 'Success!',
              //   text: tempString,
              // })
              this.$router.push(`/masters/${id}`)
            })
            .catch(err => {
              this.showError(err);
            })
        }
      }
    },
    components: {
      MasterPlateDualCell
    },
  }

</script>

<style>
  .is-select-mode {
    outline: 2px solid #2B9EEB;
  }
  .buttonMargin {
    margin-right: 10px;
  }
  .middle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table {
    width: 100%;
  }

  .table td {
    padding: 0;
    padding-bottom: 0;
    vertical-align: middle;
    
  }

  td {
    padding: 0;
    padding-bottom: 0;
    vertical-align: middle;
  }

  .heading-td {
    vertical-align: middle;
    color: pink;
    width: 60px;
  }

  .take-volume-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 2rem;
  }

  .take-volume-button {
    margin-bottom: 12px;
  }

  .take-volume-wrapper > div > p.control.minus > button {
    margin-right: 0px;
  }

  .take-volume-wrapper > div > div > input {
    min-width: 4rem;
  } 

</style>
