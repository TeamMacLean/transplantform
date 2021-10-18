<template><div>

  <div v-if="namedConstructs && namedConstructs.length">
    <hr/>
    <h1 class="title">Named constructs</h1>
    <div v-if='namedConstructs && namedConstructs.length'>

      <b-button class='marginBottom' :disabled='isDisabled' type='is-primary' @click="onSubmit">Update named constructs</b-button>
      <div class="rowsContainer">
        <div class="flex-container-header">
          <div class='normal'>
            Number
          </div>
          <div class='normal'>
            Name
          </div>
          <div class='normal'>
            New Name
          </div>
        </div>
      </div>
      <div :key="index" class="rowsContainer" v-for="(construct, index) in initiallyFetchedNamedConstructs">
        <div class="flex-container" v-if='!toBeDeletedConstructNumbers.includes(construct.number)'>
          <div class='normal'>
            {{construct.number}}
          </div>
          <div class='normal'>
            {{construct.name || 'No name'}}
          </div>
          <b-input type='text' :value='construct.number' name='entryFund' v-model='newEntries[index].number' />
        </div>
      </div>
      <br />
      <b-button :disabled='isDisabled' type='is-primary' @click="onSubmit">Update named constructs</b-button>
    </div>
    
  </div>
  <div v-else>
    <p>No Named Constructs Found.</p>
  </div>
</div></template>

<script>
export default {
  middleware: 'auth',
  asyncData({$axios}) {
    return $axios.get('/api/ec-rc-names')
      .then((res) => {
        const isManyNamedConstructs = !!(res.data.namedConstructs && res.data.namedConstructs.length)

        let generatedArrayOfEmptyObjectsForNewEntries = [];
        isManyNamedConstructs && res.data.namedConstructs.forEach(c => {
          generatedArrayOfEmptyObjectsForNewEntries.push({
            fetchedNumber: c.number,
          })
        })

        const resultData = {
          initiallyFetchedNamedConstructs: isManyNamedConstructs ? res.data.namedConstructs : [],
          namedConstructs: isManyNamedConstructs ? res.data.namedConstructs : [],
          toBeDeletedConstructNumbers: [],
          newEntries: generatedArrayOfEmptyObjectsForNewEntries,
        }
        return resultData;
      })
      .catch(err => {
        console.error(err);
        return {
          namedConstructs: null,
        }
      })
  },
  computed: {
    isDisabled() {
      let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
      const newNames = this.namedConstructs.map(c => c.name).filter(name => !!name)
      return false; //findDuplicates.length
    },
  },
  methods: {
    async onSubmit() {

      try {
        const postUrl = '/api/ec-rc-names/new';

        const changedFieldsObserver = this.newEntries.filter(e => e.number && e.number.length)
        const changedFields = changedFieldsObserver.map(o => {
          return JSON.parse(JSON.stringify(o))
        })

        const postObj = {
          changedFields: changedFields,
          initiallyFetchedNamedConstructs: this.initiallyFetchedNamedConstructs,
        };

        const result = await this.$axios.post(postUrl, postObj);

        const isManyNamedConstructs = !!(result.data.updatedNamedConstructs && result.data.updatedNamedConstructs.length)

        let generatedArrayOfEmptyObjectsForNewEntries = [];
        isManyNamedConstructs && result.data.updatedNamedConstructs.forEach(c => {
          generatedArrayOfEmptyObjectsForNewEntries.push({
            fetchedNumber: c.number,
          })
        })

        this.initiallyFetchedNamedConstructs = result.data.updatedNamedConstructs;
        this.namedConstructs = result.data.updatedNamedConstructs;
        this.toBeDeletedConstructNumbers = []
        this.newEntries = generatedArrayOfEmptyObjectsForNewEntries;

        this.$buefy.toast.open({
          message: 'Successfully updated EC Names!',
          type: 'is-success'
        });

      } catch (err) {
        console.error('could not update named constructs:', err)
        this.$buefy.toast.open({
            message: 'Could not update EC Names',
            type: "is-danger",
          });
      }
    },
  },
}
</script>

<style>

.flex-container {
  display: flex;
  align-items: center;
}
.flex-container-header {
  display: flex;
  align-items: center;
  font-weight: 900;
}
.normal {
  width: 150px;
  margin: 10px;
}
.input {
  width: 200px;
  margin: 10px;
}
.marginBottom {
  margin-bottom: 15px;
}

</style>
