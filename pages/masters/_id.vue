<template>
  <div>
    <div v-if="master">
      <div v-if="plates">
        <div class="columns">
          <div class="column">
            <p class="title is-4">{{master.name}}
              <font-awesome-icon :icon="['far', 'check-circle']" v-if="!master.active"/>
            </p>
            <div class="subtitle">


              <div class="field is-grouped is-grouped-multiline">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">barcode</span>
                    <span class="tag is-outlined">{{master.barcode}}</span>
                  </div>
                </div>

                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">species</span>
                    <span class="tag is-outlined">{{master.species}}</span>
                  </div>
                </div>

                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">created</span>
                    <span class="tag is-outlined">{{moment(master.created).format('DD/MM/YYYY')}}</span>
                  </div>
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
            <li v-for="(plate, i) in plates" v-bind:class="{'is-active':activeTab===i}">
              <a @click="setActiveTab(i)">Plate {{i+1}}</a>
            </li>
          </ul>
        </div>


        <div v-for="(plate, i) in plates">
          <div v-if="activeTab === i">
            <div class="columns">
              <div class="column">
                <Plate :plate="plate" :save="saveMaster" :isEditable="master.active" :canSpawnMasters="false"
                       :canTakeVolume="true"/>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    <div v-else>
      <p>
        Master Not Found.
      </p>
    </div>
  </div>
</template>

<script>
  import Plate from '../../components/Plate';
  import moment from 'moment';

  export default {
    middleware: 'auth',
    computed: {
      plates() {
        if (this.master) {
          return this.master.plates
        } else {
          return [];
        }
      },
      "moment": function () {
        return moment;
      }
    },
    components: {
      Plate
    },
    asyncData({$axios, store, params}) {
      return $axios.get('/api/master/' + params.id)
        .then((res) => {
          return {
            master: res.data.master,
            activeTab: 0,
            reloadKey: 0
          }
        })
        .catch(err => {
          console.error(err);
          return {
            master: null,
            activeTab: 0,
            reloadKey: 0
          }

        })
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
        //reset
        this.activeTab = index;
      }
    }
  }
</script>

