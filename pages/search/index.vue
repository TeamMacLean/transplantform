<template><div>
  <div class="title is-3">Search:</div>
  <div class="title is-5">EC/RC codes, EC/RC names, FR codes, Masters names & Species names</div>
  <div class="searchWrapper">
    <b-input
      type='text'
      v-model="query"
      placeholder="Enter search query..."
    >
    </b-input>
    <b-button :disabled='isSearchButtonDisabled' type='is-primary' @click="handleSearch">Search</b-button>
  </div>
  <hr />
  <div v-if="!this.noSearchesYet">
    <div v-if='this.isSearching'>Loading results...</div>
    <div v-else-if="results.length">
      <div class="title is-3">Results for '{{this.lastPostedSearchQuery}}'</div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>EC number</th>
              <th>EC name</th>
              <th>FR number</th>
              <th>In Masters</th>
              <th>With Species</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th></th>
              <th>EC number</th>
              <th>EC name</th>
              <th>FR number</th>
              <th>In Masters</th>
              <th>With Species</th>
            </tr>
          </tfoot>
          <tbody>
            <tr :key="index" v-for="(construct, index) in results">
              <th>{{index + 1}}</th>
              <td>{{construct.number}}</td>
              <td>{{construct.name || '-'}}</td>
              <td>{{construct.frNumber || '-'}}</td>
              <td>{{getArrayFormatNames(construct.plates, ', ')}}</td>
              <td>{{getArrayFormatNames(construct.species, ', ')}}</td>            
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <br />
        <br />
        <b-button @click='this.downloadCSVData'>Export to CSV</b-button>
      </div>
    </div>      
    <div v-else>
      No results to show.
    </div>
  </div>
</div></template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      isSearching: false,
      query: '',
      results: [],
      error: null,
      noSearchesYet: true,
      lastPostedSearchQuery: '',
    };
  },
  computed: {
    isSearchButtonDisabled() {
      if (!this.query && !this.results.length){
        return true
      }
      if (this.query === this.lastPostedSearchQuery){
        return true
      }
      return false
    }
  },
  methods: {
    downloadCSVData() {

      let csv = 'EC number,EC name,FR number,In Masters,With Species\n';

      this.results.forEach((construct) => {
        var platesStr = this.getArrayFormatNames(construct.plates, ';')
        var speciesStr = this.getArrayFormatNames(construct.species, ';')
        csv += `${construct.number || 'null'},${construct.name || 'null'},${construct.frNumber || 'null'},${platesStr},${speciesStr}\n`
      });

      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      hiddenElement.target = "_blank";
      const timestamp = moment().format("DD MMM YYYY, h:mm:ss a");
      const title = `Search results for '${this.query}' - ${timestamp}.csv`;
      hiddenElement.download = title;
      hiddenElement.click();
    },
    getArrayFormatNames(arrayOfStrings, separatorStr) {
      if (!arrayOfStrings || !arrayOfStrings.length){
        return '-';
      }

      var unique = [...new Set(arrayOfStrings.reduce((flat, val) => flat.concat(val), []))]
      var removeCommas = unique.map(string => string.replace(/,/g, '-'))
      var result = removeCommas.join(separatorStr);

      return result;
    },
    async handleSearch() {
      this.noSearchesYet = false;
      this.isSearching = true;
      let url = "/api/search/ec";

      this.lastPostedSearchQuery = this.query;

      try {
        const res = await this.$axios.post(url, {query: this.query})
        const parsedData = JSON.parse(JSON.stringify(res.data))
        console.log(parsedData)
        if (parsedData.debugging) {console.log(parsedData.debugging)}
        this.results = parsedData.results;

      } catch (error) {
        this.error = error;
      } finally {
        this.isSearching = false;
      }
    },
  }
};
</script>

<style scoped>

.searchWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
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

</style>
