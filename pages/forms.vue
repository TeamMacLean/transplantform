<template>
  <div>
    <h1 class="title is-2">View TRF forms</h1>

    <div v-if="!error">
      <div v-if="allResults.length">
        <!-- <b-loading is-full-page v-model="loading"></b-loading> -->
        <b-field
          v-if="sessionUser && sessionUser.signatories.length > 1"
          label="Filter by group:"
          class="filterWrapper"
        >
          <div class="block">
            <b-checkbox
              v-model="selectedGroupLeaderUsernames"
              v-for="(username, index) in groupLeaderUsernames"
              :key="index"
              :native-value="username"
            >
              {{ username }}
            </b-checkbox>
          </div>
        </b-field>
        <b-field label="Filter by status:" class="filterWrapper">
          <div class="block">
            <b-checkbox
              v-model="selectedStatuses"
              v-for="(status, index) in statuses"
              :key="index"
              :native-value="status"
            >
              {{ status.charAt(0).toUpperCase() + status.slice(1) }}
            </b-checkbox>
          </div>
        </b-field>
        <b-field label="Filter results:" class="filterWrapper">
          <b-input
            type="text"
            v-model="query"
            placeholder="Enter any characters..."
          >
          </b-input>
          <p><i>Filter options: ID #, Date, Submitter, Species, Genotype</i></p>
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
                <th>ID #</th>
                <th>Date</th>
                <th>Submitter</th>
                <th>Species</th>
                <th>Genotype</th>
                <th v-if="!isGroupLeader && !isResearchAssistant">Signatory</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody v-show="displayResults.length">
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
                <td>{{ form.genotype || '-' }}</td>
                <td v-if="!isGroupLeader && !isResearchAssistant">
                  {{ form.signatoryObj.name }}
                </td>
                <td>
                  {{
                    form.status.charAt(0).toUpperCase() + form.status.slice(1)
                  }}
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
          <tbody v-show="!displayResults.length">
            <td>
              No results{{
                this.query.length ? ' from "' + this.query + '"' : ''
              }}.
            </td>
          </tbody>
        </div>

        <br />
        <b-button
          v-if="isAdmin"
          @click="this.downloadCSVData"
          :disabled="!displayResults.length"
          >Export current results to CSV</b-button
        >
      </div>
      <div v-else>No results found in database.</div>
    </div>
    <div v-else>
      <div class="notification is-danger">
        <p><strong>Error:</strong> {{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getStatuses } from '../modules/getConstants';

export default {
  middleware: 'auth',

  asyncData({ $axios }) {
    return $axios
      .get('/api/forms')
      .then((res) => {
        if (res.status === 200) {
          const { ldapGroups, forms, sessionUser } = res.data;

          const statuses = getStatuses();
          const groupLeaderUsernames = ldapGroups.map((g) => g.username);

          return {
            ldapGroups,
            error: '',
            statuses,
            groupLeaderUsernames,
            selectedGroupLeaderUsernames: groupLeaderUsernames,

            allResults: forms && forms.length ? forms : [],
            query: '',
            current: 1,
            sessionUser,
            selectedStatuses: statuses.filter((s) => s !== 'deleted'),
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
    isAdmin() {
      return this.sessionUser.isAdmin;
    },
    isGroupLeader() {
      return !!(
        this.sessionUser.isGroupLeaderForObj &&
        this.sessionUser.isGroupLeaderForObj.username
      );
    },
    isResearchAssistant() {
      return !!this.sessionUser.isResearchAssistantFor;
    },
    isNormalUser() {
      if (!this && !this.sessionUser) {
        return true;
      }
      return !this.isAdmin && !this.isGroupLeader && !this.isResearchAssistant;
    },
    displayResults() {
      if (!this || !this.sessionUser || !this.sessionUser.username) {
        return [];
      }
      return this.allResults.filter((form) => {
        if (this.isNormalUser && form.username !== this.sessionUser.username) {
          return false;
        }

        const usernamesOfGroupLeadersSessionUserCanView =
          this.sessionUser.signatories.map((s) => s.username);

        const sessionUserCanViewThisGroup =
          usernamesOfGroupLeadersSessionUserCanView.includes(
            form.signatoryObj.username
          );

        if (!sessionUserCanViewThisGroup) {
          return false;
        }

        const isInSelectedGroup = this.selectedGroupLeaderUsernames.includes(
          form.signatoryObj.username
        );
        if (!isInSelectedGroup) {
          return false;
        }

        const isInSelectedStatuses = this.selectedStatuses.includes(
          form.status
        );
        if (!isInSelectedStatuses) {
          return false;
        }

        if (this.query.length) {
          const isInQuery =
            form.date.toLowerCase().includes(this.query.toLowerCase()) ||
            form.username.toLowerCase().includes(this.query.toLowerCase()) ||
            form.species.toLowerCase().includes(this.query.toLowerCase()) ||
            // form.signatoryObj.username
            //   .toLowerCase()
            //   .includes(this.query.toLowerCase()) ||
            // form.status.toLowerCase().includes(this.query.toLowerCase()) ||
            form.trfId.toLowerCase().includes(this.query.toLowerCase()) ||
            form.genotype.toLowerCase().includes(this.query.toLowerCase());
          if (!isInQuery) {
            return false;
          }
        }

        // have exhausted all possible filters, so return true finally
        return true;
      });
    },
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
      const title = `TRF Forms${
        this.query ? ' filtered for ' + this.query + ',' : ''
      } ${timestamp}.csv`;
      hiddenElement.download = title;
      hiddenElement.click();
    },
  },
};
</script>

<style scoped>
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

.filterWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.filterWrapper > div {
  margin-left: 10px;
}

.filterWrapper > div > div > div {
  margin-left: 10px;
}

.filterWrapper div > div > p {
  margin-left: 10px;
}
</style>
