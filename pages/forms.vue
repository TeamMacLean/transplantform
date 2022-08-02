<template>
  <div>
    <h1 class="title is-2">View TRF forms</h1>

    <div>
      <h3 v-if="isAdmin" class="title is-4">I am an admin user</h3>
      <h3 v-if="isGroupLeader" class="title is-4">I am a GL</h3>
      <h3 v-if="isResearchAssistant" class="title is-4">I am an RA</h3>
      <h3
        v-if="!isAdmin && !isGroupLeader && !isResearchAssistant"
        class="title is-4"
      >
        I am a normal user
      </h3>

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
        <div>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>ID #</th>
                <th>Date</th>
                <th>Submitter</th>
                <th>Species</th>
                <th>Signatory</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody v-if="displayResults.length">
              <tr :key="index" v-for="(form, index) in paginatedItems">
                <td>{{ form.position }}</td>
                <td>
                  <nuxt-link
                    :to="'/form?id=' + form.trfId"
                    class="navbar-item navbar-item-link"
                    >{{ form.trfId }}</nuxt-link
                  >
                </td>
                <td>{{ form.date }}</td>
                <td>{{ form.username }}</td>
                <td>{{ form.species || '-' }}</td>
                <td>{{ form.signatoryObj.username }}</td>
                <td>{{ form.status }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="displayResults.length">
            {{ displayResults.length }} result{{
              displayResults.length !== 1 ? 's' : ''
            }}
            found.
          </div>
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
          v-if="isAdmin"
          @click="this.downloadCSVData"
          :disabled="!displayResults.length"
          >Export to CSV</b-button
        >
      </div>
      <div v-else>No results found in database.</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getFormDataFromId } from '../modules/hardcodedData';
export default {
  data() {
    const { user } = this.$auth.$state;
    const { isAdmin } = user;

    // TODO this block
    const isGroupLeader = false;
    const isResearchAssistant = false;

    const results = [getFormDataFromId('TRF1232')];

    return {
      isAdmin,
      isGroupLeader,
      isResearchAssistant,
      allResults: results,
      displayResults: results,
      query: '',
      current: 1,
    };
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

      const displayResultsWithPosition = this.displayResults.map(
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
          (form) =>
            form.date.toLowerCase().includes(this.query.toLowerCase()) ||
            form.username.toLowerCase().includes(this.query.toLowerCase()) ||
            form.species.toLowerCase().includes(this.query.toLowerCase()) ||
            form.signatoryObj.username
              .toLowerCase()
              .includes(this.query.toLowerCase()) ||
            form.status.toLowerCase().includes(this.query.toLowerCase()) ||
            form.trfId.toLowerCase().includes(this.query.toLowerCase())
        );
      }
    },
    downloadCSVData() {
      let csv = 'TRF ID,Date,Submitter,Species,Genotype,Signatory,Status\n';
      this.displayResults.forEach((form) => {
        csv +=
          form.trfId +
          ',' +
          form.date +
          ',' +
          form.username +
          ',' +
          form.species +
          ',' +
          form.genotype +
          ',' +
          form.signatoryObj.username +
          ',' +
          form.status +
          '\n';
      });

      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      const timestamp = moment().format('D MMM YYYY, h mm ss a');
      const title = `Forms${
        this.query ? ' filtered for ' + this.query + ',' : ''
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
