<template>
  <div>
    <b-loading is-full-page v-model="loading"></b-loading>
    <div>
      <div
        v-if="!printable && sessionUser.isAdmin && trfId"
        class="mb20 bigger"
      >
        <nuxt-link :to="'/edit?id=' + trfId">Edit this form</nuxt-link>
      </div>

      <div v-if="!printable" :class="getWrapperClass">
        <div class="component-wrapper">
          <h1 :class="getTitleClass">
            {{ getTitleText }}
          </h1>

          <div v-if="error">
            <p class="pb10">
              {{ error }}
            </p>
          </div>
          <div v-else-if="!authorisedToView">
            <p>
              You are not authorised to view this TRF. Please contact us if you
              think this is in error.
            </p>
          </div>
          <div v-else>
            <div v-show="!printable" class="status-wrapper">
              <h4 class="title is-4">
                Status:
                {{ this.status.charAt(0).toUpperCase() + this.status.slice(1) }}
              </h4>
              <div
                v-if="
                  (sessionIsAdmin || sessionIsSignatory) &&
                  status === 'pending approval'
                "
              >
                <b-button @click="handleApprove" type="is-success is-light"
                  >Approve</b-button
                >
                <b-button @click="handleDeny" type="is-danger is-light"
                  >Deny</b-button
                >
              </div>
              <div
                v-if="
                  sessionIsAdmin &&
                  status === 'approved' &&
                  !completingInProgressSteps
                "
              >
                <b-button @click="handleInitiateSetInProgress" type="is-success"
                  >Initiate 'Set In Progress'</b-button
                >
              </div>
              <div
                v-if="
                  sessionIsAdmin &&
                  status === 'approved' &&
                  completingInProgressSteps
                "
                class="shortNamesFormWrapper"
              >
                <h3 class="title is-5">Assign shortnames (Optional)</h3>

                <div class="shortNamesWrapper">
                  <div
                    v-for="(card, index) in constructs"
                    :key="index"
                    class="shortNameInputWrapper"
                  >
                    <b>Shortname:</b>
                    <b-input
                      class="padding"
                      v-model="card.shortName"
                      maxlength="20"
                    />
                    <div class="longNameWrapper">
                      <b>Longname:</b> {{ card.constructName }}
                    </div>
                  </div>
                </div>
                <b-button @click="cancelSetInProgress" type="is-danger"
                  >Cancel</b-button
                >
                <b-button @click="handleCompleteSetInProgress" type="is-success"
                  >Complete Set 'In Progress'</b-button
                >
              </div>
              <div
                class="printAndCompleteWrapper"
                v-if="sessionIsAdmin && status === 'in progress'"
              >
                <div class="printWrapper">
                  <b-button @click="handlePrint" type="is-success is-light"
                    >Print request</b-button
                  >
                </div>
                <b-button class="ml10" @click="handleComplete" type="is-success"
                  >Complete request</b-button
                >
              </div>
            </div>

            <div class="row-wrapper mb20">
              <b-field label="Date">
                <div>{{ this.date }}</div>
              </b-field>

              <b-field label="Username">
                <div>{{ this.username }}</div>
              </b-field>

              <b-field label="Signatory">
                <div>{{ this.signatoryObj.name }}</div>
              </b-field>
              <b-field label="Species">
                <div>{{ this.species }}</div>
              </b-field>

              <b-field label="Genotype">
                <div>{{ this.genotype }}</div>
              </b-field>
            </div>

            <h3 class="title is-4">Constructs</h3>
            <h3 class="title is-6">In priority order</h3>

            <div class="display-construct-cards-wrapper">
              <DisplayConstructCard
                v-for="(card, index) in constructs"
                :theIndex="index"
                :card="card"
                :key="index"
                :status="status"
              />
            </div>

            <b-field :class="printable && 'blank-space'" label="Notes">
              <div>{{ notes || '[No notes]' }}</div>
            </b-field>

            <hr />
          </div>
        </div>
      </div>
      <div id="printableArea" v-else>
        <h4 class="title is-4">Transformation Request Form</h4>

        <div id="styled-table-container">
          <div id="styled-table">
            <table>
              <tr v-for="n in 11" :key="n">
                <!-- For the first row -->
                <td class="first-col" v-if="n === 1">Date</td>
                <td v-if="n === 1">{{ date }}</td>

                <!-- For the second row -->
                <td v-if="n === 2">Username</td>
                <td v-if="n === 2">{{ username }}</td>

                <!-- For the third row -->
                <td v-if="n === 3">Group Leader</td>
                <td v-if="n === 3">{{ signatoryObj.name }}</td>

                <!-- For the fourth row -->
                <td v-if="n === 4">
                  Plant to be Transformed (species and genotype)
                </td>
                <td class="no-table-padding" v-if="n === 4">
                  <table>
                    <tr>
                      <td>Species: {{ species }}</td>
                    </tr>
                    <tr>
                      <td>Genotype: {{ genotype }}</td>
                    </tr>
                  </table>
                </td>

                <!-- For the fifth row -->
                <td v-if="n === 5">Construct Name</td>
                <td class="no-table-padding" v-if="n === 5">
                  <table>
                    <tr v-for="(construct, index) in constructs" :key="index">
                      <td class="fixed-width">{{ index + 1 }}.</td>
                      <td>{{ construct.constructName }}</td>
                    </tr>
                  </table>
                </td>

                <!-- For the sixth row -->
                <td v-else-if="n === 6">Binary Vector Backbone</td>
                <td class="no-table-padding" v-if="n === 6">
                  <table>
                    <tr v-for="(construct, index) in constructs" :key="index">
                      <td class="fixed-width">{{ index + 1 }}.</td>
                      <td>{{ construct.binaryVectorBackbone }}</td>
                    </tr>
                  </table>
                </td>

                <!-- For the seventh row -->
                <td v-else-if="n === 7">
                  <i>Agrobacterium tumefaciens</i> Strain
                </td>
                <td class="no-table-padding" v-if="n === 7">
                  <table>
                    <tr v-for="(construct, index) in constructs" :key="index">
                      <td class="fixed-width">{{ index + 1 }}.</td>
                      <td>{{ construct.agroStrain }}</td>
                    </tr>
                  </table>
                </td>

                <!-- For the eigth row -->
                <td v-else-if="n === 8">
                  Binary Vector Selection (in <i>Agrobacterium tumefaciens</i>)
                </td>
                <td class="no-table-padding" v-if="n === 8">
                  <table>
                    <tr v-for="(construct, index) in constructs" :key="index">
                      <td class="fixed-width">{{ index + 1 }}.</td>
                      <td>{{ construct.vectorSelection }}</td>
                    </tr>
                  </table>
                </td>

                <!-- For the ninth row -->
                <td v-else-if="n === 9">T-DNA Selection (in <i>plants</i>)</td>
                <td class="no-table-padding" v-if="n === 9">
                  <table>
                    <tr v-for="(construct, index) in constructs" :key="index">
                      <td class="fixed-width">{{ index + 1 }}.</td>
                      <td>{{ construct.tdnaSelection }}</td>
                    </tr>
                  </table>
                </td>

                <!-- For the 10th row -->
                <td v-if="n === 10" colspan="2">Status: {{ status }}</td>

                <!-- For the 11th row -->
                <td v-if="n === 11" colspan="2">
                  <div class="notes-room">
                    <div class="pb1em">Notes:</div>
                    <div v-if="notes">{{ notes }}</div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <b-button
      type="is-danger"
      v-if="canDeleteRequest"
      @click="handleDeleteRequest"
      >Delete request</b-button
    >
  </div>
</template>

<script>
import DisplayConstructCard from '../components/DisplayConstructCard.vue';

export default {
  middleware: 'auth',
  components: {
    DisplayConstructCard,
  },
  asyncData({ route, $axios, error }) {
    if (!route.query.id) {
      return {
        error: 'No TRF ID provided',
      };
    }
    const routeQueryId = route.query.id;
    return $axios
      .get('/api/form', { params: { trfId: routeQueryId } })
      .then((res) => {
        if (res.status === 200 && res.data.trfId === route.query.id) {
          const {
            creatorIsGroupLeader,
            notes,
            status,
            _id,
            date,
            username,
            creatorIsAdmin,
            signatoryObj,
            species,
            genotype,
            constructs,
            trfId,
            sessionUser,
          } = res.data;

          return {
            creatorIsGroupLeader,
            notes,
            status,
            _id,
            date,
            username,
            creatorIsAdmin,
            signatoryObj,
            species,
            genotype,
            constructs,
            trfId,
            sessionUser,
            error: '', // initialise regardless
            completedMsg: '',
            completingInProgressSteps: false,
            printable: false,
            loading: false,
          };
        } else {
          const err = res.data.error || 'Not getting form from TRF ID';
          console.error(err);
          return {
            error: 'No TRF found from URL params',
            loading: false,
          };
        }
      })
      .catch((err) => {
        console.error(err);
        return {
          error: 'No TRF found',
          loading: false,
        };
      });
  },
  methods: {
    handlePrint() {
      this.printable = true;
      setTimeout(window.print, 300);
      window.onafterprint = () => {
        this.printable = false;
      };
    },
    handleDeleteRequest() {
      this.$buefy.dialog.confirm({
        title: 'Delete request',
        message: 'Are you sure you want to delete this request?',
        confirmText: 'Delete',
        cancelText: 'Cancel operation',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          return this.$axios
            .post('/api/form/delete', {
              trfId: this.trfId,
              signatoryObj: this.signatoryObj, // needed for email
              username: this.username, // needed for email
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'deleted'; // got status from API
                this.loading = false;

                this.$buefy.toast.open({
                  message: 'Request deleted',
                  type: 'is-success',
                });
              } else {
                this.loading = false;
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
              this.throwUnexpectedErrorForUser(err);
              this.loading = false;
            });
        },
      });
    },
    throwUnexpectedErrorForUser(errorMsg) {
      this.$buefy.toast.open({
        message: 'Unexpected error. Please contact system admin.',
        type: 'is-danger',
      });
      console.error(errorMsg);
    },

    handleApprove() {
      this.$buefy.dialog.confirm({
        title: 'Approve request',
        message: 'Are you sure you want to approve this request?',
        confirmText: 'Approve',
        cancelText: 'Cancel',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;

          return this.$axios
            .post('/api/form/approve', {
              trfId: this.trfId,
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'approved'; // got status from API
                this.loading = false;

                this.$buefy.toast.open({
                  message: 'Request approved',
                  type: 'is-success',
                });
              } else {
                this.loading = false;
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
              this.loading = false;
              this.throwUnexpectedErrorForUser(err);
            });
        },
      });
    },
    handleInitiateSetInProgress() {
      this.completingInProgressSteps = true;
    },
    cancelSetInProgress() {
      this.completingInProgressSteps = false;
    },
    handleCompleteSetInProgress() {
      this.$buefy.dialog.confirm({
        title: 'Set into progress',
        message:
          // COULD DO: generate complex str'<p>This is your first shortname</p><br /><p>Are you sure ...',
          '<p>Are you sure you want to set this request into progress with any shortnames you have assigned?</p>',
        confirmText: 'Set In Progress',
        cancelText: 'Cancel',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;

          return this.$axios
            .post('/api/form/inprogress', {
              trfId: this.trfId,
              constructs: this.constructs,
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'in progress'; // got status from API
                this.loading = false;
                this.$buefy.toast.open({
                  message: 'Request set in progress!',
                  type: 'is-success',
                });
              } else {
                this.loading = false;
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
              this.loading = false;
              this.throwUnexpectedErrorForUser(err);
            });
        },
      });
    },
    handleComplete() {
      this.$buefy.dialog.prompt({
        title: 'Complete request',
        message: `Add short note to completed email sent to user?<br /><i>Click or press return to send</i>`,
        inputAttrs: {
          placeholder: 'Optional',
          maxlength: 200,
          required: false,
        },
        trapFocus: true,
        confirmText: 'Confirm Completion',
        cancelText: 'Cancel',
        onConfirm: (value) => {
          this.loading = true;
          return this.$axios
            .post('/api/form/completed', {
              trfId: this.trfId,
              completedMsg: value.trim(),
              username: this.username,
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'completed'; // got status from API
                this.loading = false;

                this.$buefy.toast.open({
                  message: 'Request set as complete!',
                  type: 'is-success',
                });
              } else {
                this.loading = false;
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
              this.loading = false;
              this.throwUnexpectedErrorForUser(err);
            });
        },
      });
    },
    handleDeny() {
      this.$buefy.dialog.confirm({
        title: 'Deny request',
        message: 'Are you sure you want to deny this request?',
        confirmText: 'Deny',
        cancelText: 'Cancel',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          return this.$axios
            .post('/api/form/deny', {
              trfId: this.trfId,
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'denied'; // get status from API

                this.loading = false;

                this.$buefy.toast.open({
                  message: 'Request has been successfully updated as "Denied"',
                  type: 'is-successful',
                });
              } else {
                this.loading = false;
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
              this.loading = false;
              this.throwUnexpectedErrorForUser(err);
            });
        },
      });
    },
  },
  /** print methods */
  mounted() {
    if (this.printable) {
      document.body.classList.add('printable-mode');
    }
  },
  watch: {
    printable(newValue) {
      if (newValue) {
        document.body.classList.add('printable-mode');
      } else {
        document.body.classList.remove('printable-mode');
      }
    },
  },
  beforeDestroy() {
    document.body.classList.remove('printable-mode');
  },
  computed: {
    canDeleteRequest() {
      if (this.status === 'deleted') {
        return false;
      }
      if (this.printable) {
        return false;
      }
      if (this.error) {
        return false;
      }
      const notOwner = this.username !== this.sessionUser.username;
      if (notOwner && !this.sessionUser.isAdmin) {
        return false;
      }
      return true;
    },
    getWrapperClass() {
      const getWrapperCssStr = (status) => {
        switch (status) {
          case 'completed':
            return 'faded';
          case 'deleted':
            return 'strikethrough faded';
          case 'denied':
            return 'faded';
          default:
            return '';
        }
      };

      return getWrapperCssStr(this.status);
    },
    getTitleClass() {
      const getCssAppendage = (status) => {
        switch (status) {
          case 'completed':
            return ' finished';
          case 'deleted':
            return ' dangerous';
          case 'denied':
            return ' dangerous';
          default:
            return '';
        }
      };

      const appendage = getCssAppendage(this.status);
      return `title is-2${appendage}`;
    },
    getTitleText() {
      if (!this.trfId) {
        return 'No TRF ID';
      }
      const getAppendage = (status) => {
        switch (status) {
          case 'completed':
            return ': COMPLETED';
          case 'deleted':
            return ': DELETED';
          case 'denied':
            return ': DENIED';
          default:
            return '';
        }
      };

      const appendage = getAppendage(this.status);
      return `TRF Form #${this.trfId}${appendage}`;
    },
    sessionIsAdmin() {
      const result = this.sessionUser.isAdmin;
      return result;
    },
    sessionUsername() {
      return this.sessionUser.username;
    },
    sessionIsSignatory() {
      if (
        !this.sessionUser ||
        !this.sessionUser.username ||
        !this.signatoryObj ||
        !this.signatoryObj.username
      ) {
        return false;
      }

      return this.sessionUser.username === this.signatoryObj.username;
    },
    authorisedToApprove() {
      if (!this.sessionUser || !this.signatoryObj) {
        return false;
      }

      const { username, isAdmin } = this.sessionUser;

      // move
      const getAuthorisedToApprove = (
        mongoSignatoryUsername,
        sessionUsername,
        sessionIsAdminBool
      ) => {
        if (sessionIsAdminBool) {
          return true;
        } else if (mongoSignatoryUsername === sessionUsername) {
          return true;
        } else {
          return false;
        }
      };

      // Authorisation logic/check
      return getAuthorisedToApprove(
        this.signatoryObj.username, // required signatory username
        username, // session username
        isAdmin // session is admin
      );
    },
    authorisedToView() {
      if (!this.signatoryObj) {
        return false;
      }

      const { username, isAdmin } = this.sessionUser;

      // move
      const getAuthorisedToView = (
        mongoSignatoryUsername,
        mongoUsername,
        sessionUsername,
        sessionIsAdminBool,
        researchAssistants
      ) => {
        if (sessionIsAdminBool) {
          return true;
        } else if (mongoSignatoryUsername === sessionUsername) {
          return true;
        } else if (mongoUsername === sessionUsername) {
          return true;
        } else if (researchAssistants.includes(sessionUsername)) {
          return true;
        } else {
          return false;
        }
      };

      // Authorisation logic/check
      return getAuthorisedToView(
        this.signatoryObj.username, // required signatory username
        this.username, // form username
        username, // session username
        isAdmin, // session is admin
        this.signatoryObj.researchAssistants
      );
    },
  },
};
</script>

<style scoped>
.username-message {
  font-size: 0.75rem;
}

.entire-field {
  display: flex;
  flex-direction: column;
}

.label-and-input {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.custom-b-input {
  margin-left: 10px;
}

.custom-label {
  margin-bottom: 0 !important;
  display: flex;
  flex-direction: column;
}

.wrap-warning {
  display: flex;
  flex-direction: column;
  color: #ff3860;
}

.display-construct-cards-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}

.display-construct-cards-wrapper > div {
  margin-bottom: 20px;
}

.status-wrapper {
  margin-bottom: 20px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
}

.faded {
  opacity: 40%;
}

.strikethrough {
  background: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 0.8px),
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) calc(50% + 0.8px),
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      to top right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 0.8px),
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) calc(50% + 0.8px),
      rgba(0, 0, 0, 0) 100%
    );
}

hr {
  opacity: 0;
}

.component-wrapper {
  padding: 5px;
}

.dangerous {
  color: #ff3860;
}

.finished {
  color: green;
  font-weight: bold;
}

.shortNameInputWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.padding {
  padding-left: 10px;
  padding-right: 30px;
}

.shortNamesWrapper {
  padding-top: 10px;
  padding-bottom: 10px;
}
.shortNamesWrapper > * {
  margin-bottom: 10px;
}

.row-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.row-wrapper > * {
  flex: 1;
}

.row-wrapper > *:not(:first-child) {
  margin-left: 20px;
}

.printAndCompleteWrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.pl10 {
  padding-left: 10px;
}

.pb10 {
  padding-bottom: 10px;
}

.mb20 {
  margin-bottom: 20px;
}

.ml10 {
  margin-left: 10px;
}

.blank-space {
  border: 1px dotted grey;
  padding: 2rem;
  padding-bottom: 300px;
}

.bigger {
  font-size: 1.5rem;
}

/* Table styles */
#styled-table table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.9em; /* Reduce the font size slightly */
}

/* Black border for each row */
#styled-table tr {
  border-bottom: 1px solid black;
}

/* Remove the border from the last row */
#styled-table tr:last-child {
  border-bottom: none;
}

/* Adjusted cell padding for a tighter appearance */
#styled-table td {
  padding: 5px; /* Reduced padding from 10px to 5px */
  border-right: 1px solid black; /* Add border to the right of each cell */
}

/* Remove the right border from the last cell in each row */
#styled-table td:last-child {
  border-right: none;
}

/* Double border effect using div and padding */
#styled-table-container {
  padding: 3px;
  border: 1px solid black;
}

#styled-table {
  border: 1px solid black;
}

.no-table-padding {
  padding: 0 !important;
}

.fixed-width {
  width: 2rem;
}

.first-col {
  width: 30%;
}

.pb1em {
  padding-bottom: 1.5em;
}

.notes-room {
  padding-bottom: 50px;
}
</style>
