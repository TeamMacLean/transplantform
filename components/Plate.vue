<template>
  <div>

    <table class="table is-bordered" v-bind:class="{ 'is-select-mode': selectMode }">
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
          :item="plate.a1"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a2"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a3"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a4"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a5"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a6"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a7"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a8"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a9"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a10
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a11
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.a12
        "/>
      </tr>
      <tr>
        <td valign="middle"><strong>B</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b1"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b2"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b3"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b4"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b5"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b6"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b7"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b8"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b9"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b10
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b11
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.b12
        "/>
      </tr>
      <tr>
        <td><strong>C</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c1"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c2"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c3"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c4"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c5"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c6"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c7"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c8"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c9"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c10
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c11
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.c12
        "/>
      </tr>
      <tr>
        <td><strong>D</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d1"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d2"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d3"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d4"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d5"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d6"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d7"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d8"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d9"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d10
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d11
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.d12
        "/>
      </tr>
      <tr>
        <td><strong>E</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e1"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e2"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e3"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e4"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e5"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e6"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e7"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e8"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e9"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e10
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e11
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.e12
        "/>
      </tr>
      <tr>
        <td><strong>F</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f1"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f2"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f3"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f4"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f5"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f6"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f7"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f8"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f9"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f10
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f11
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.f12
        "/>
      </tr>
      <tr>
        <td><strong>G</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g1"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g2"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g3"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g4"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g5"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g6"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g7"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g8"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g9"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g10
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g11
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.g12
        "/>
      </tr>
      <tr>
        <td><strong>H</strong></td>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h1"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h2"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h3"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h4"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h5"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h6"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h7"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h8"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h9"
        />
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h10
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h11
        "/>
        <PlateCell :onPress="onPress" :onSelectMode="onSelectMode" :editMode="editMode" :maxVolume="maxVolume"
          :item="plate.h12
        "/>
      </tr>
      </tbody>
    </table>

    <div v-if="selectMode">
      <p>
        Total number of current selections: {{this.selectedWells.length}}
      </p>
      <p>
        Selections (in chronological click order):
        <span v-for="(item, index) in this.selectedWellsBattleshipGridReferences" :key=item>
          {{item.toUpperCase()}}{{selectedWellsBattleshipGridReferences.length !== (index + 1) ? ',' : ''}}
        </span>
      </p>
    </div>

    <br />

    <div class="field is-grouped is-grouped-right" v-if="!selectMode && !volumeMode">
      <div class="buttons">
        <!-- I have disabled edit cells as it doesnt work and not clear its needed for now -->
        <!-- <button class="button" v-bind:class="[editMode?'is-success':'', 'button']" v-on:click="toggeleEdit"
                type="button"
                v-if="isEditable && !selectMode && !volumeMode">
          <font-awesome-icon :icon="['far', 'edit']" v-if="!editMode" style="margin-right:8px;"/>
          <font-awesome-icon :icon="['far', 'save']" v-if="editMode" style="margin-right:8px;"/>
          {{buttonValue}}
        </button> -->

        <button class="button" v-if="editMode" @click="cancelEdit">Cancel</button>

        <button class="button" type="button" @click="takeVolume"
                v-bind:disabled="volumeMax < 1"
                v-if="canTakeVolume && !editMode && !selectMode && !volumeMode">
          <font-awesome-icon :icon="['fas', 'fill-drip']" style="margin-right:8px;"/>
          Take Volume
        </button>

        <!-- TODO tidy up saving of stock plates  -->
        <button type="button" class="button"
                v-if="!editVolumesMode" @click="onEditVolumesMode">
          Edit Stock Plate
        </button>
        <div v-else >
          <button type="button" class="button"
                  @click="onSaveVolumes">
            Save Edited Stock Plate
          </button>
          <div>(Note: final confirmation required.)</div>
          <div>(Also note: this will not update existing created Master Plates.)</div>
        </div>

        <button type="button" class="button"
                v-if="canSpawnMasters && onSelectMode && !editMode && !selectMode && !volumeMode && !editVolumesMode"
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

      <div>
        <div>

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

        <div style="margin-top:10px">
          <div class="field is-grouped is-grouped-left">

            <div class="control">
              <div class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    Vol
                  </a>
                </p>
                <div class="control vol-input-wrapper">
                  <input
                    type="number" 
                    class="input" 
                    v-bind:max="newMasterMaxVolume || 900" 
                    min="0"
                    v-model="volumeToTransfer"
                    required
                  />
                </div>
              </div>
            </div>

            <b-tooltip label="Contact web admin to make editable">
              <div class="control" style="margin-right:12px">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">
                      Reps
                    </a>
                  </p>
                  <div class="control">
                      <input disabled type="number" class="input" min="3" max="3"
                        v-model="replicates"
                        required
                      >
                  </div>
                </div>
              </div>
            </b-tooltip>

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


          <div class="field is-grouped is-grouped-left">
            <div class="control">
              <div class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    Name
                  </a>
                </p>
                <div class="control">
                  <input type="text" 
                    class="input"
                    v-model="masterName"
                    required
                  >
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
                      <option value="0">FR Numerical</option>
                      <option value="1">FR Reverse-Numerical</option>
                      <option value="2">EC Reverse-Numerical</option>
                      <option value="3">Order Selected</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="control">

              <div class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    Arrange reps
                  </a>
                </p>
                <div class="control">
                  <div class="select">
                    <select v-model="repsLayout" value="horizontally">
                      <option selected="selected" value="vertically">Vertically (default)</option>
                      <option value="horizontally">Horizontally</option>
                      <!-- <option>disabled value="vertically">Vertically (ETA Aug 2021)</option> -->
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="field is-grouped is-grouped-left">

            <div class="field is-grouped">
              <div class="control">
                <div class="buttons">

                  
                  <b-tooltip v-if="!selectMode || !canCreateMaster" :label="makeButtonLabel" multilined position="is-right">
                    <button class="button is-primary buttonMargin"
                            v-bind:class="{'tooltip':!canCreateMaster}"
                            disabled
                            type="button"
                            @click="createMaster">
                      <font-awesome-icon :icon="['fas', 'fill-drip']" style="margin-right:8px;"/>
                      Create master
                    </button>
                  </b-tooltip>
                  <button v-else class="button is-primary buttonMargin"
                    v-bind:class="{'tooltip':!canCreateMaster}"
                    type="button"
                    @click="createMaster">
                    <font-awesome-icon :icon="['fas', 'fill-drip']" style="margin-right:8px;"/>
                    Create master
                  </button>


                  <button class="button is-outlined" @click="resetSelect" type="button">
                    Cancel
                  </button>
                  <button class="button is-outlined" @click="selectNone" type="button">
                    Reset selections
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
    props: ['plate', 'save', 'isEditable', 'canSpawnMasters', 'canTakeVolume', 'forceReload', 'checkUniqueFRs', 'onCheckUniqueFRs'],
    data() {
      return {
        editMode: false, 
        selectMode: false, // TODO move back to false
        volumeMode: false,

        _beforeEditingCache: null,
        saving: false,
        volumeToTransfer: 0,
        replicates: 3,
        noOfPlates: 3,
        // unedited: null,
        masterLayout: 0,
        repsLayout: 'vertically',
        masterName: '',
        volumeToTake: 0,
        selectedWells: [],
        validSelectedWellsCounts: [12, 18, 24, 30, 36, 42, 48],

        editVolumesMode: false,
      }
    },
    created() {
      if (this.checkUniqueFRs) {
        this.checkFRs()
      }
    },
    updated() {
      if (this.checkUniqueFRs) {
        this.checkFRs()
      }
    },
    computed: {
      maxVolume() {
        return this.plate.volume ? this.plate.volume : 900;
      },
      allWells() {
        return labels.map(l => this.plate[l])
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


        } else if (!(this.noOfPlates < 6) || !(this.noOfPlates > 0) || !(this.replicates === 3)) {
          return 'Incorrect plates and/or replicates number. Check all inputs.'
        } else {
          return 'Please submit!'
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
        if (this.plate && this.selectedWells.length) {

          const volumeOfSmallestSelectedWell = this.selectedWells.reduce((prev, curr) => {
            if (curr && curr.volume){
              return prev.volume < curr.volume ? prev : curr;
            } else {
              return prev;
            }

          }, 900).volume;
          // console.log('smallest well', volumeOfSmallestSelectedWell);
          
          return Math.floor(volumeOfSmallestSelectedWell / this.replicates / this.noOfPlates);

        } else {
          return Math.floor(900 / this.replicates / this.noOfPlates);
        }
      },
      newMasterMaxWells() {
        return this.validSelectedWellsCounts[this.validSelectedWellsCounts.length - 1];
      },      
      selectedWellsBattleshipGridReferences() {
        // console.log('this selectedwells', this.selectedWells);
        // console.log('objectkeythis plates', Object.key(this.plates));
        if (!this.selectedWells || this.selectedWells.length === 0) {
          return [];
        }

        const targetFrs = this.selectedWells.map(well => well.fr);

        return targetFrs.map(fr => Object.keys(this.plate).find(key => this.plate[key].fr === fr))
      },
      buttonValue() {
        if (this.save) {
          if (this.editMode) {
            if (this.saving) {
              return 'Saving...'
            } else {
              return 'Save cells'
            }
          } else {
            return 'Edit cells'
          }
        } else {
          if (this.editMode) {
            return 'Save this cell arrangement'
          } else {
            return 'Edit cells'
          }
        }
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
          &&
          this.noOfPlates < 6
          &&
          this.noOfPlates > 0
          &&
          this.replicates === 3
        );
      }
    },
    methods: {

      onEditVolumesMode() {
        this.editVolumesMode = true;
        this.editMode = true;
      },

      onSaveVolumes() {
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
              }).finally(() => {
                this.editVolumesMode = false;
                this.editMode = false;
              })
        }
      },

      checkFRs() {
        if (this.checkUniqueFRs) {

          this.checkingUniqueFrs = true;

          const frs = labels.map(l => {
            if (this.plate[l]) {
              return {label: l, fr: this.plate[l].fr}
            } else {
              return null
            }
          });

          this.$axios.$post('/api/stock/check/frs', {frs: frs})
            .then(res => {

              if (this.onCheckUniqueFRs) {
                this.onCheckUniqueFRs((res.frs && res.frs.length))
              }

              if (res.frs && res.frs.length) {
                this.uniqueFrErrors = true;
                res.frs.map(fr => {
                  this.$set(this.plate[fr.label], 'frTaken', true)
                })
              }

            })
            .catch(err => {
              console.error(err);
            });

        }
      },
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
        // this._beforeEditingCache = Object.assign({}, this.plate);
        this._beforeEditingCache = JSON.parse(JSON.stringify(this.plate))
      },
      restoreOriginal() {
        // console.log(this._beforeEditingCache);
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
        this.repsLayout = 'vertically';
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
        // probably useless
        Object.keys(this.plate).forEach(
          gridKeyName => {
            if (this.plate[gridKeyName].selected){
              delete this.plate[gridKeyName].selected
            }
          }
        );
        // i.e. selectNone();
        const selectedWells = [...this.selectedWells];
        const self = this;
        selectedWells.map(selectedWell => {
          if (self.selectedWell){
            self.$set(selectedWell, 'selected', false);
          }
          if (self.selected){
            self.$set(selectedWell, 'selected', false)
          }
        });
        this.selectedWells = [];

        // useful
        if (this.canSpawnMasters && !this.editMode) {
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
            plate: {id: this.plate._id, _id: this.plate._id, items: []},
            volume: this.volumeToTransfer,
            masterLayout: this.masterLayout,
            repsLayout: this.repsLayout,
            replicates: this.replicates,
            noOfPlates: this.noOfPlates,
            masterName: this.masterName,
            noOfSelectedWells: this.selectedWells.length,
          };


          this.selectedWells
            .map(well => {
              objToSend.plate.items.push({ec: well.ec, fr: well.fr});
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
      PlateCell
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
  tbody > tr > td > strong {
    margin-left: 2px;
    vertical-align: middle;
  }
  .table td, .table th {
    padding: 5px;
  }
  .vol-input-wrapper > input {
    width: 5rem;
  }
</style>
