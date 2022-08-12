<template>
  <div>
    <h1 class="title is-2">View constructs (Admin only)</h1>

    <div
      v-if="
        !(
          this.$auth &&
          $auth.$state &&
          $auth.$state.user &&
          $auth.$state.user.isAdmin
        )
      "
      class="title is-4"
    >
      <p>You are not permitted to view this page.</p>
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else>
      <div v-if="allResults.length">
        <b-field label="Filter results:" class="filterWrapper">
          <b-input
            type="text"
            v-model="query"
            placeholder="Enter any characters..."
            class="paddingLeft"
            @input="updateFilter"
          >
          </b-input>
        </b-field>
        <div v-if="displayResults.length">
          {{ displayResults.length }} result{{
            displayResults.length !== 1 ? 's' : ''
          }}
          found.
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>Construct</th>
                <th>Shortname</th>
                <th>Binary Vector Backbone</th>
                <th>T-DNA selection</th>
                <th>Species</th>
                <th>Genotype</th>
                <th>TRF link</th>
              </tr>
            </thead>
            <tbody v-if="displayResults.length">
              <tr :key="index" v-for="(construct, index) in paginatedItems">
                <td>{{ construct.position }}</td>
                <td>{{ construct.longName }}</td>
                <td>{{ construct.shortName || '-' }}</td>
                <td>
                  {{ construct.binaryVectorBackbone }}
                </td>
                <td>{{ construct.tdnaSelection }}</td>
                <td>{{ construct.species }}</td>
                <td>{{ construct.genotype }}</td>
                <td>
                  <nuxt-link
                    :to="'/form?id=' + construct.trfId"
                    class="navbar-item navbar-item-link"
                    >{{ construct.trfId }}</nuxt-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <b-pagination
            v-show="displayResults.length > 10"
            :total="displayResults.length"
            :current.sync="current"
            :per-page="10"
            range-before="1"
            range-after="1"
            icon-prev="chevron-left"
            icon-next="chevron-right"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
          </b-pagination>
          <tbody v-if="!displayResults.length">
            <td>No results from "{{ query }}"</td>
          </tbody>
        </div>

        <br />
        <b-button
          @click="this.downloadCSVData"
          :disabled="!displayResults.length"
          >Export current results to CSV</b-button
        >
      </div>
      <div v-else>No results found in database.</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  asyncData({ $axios }) {
    return $axios
      .get('/api/constructs')
      .then((res) => {
        if (res.status === 200) {
          const { constructs } = res.data;

          return {
            allResults: constructs,
            displayResults: constructs,
            query: '',
            current: 1,
            error: '',
          };
        } else {
          const err = res.data.error || 'Unexpected issue retrieving forms.';
          console.error(err);
          return {
            error: err,
          };
        }
      })
      .catch((err) => {
        console.error(err);
        return {
          error: err,
        };
      });
  },

  computed: {
    isFilterDisabled() {
      return this.query === this.previousQuery || this.query === '';
    },
    total() {
      return this.displayResults.length;
    },
    paginatedItems() {
      let page_number = this.current - 1;

      const unsortedDisplayResults = this.displayResults.slice();
      const sortedDisplayResults = unsortedDisplayResults.sort((a, b) => {
        const aTrfNumber = parseInt(a.trfId.match(/\d+/g)[0]);
        const bTrfNumber = parseInt(b.trfId.match(/\d+/g)[0]);
        if (aTrfNumber < bTrfNumber) {
          return 1;
        }
        if (aTrfNumber > bTrfNumber) {
          return -1;
        }
        return 0;
      });

      const displayResultsWithPosition = sortedDisplayResults.map(
        (construct, index) => {
          return {
            ...construct,
            position: index + 1,
          };
        }
      );

      return displayResultsWithPosition.slice(
        page_number * 10,
        (page_number + 1) * 10
      );
    },
  },
  methods: {
    updateFilter() {
      if (this.query === '') {
        this.displayResults = this.allResults;
      } else {
        this.displayResults = this.allResults.filter(
          (construct) =>
            construct.longName
              .toLowerCase()
              .includes(this.query.toLowerCase()) ||
            (construct.shortName &&
              construct.shortName
                .toLowerCase()
                .includes(this.query.toLowerCase())) ||
            construct.binaryVectorBackbone
              .toLowerCase()
              .includes(this.query.toLowerCase()) ||
            construct.tdnaSelection
              .toLowerCase()
              .includes(this.query.toLowerCase()) ||
            construct.species
              .toLowerCase()
              .includes(this.query.toLowerCase()) ||
            construct.genotype
              .toLowerCase()
              .includes(this.query.toLowerCase()) ||
            construct.trfId.toLowerCase().includes(this.query.toLowerCase())
        );
      }
    },
    downloadCSVData() {
      let csv =
        'Construct,Shortname,Binary Vector Backbone,T-DNA selection,Species,Genotype,TRF ID\n';
      this.displayResults.forEach((construct) => {
        csv +=
          construct.longName +
          ',' +
          (construct.shortName || 'null') +
          ',' +
          construct.binaryVectorBackbone +
          ',' +
          construct.tdnaSelection +
          ',' +
          construct.species +
          ',' +
          construct.genotype +
          ',' +
          construct.trfId +
          '\n';
      });

      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      const timestamp = moment().format('D MMM YYYY, h mm ss a');
      const title = `Constructs${
        this.query ? ' results for ' + this.query + ',' : ''
      } ${timestamp}.csv`;
      hiddenElement.download = title;
      hiddenElement.click();
    },
  },
};
</script>

<style scoped>
.filterWrapper {
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

/** Ensure newline for each table cell line entry in array */
td span:after {
  content: '\A';
  white-space: pre;
}

.reduceFontSize {
  font-size: 0.8em;
}

.navbar-item-link {
  background: #e9ecec;
}

.paddingLeft {
  padding-left: 10px;
}
</style>
