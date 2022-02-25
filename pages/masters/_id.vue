<template>
  <div>
    <div v-if="master">
      <div v-if="masterPlates">
        <div class="columns">
          <div class="column">
            <p class="title is-4">{{(master && master.name) || 'problems finding name'}}
              <font-awesome-icon :icon="['far', 'check-circle']" v-if="!master.active"/>
            </p>
            <div class="subtitle">

              <div class="field is-grouped is-grouped-multiline">

                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">created</span>
                    <span class="tag is-outlined">{{moment(master.created).format('DD/MM/YYYY')}}</span>
                  </div>
                </div>

                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">species</span>
                    <span class="tag is-outlined">{{master.species}}</span>
                  </div>
                </div>

                <div class="control" v-if="master.numberOfWells">
                  <div>{{cellsRequiredString}}</div>
                  <div>{{cellsProvidedString}}</div>
                  <div>Direction selections fill up from {{master.arrangementDirection}} direction</div>
                  <div>Arrange by: {{master.arrangeByType}}</div>
                </div>

              </div>
            </div>
          </div>
          <div class="column">
            <div class="field is-grouped is-grouped-right">
              <div class="dropdown is-hoverable is-right">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                  <span class="icon is-small">
        <font-awesome-icon :icon="['fas', 'ellipsis-v']"/>
      </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div class="dropdown-content">
                    <a class="dropdown-item" @click="retireMaster" v-if="master.active">
                      Retire
                    </a>
                    <a class="dropdown-item" @click="activateMaster" v-if="!master.active">
                      Activate
                    </a>
                    <a class="dropdown-item" @click="deleteMaster">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tabs">
          <ul>
            <li v-for="(masterPlate, i) in masterPlates" v-bind:class="{'is-active':activeTab===i}" :key="i">
              <a @click="setActiveTab(i)">Master Plate {{i+1}}</a>
            </li>
          </ul>
        </div>

        <div v-for="(masterPlate, i) in masterPlates" :key="i">
          <div v-if="activeTab === i">
                <MasterPlate 
                  :initialPropMasterPlate="masterPlate" 
                  :save="saveMaster" 
                  :canSpawnMasters="false"
                  :canTakeVolume="true"
                  :numberOfWells="master.numberOfWells"
                  :arrangementDirection="master.arrangementDirection"
                  :arrangeByType="master.arrangeByType"
                />
          </div>
        </div>


      </div>
    </div>
    <div v-else>
      <p>
        Master Not Found. Please try navigating from Masters top bar menu.
      </p>
    </div>
  </div>
</template>

<script>
  import MasterPlate from '../../components/MasterPlate';
  import moment from 'moment';

  export default {
    middleware: 'auth',
    computed: {
      masterPlates() {
        if (this.master) {
          return this.master.masterPlates
        } else {
          return [];
        }
      },
      "moment": function () {
        return moment;
      },
      cellsRequiredString() {
        const masterReplicatesNumber = this.master.replicates || 3;
        const halfCellSlots = masterReplicatesNumber * this.master.numberOfWells;
        return `${this.master.numberOfWells} (Wells count) x ${masterReplicatesNumber} (Number of repetitions) = ${halfCellSlots} (Half cell slots required)`
      }
    },
    components: {
      MasterPlate
    },
    asyncData({$axios, _, params}) {      
      return $axios.get('/api/master/' + params.id)
        .then((res) => {



          return {
            master: res.data.master,
            activeTab: 0,
            reloadKey: 0,
            paramsId: params.id,
          }
        })
        .catch(err => {
          console.error(err);
          return {
            master: null,
            activeTab: 0,
            reloadKey: 0
          }
        }
      )
    },
    methods: {
      deleteMaster: function () {

        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.$axios.post('/api/master/' + this.master._id + '/delete', {master: this.master})
              .then(() => {
                this.$swal(
                  'Deleted!',
                  'Your master has been deleted.',
                  'success'
                )
                  .then(() => {
                    this.$router.push('/masters/')
                  })
              })
              .catch(err => {
                this.$swal(
                  'Fail!',
                  'Your master could not be deleted.',
                  'error'
                )
              })
          }
        })
      },
      saveMaster: function () {
        return this.$axios.post('/api/master/' + this.master._id + '/save', {master: this.master})
      },
      retireMaster: function () {
        return this.$axios.post('/api/master/' + this.master._id + '/retire')
          .then((res) => {
            this.$set(this.master, 'active', res.data.active)
          })
          .catch(err => {
            console.error(err);
          })
      },
      activateMaster: function () {
        return this.$axios.post('/api/master/' + this.master._id + '/activate')
          .then((res) => {
            this.$set(this.master, 'active', res.data.active)
          })
          .catch(err => {
            console.error(err);
          })
      },
      setActiveTab: function (index) {
        this.$axios.get('/api/master/' + this.paramsId)
          .then((res) => {
              this.master = res.data.master;
              this.activeTab = index;
              this.reloadKey = 0;
          }).catch(err => {
            console.error(err);
            return {
              master: null,
              activeTab: 0,
              reloadKey: 0
            }            
          })
      }
    }
  }
</script>

