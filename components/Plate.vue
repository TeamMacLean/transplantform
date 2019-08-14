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
        <td><strong>A</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a1"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a2"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a3"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a4"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a5"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a6"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a7"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a8"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a9"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a10"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a11"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.a12"/>
      </tr>
      <tr>
        <td valign="middle"><strong>B</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b1"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b2"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b3"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b4"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b5"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b6"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b7"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b8"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b9"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b10"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b11"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.b12"/>
      </tr>
      <tr>
        <td><strong>C</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c1"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c2"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c3"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c4"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c5"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c6"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c7"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c8"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c9"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c10"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c11"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.c12"/>
      </tr>
      <tr>
        <td><strong>D</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d1"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d2"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d3"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d4"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d5"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d6"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d7"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d8"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d9"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d10"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d11"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.d12"/>
      </tr>
      <tr>
        <td><strong>E</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e1"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e2"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e3"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e4"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e5"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e6"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e7"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e8"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e9"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e10"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e11"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.e12"/>
      </tr>
      <tr>
        <td><strong>F</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f1"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f2"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f3"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f4"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f5"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f6"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f7"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f8"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f9"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f10"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f11"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.f12"/>
      </tr>
      <tr>
        <td><strong>G</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g1"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g2"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g3"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g4"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g5"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g6"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g7"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g8"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g9"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g10"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g11"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.g12"/>
      </tr>
      <tr>
        <td><strong>H</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h1"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h2"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h3"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h4"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h5"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h6"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h7"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h8"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h9"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h10"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h11"/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
                   :item="plate.h12"/>
      </tr>
      </tbody>
    </table>
    <!--<p class="help is-info" v-if="onSelectMode && !editMode && !selectMode">Long press on a well to start selecting wells-->
    <!--for a new Master.</p>-->


    <div class="field is-grouped is-grouped-right" v-if="!selectMode && !volumeMode">
      <div class="buttons">
        <button class="button" v-bind:class="[editMode?'is-success':'', 'button']" v-on:click="toggeleEdit"
                type="button"
                v-if="isEditable && !selectMode && !volumeMode">
          <font-awesome-icon :icon="['far', 'edit']" v-if="!editMode" style="margin-right:8px;"/>
          <font-awesome-icon :icon="['far', 'save']" v-if="editMode" style="margin-right:8px;"/>
          {{buttonValue}}
        </button>

        <button class="button" v-if="editMode" @click="cancelEdit">Cancel</button>

        <button class="button" type="button" @click="takeVolume"
                v-bind:disabled="volumeMax < 1"
                v-if="canTakeVolume && !editMode && !selectMode && !volumeMode">
          <font-awesome-icon :icon="['fas', 'fill-drip']" style="margin-right:8px;"/>
          Take Volume
        </button>

        <button type="button" class="button"
                v-if="canSpawnMasters && onSelectMode && !editMode && !selectMode && !volumeMode"
                @click="onSelectMode">
          <font-awesome-icon :icon="['fas', 'fill-drip']" style="margin-right:8px;"/>
          Make Master
        </button>
      </div>
    </div>
    <div v-if="volumeMode">

      <div class="field is-grouped is-grouped-right">

        <div class="control">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-static">
                Vol
              </a>
            </p>
            <div class="control">
              <input type="number" class="input" v-bind:max="volumeMax"
                     v-model="volumeToTake"
                     required>
            </div>
          </div>
        </div>

        <div class="control">
          <button class="button" type="button" @click="takeVolumeAction"
                  v-bind:disabled="!(volumeToTake > 0) && volumeToTake <= volumeMax">
            <font-awesome-icon :icon="['fas', 'fill-drip']" style="margin-right:8px;"/>
            Take Volume
          </button>
        </div>


      </div>

    </div>

    <div v-if="selectMode">

      <div class="columns">
        <div class="column">

          <div class="field is-grouped">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag">Maximum selection</span>
                <span class="tag is-info">{{newMasterMaxWells}}</span>
              </div>
            </div>

            <div class="control" v-if="!isNaN(newMasterMaxVolume)">
              <div class="tags has-addons">
                <span class="tag">Maximum volume</span>
                <span class="tag is-info">{{newMasterMaxVolume}}</span>
              </div>
            </div>

          </div>
        </div>

        <div class="column">
          <div class="field is-grouped is-grouped-right">

            <div class="control">
              <div class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    Vol
                  </a>
                </p>
                <div class="control">
                  <input type="number" class="input" v-bind:max="newMasterMaxVolume || 900" min="0"
                         v-model="volumeToTransfer"
                         required>
                </div>
              </div>
            </div>


            <div class="control">
              <div class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    Reps
                  </a>
                </p>
                <div class="control">
                  <input type="number" class="input" min="1" max="3"
                         v-model="replicates"
                         required>
                </div>
              </div>
            </div>

            <div class="control">
              <div class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    No. Plates
                  </a>
                </p>
                <div class="control">
                  <input type="number" class="input" min="1" max="5"
                         v-model="noOfPlates"
                         required>
                </div>
              </div>
            </div>


          </div>


          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <div class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    Name
                  </a>
                </p>
                <div class="control">
                  <input type="text" class="input"
                         v-model="masterName"
                         required>
                </div>
              </div>
            </div>
            <div class="control">

              <div class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    Sorting
                  </a>
                </p>
                <div class="control">
                  <div class="select">
                    <select v-model="masterLayout">
                      <option value="0">Numerical</option>
                      <option value="1">Reverse-Numerical</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="field is-grouped is-grouped-right">

            <div class="field is-grouped">
              <div class="control">
                <div class="buttons">

                  <button class="button is-primary"
                          v-bind:class="{'tooltip':!canCreateMaster}"
                          v-bind:disabled="!selectMode || !canCreateMaster"
                          type="button"
                          v-bind:data-tooltip="makeButtonError"
                          @click="createMaster">
                    <font-awesome-icon :icon="['fas', 'fill-drip']" style="margin-right:8px;"/>
                    Create master
                  </button>
                  <button class="button is-outlined" @click="resetSelect" type="button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <!--</div>-->
          </div><!--grouped field-->

        </div>
      </div>

      <!--</div>-->
      <!--</div>-->
    </div> <!--select mode-->
  </div>
</template>

<script>
  import PlateCell from '../components/PlateCell';

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
    props: ['plate', 'save', 'isEditable', 'canSpawnMasters', 'canTakeVolume', 'forceReload'],
    data() {
      return {
        editMode: false,
        selectMode: false,
        volumeMode: false,

        _beforeEditingCache: null,
        saving: false,
        volumeToTransfer: 0,
        replicates: 3,
        noOfPlates: 3,
        // unedited: null,
        masterLayout: 0,
        masterName: '',
        volumeToTake: 0,
      }
    },
    computed: {
      maxVolume() {
        return this.plate.volume ? this.plate.volume : 900;
      },
      allWells() {
        return labels.map(l => this.plate[l])
      },
      makeButtonError() {

        if (!this.selectedWells || !this.selectedWells.length) {
          return 'No wells selected'
        } else if (this.volumeToTransfer < 1) {
          return 'Volume not selected'
        } else if (this.volumeToTransfer > this.newMasterMaxVolume) {
          return 'Maximum volume to transfer is ' + this.newMasterMaxVolume;
        } else if (this.selectedWells.length > this.newMasterMaxWells) {
          return 'Too many wells selected, maximum is ' + this.newMasterMaxWells;
        } else if (!this.masterName || !this.masterName.length) {
          return 'Name for new master not provided'
        } else {
          return ''
        }
      },
      volumeMax() {
        const vm = this.allWells.reduce((prev, curr) => {
          if (curr && curr.fr && curr.ec && curr.volume) {
            return prev.volume < curr.volume ? prev : curr;
          } else {
            return prev;
          }
        }, Number.POSITIVE_INFINITY);

        if (vm === Number.POSITIVE_INFINITY) {
          return 0
        } else {
          return vm.volume;
        }
      },
      newMasterMaxVolume() {
        if (this.plate) {
          const varA = this.selectedWells.reduce((prev, curr) => {
            if (curr && curr.volume) {
              return prev.volume < curr.volume ? prev : curr;
            } else {
              return prev;
            }
          }, 900).volume;

          return varA / this.replicates / this.noOfPlates


        } else {
          return 0;
        }
      },
      newMasterMaxWells() {
        return Math.floor((96 - 2) / (this.replicates))
      },
      selectedWells() {
        if (this.plate) {
          return this.allWells.filter(k => k.selected);
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
      },
      canCreateMaster() {
        return this.selectedWells.length && this.volumeToTransfer > 0 && this.replicates > 0 && this.masterName && this.masterName.length && this.volumeToTransfer < this.newMasterMaxVolume && this.selectedWells.length < this.newMasterMaxWells;
      }
    },
    methods: {

      showError(err) {
        this.$swal({
          title: 'Error!',
          text: err,
          type: 'error',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
      },

      setOriginal() {
        // Keep track of the original task information
        // this._beforeEditingCache = Object.assign({}, this.plate);
        this._beforeEditingCache = JSON.parse(JSON.stringify(this.plate))
      },
      restoreOriginal() {
        console.log(this._beforeEditingCache);
        if (this._beforeEditingCache) {
          // Return the title back to it’s previous state
          Object.assign(this.plate, this._beforeEditingCache);
          // Exit editing mode
          this._beforeEditingCache = null;
        }
      },
      cancelEdit() {
        this.restoreOriginal();
        this.editMode = false;
      },
      takeVolumeAction() {
        this.$axios.post(`/api/plate/${this.plate._id}/take`, {volume: this.volumeToTake})
          .then(res => {
            this.volumeMode = false;
            this.volumeToTake = 0;
            this.plate = res.data.plate;
          })
          .catch(err => {
            this.showError(err);
          })
      },
      takeVolume() {
        this.volumeMode = true;
      },
      toggeleEdit() {
        if (this.isEditable) {
          if (this.editMode) {
            //save if possible
            if (this.save) {
              this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, save changes!'
              }).then((result) => {
                if (result.value) {

                  this.saving = true;
                  this.save()
                    .then(() => {
                      this.editMode = false;
                      this.saving = false;
                    })
                    .catch(err => {
                      this.showError(err);
                    })
                }
              })


            } else {
              this.editMode = false;
              this.restoreOriginal();
            }
          } else {
            // this.unedited = Object.assign({}, this.plate); //DEPPCLONE
            this.setOriginal();
            this.editMode = true;
          }
        }

      },
      resetSelect() {
        this.selectNone();
        this.selectMode = false;
        this.volumeToTransfer = 0;
        this.replicates = 3;
        this.noOfPlates = 3;
        this.masterLayout = 0;
        this.masterName = '';
        this.volumeToTake = 0;
      },
      // selectAll() {
      //   const self = this;
      //   if (self.selectMode) {
      //     const keys = Object.keys(this.plate).filter(k => k.indexOf('_') !== 0 && !this.plate[k].selected && this.plate[k].fr && this.plate[k].ec);
      //     const self = this;
      //     keys.map(key => {
      //       self.$set(this.plate[key], 'selected', true);
      //     });
      //   }
      // },
      onSelectMode() {
        if (this.canSpawnMasters && !this.editMode) {
          if (!this.selectMode) {
            this.selectMode = true;
          }
        }
      },
      selectNone() {
        const selectedWells = this.selectedWells;
        const self = this;
        selectedWells.map(selectedWell => {
          self.$set(selectedWell, 'selected', false);
        });
      },
      onPress(item) {
        if (this.canSpawnMasters) {
          if (this.selectMode) {

            if (item && item.fr && item.ec && item.volume) {
              if (item.selected) {
                this.$set(item, 'selected', false);
              } else {
                if (this.selectedWells.length < this.newMasterMaxWells) {
                  this.$set(item, 'selected', true);
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
            plate: {id: this.plate._id, _id: this.plate._id, items: []},
            volume: this.volumeToTransfer,
            layout: this.masterLayout,
            replicates: this.replicates,
            noOfPlates: this.noOfPlates,
            masterName: this.masterName
          };


          this.selectedWells
            .map(well => {
              objToSend.plate.items.push({ec: well.ec, fr: well.fr});
            });
          this.$axios.post('/api/master/new', objToSend)
            .then((res) => {
              // this.redirect(`/masters/${res.data.master.id}`)
              this.$router.push(`/masters/${res.data.master.id}`)
            })
            .catch(err => {
              this.showError(err);
            })
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
    outline: 2px solid #2B9EEB;
  }
</style>
