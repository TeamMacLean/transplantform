<template>
  <div>
    <div v-if="plate">
      <div class="columns">
        <div class="column">
          <p class="title is-4">{{stock.name}}
            <font-awesome-icon :icon="['far', 'check-circle']" v-if="!stock.active"/>
          </p>

          <!-- <br /> -->

          <!--<p class="subtitle is-6">Barcode: {{stock.barcode}}; Species: {{stock.species}}</p>-->
          <div class="subtitle">


            <div class="field is-grouped is-grouped-multiline">
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag">barcode</span>
                  <span class="tag is-outlined">{{stock.barcode}}</span>
                </div>
              </div>

              <div class="control">
                <div class="tags has-addons">
                  <span class="tag">species</span>
                  <span class="tag is-outlined">{{stock.species}}</span>
                </div>
              </div>

              <div class="control">
                <div class="tags has-addons">
                  <span class="tag">receptor type</span>
                  <span class="tag is-outlined">{{!!stock.receptorType ? stock.receptorType : 'n/a'}}</span>
                </div>
              </div>

              <div class="control">
                <div class="tags has-addons">
                  <span class="tag">type</span>
                  <span class="tag is-outlined">{{!!stock.type ? stock.type : 'n/a'}}</span>
                </div>
              </div>

              <div class="control">
                <div class="tags has-addons">
                  <span class="tag">optimisation</span>
                  <span class="tag is-outlined">{{!!stock.optimisation ? stock.optimisation : 'n/a'}}</span>
                </div>
              </div>

              <div class="control">
                <div class="tags has-addons">
                  <span class="tag">created</span>
                  <span class="tag is-outlined">{{moment(stock.created).format('DD/MM/YYYY')}}</span>
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
                  <a class="dropdown-item" @click="retireStock" v-if="stock.active">
                    Retire
                  </a>
                  <a class="dropdown-item" @click="activateStock" v-if="!stock.active">
                    Activate
                  </a>
                  <a class="dropdown-item" @click="deleteStock">
                    Delete
                  </a>
                  <!--<a class="dropdown-item is-disabled" @click="rename" disabled="disabled">-->
                  <!--Rename-->
                  <!--</a>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Plate :plate="plate" :save="saveStock" :isEditable="stock.active" :canSpawnMasters="stock.active"/>

    </div>
  </div>
</template>

<script>
  import Plate from '../../components/Plate';
  import moment from 'moment';

  export default {
    middleware: 'auth',
    computed: {
      plate() {
        if (this.stock) {
          return this.stock.plate
        } else {
          return null;
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
      return $axios.get('/api/stock/' + params.id)
        .then((res) => {
          return {
            stock: res.data.stock
          }
        })
        .catch(err => {
          console.error(err);
          return {
            stock: null
          }
        })
    },
    methods: {
      deleteStock: function () {


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
            this.$axios.post('/api/stock/' + this.stock._id + '/delete', {stock: this.stock})
              .then(() => {
                this.$swal(
                  'Deleted!',
                  'Your stock has been deleted.',
                  'success'
                )
                  .then(() => {
                    this.$router.push('/stocks/')
                  })
              })
              .catch(err => {
                this.$swal(
                  'Fail!',
                  'Your stock could not be deleted.',
                  'error'
                )
              })

          }
        })

      },
      saveStock: function () {
        return this.$axios.post('/api/stock/' + this.stock._id + '/save', {stock: this.stock})
      },
      retireStock: function () {
        return this.$axios.post('/api/stock/' + this.stock._id + '/retire')
          .then((res) => {
            this.$set(this.stock, 'active', res.data.active)
          })
          .catch(err => {
            console.error(err);
          })
      },
      activateStock: function () {
        return this.$axios.post('/api/stock/' + this.stock._id + '/activate')
          .then((res) => {
            this.$set(this.stock, 'active', res.data.active)
          })
          .catch(err => {
            console.error(err);
          })
      },
    }
  }
</script>
<style>
table {
  width: 100%;
}
</style>

