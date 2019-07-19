<template>
  <div>
    <table class="table is-bordered is-fullwidth" v-bind:class="{ 'is-select-mode': selectMode }">
      <thead>
      <tr>
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

        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.a12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.b12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.c12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.d12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.e12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.f12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.g12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :editMode="editMode" :item="plate.h12"/>
      </tr>
      </tbody>
    </table>
    <!--<p class="help is-info" v-if="onLongPress && !editMode && !selectMode">Long press on a well to start selecting wells-->
    <!--for a new Master.</p>-->


    <div class="buttons is-pulled-right">
      <button class="button" v-bind:class="[editMode?'is-success':'', 'button']" v-on:click="toggeleEdit"
              type="button"
              v-if="isEditable && !selectMode">
        {{buttonValue}}
      </button>
      <button type="button" class="button" v-if="canSpawnMasters && onLongPress && !editMode && !selectMode"
              @click="onLongPress">Make Master
      </button>
    </div>
    <div class="is-clearfix"></div>

    <div v-if="selectMode">

      <div class="columns">
        <div class="column">
          <div class="buttons is-pulled-left">
            <button class="button is-outlined is-small" @click="selectAll" v-if="selectMode" type="button">
              Select all
            </button>
            <button class="button is-outlined is-small" @click="selectNone" v-if="selectMode && selectedItemKeys.length"
                    type="button">
              Clear selection
            </button>
            <button class="button is-small" v-bind:class="[editMode?'is-success':'', 'button']" v-on:click="toggeleEdit"
                    type="button"
                    v-if="isEditable && !selectMode">
              {{buttonValue}}
            </button>
            <!--<button type="button" class="button is-small">Close</button>-->
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <input type="number" class="input" v-bind:max="newMasterMaxVolume || 900" min="0"
                     v-model="volumeToTransfer"
                     required>
            </div>

            <div class="control">
              <div class="buttons">
                <button class="button is-primary"
                        v-bind:class="{'tooltip':!selectedItemKeys.length || volumeToTransfer < 1}"
                        v-bind:disabled="!selectMode || selectedItemKeys.length && volumeToTransfer < 1"
                        type="button"
                        v-bind:data-tooltip="!selectedItemKeys.length ? 'No wells selected':volumeToTransfer < 1 ? 'Volume not selected':null">
                  Create plate from selection
                </button>
                <button class="button is-outlined" @click="resetSelect" type="button">
                  Cancel
                </button>
              </div>
            </div>
          </div><!--grouped field-->
        </div>
      </div>
    </div> <!--select mode-->
  </div>
</template>

<script>
  import PlateCell from '../components/PlateCell';

  export default {
    props: ['plate', 'save', 'isEditable', 'canSpawnMasters'],
    data() {
      return {
        saving: false,
        editMode: false,
        selectMode: false,
        volumeToTransfer: 0
      }
    },
    computed: {
      newMasterMaxVolume() {
        if (this.plate) {
          return Object.keys(this.plate).filter(k => this.plate[k].selected).map(k => this.plate[k]).reduce((prev, curr) => {
            return prev.volume < curr.volume ? prev : curr;
          }, 900).volume

        } else {
          return 0;
        }
      },
      selectedItemKeys() {
        if (this.plate) {
          return Object.keys(this.plate).filter(k => this.plate[k].selected);
        } else {
          return []
        }
      },
      buttonValue() {
        if (this.save) {
          if (this.editMode) {
            if (this.saving) {
              return 'Saving...'
            } else {
              return 'Save'
            }
          } else {
            return 'Edit'
          }
        } else {
          if (this.editMode) {
            return 'OK'
          } else {
            return 'Edit'
          }
        }
      }
    },
    methods: {
      toggeleEdit: function () {

        if (this.isEditable) {
          if (this.editMode) {
            //save if possible
            if (this.save) {
              this.saving = true;
              this.save()
                .then(() => {
                  this.editMode = false;
                  this.saving = false;
                })
                .catch(err => {
                  console.error(err);
                })
            } else {
              this.editMode = false;
            }
          } else {
            this.editMode = true;
          }
        }

      },
      resetSelect() {
        this.selectNone();
        this.selectMode = false;
      },
      selectAll() {
        const self = this;
        if (self.selectMode) {
          const keys = Object.keys(this.plate).filter(k => k.indexOf('_') !== 0 && !this.plate[k].selected && this.plate[k].fr && this.plate[k].ec);
          const self = this;
          keys.map(key => {
            self.$set(this.plate[key], 'selected', true);
          });
        }
      },
      onLongPress() {
        if (this.canSpawnMasters && !this.edit) {
          if (!this.selectMode) {
            this.selectMode = true;
          } else {
            //...
          }
        }
      },
      selectNone() {
        const selectedKeys = Object.keys(this.plate).filter(k => k.indexOf('_') !== 0 && this.plate[k].selected);
        const self = this;
        selectedKeys.map(selectedKey => {
          self.$set(this.plate[selectedKey], 'selected', false);
        });
      },
      onPress(item) {
        if (this.canSpawnMasters) {
          if (this.selectMode) {

            if (item && item.fr && item.ec && item.volume) {
              if (item.selected) {
                this.$set(item, 'selected', false);
              } else {
                this.$set(item, 'selected', true);
              }
            }
          }
        }
      }


    },
    components: {
      PlateCell
    },
  }

</script>

<style>
  .is-select-mode {
    outline: 2px solid #3676D9;
  }

  /*.table.is-scrollable tbody {*/
  /*overflow-y: scroll;*/
  /*width: auto;*/
  /*position: absolute;*/
  /*}*/
</style>
