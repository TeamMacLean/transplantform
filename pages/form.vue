<template>
  <div>
    <div :class="getWrapperClass">
      <div class="component-wrapper">
        <h1 :class="getTitleClass">
          {{ getTitleText }}
        </h1>

        <b-loading v-if="loading" is-full-page></b-loading>
        <div v-else-if="error">
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
              <!-- <hr /> -->
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
                    maxlength="10"
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

          <b-field label="Notes">
            <div>{{ notes || '[No notes]' }}</div>
          </b-field>

          <hr />
        </div>
      </div>
    </div>
    <b-button
      type="is-danger"
      v-if="status !== 'deleted' && !printable && !error"
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
  mounted() {
    // these are from computed but asyncData hates them there
    // TODO refactor these functions dropped into this mounted hook
    function sessionIsAdmin(ctx) {
      if (!ctx || !ctx.$auth) {
        return false;
      }
      const result = ctx.$auth.$state.user.isAdmin;
      return result;
    }
    function sessionUsername(ctx) {
      if (!ctx || !ctx.$auth) {
        return false;
      }

      return ctx.$auth.$state.user.username;
    }
    function sessionIsSignatory(ctx) {
      if (
        !ctx ||
        !ctx.$auth ||
        !ctx.$auth.$state ||
        !ctx.$auth.$state.user ||
        !ctx.$auth.$state.user.username ||
        !ctx.signatoryObj ||
        !ctx.signatoryObj.username
      ) {
        return false;
      }

      return ctx.$auth.$state.user.username === ctx.signatoryObj.username;
    }
    function authorisedToApprove(ctx) {
      if (
        !ctx ||
        !ctx.$auth ||
        !ctx.$auth.$state ||
        !ctx.$auth.$state.user ||
        !ctx.signatoryObj
      ) {
        return false;
      }

      const { user } = ctx.$auth.$state;
      const { username, isAdmin } = user;

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
        ctx.signatoryObj.username, // required signatory username
        username, // session username
        isAdmin // session is admin
      );
    }
    function authorisedToView(ctx) {
      if (!ctx || !ctx.$auth || !ctx.signatoryObj) {
        return false;
      }

      const { user } = ctx.$auth.$state;
      const { username, isAdmin } = user;

      // move
      const getAuthorisedToView = (
        mongoSignatoryUsername,
        mongoUsername,
        sessionUsername,
        sessionIsAdminBool
      ) => {
        if (sessionIsAdminBool) {
          return true;
        } else if (mongoSignatoryUsername === sessionUsername) {
          return true;
        } else if (mongoUsername === sessionUsername) {
          return true;
        } else {
          return false;
        }
      };

      // Authorisation logic/check
      return getAuthorisedToView(
        ctx.signatoryObj.username, // required signatory username
        ctx.username, // form username
        username, // session username
        isAdmin // session is admin
      );
    }

    this.sessionIsAdmin = sessionIsAdmin(this);
    this.sessionUsername = sessionUsername(this);
    this.sessionIsSignatory = sessionIsSignatory(this);
    this.authorisedToApprove = authorisedToApprove(this);
    this.authorisedToView = authorisedToView(this);
    this.loading = false;
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
            error: '', // initialise regardless to avoid errors
            completedMsg: '',
            completingInProgressSteps: false,
            printable: false,
            //
            sessionIsAdmin: false,
            sessionUsername: false,
            sessionIsSignatory: false,
            authorisedToApprove: false,
            authorisedToView: false,
            loading: true,
          };
        } else {
          const err = res.data.error || 'Not getting form from TRF ID';
          console.error(err);
          return {
            error: 'No TRF found from URL params',
            //
            creatorIsGroupLeader: false,
            notes: null,
            status: null,
            _id: null,
            date: null,
            username: null,
            creatorIsAdmin: null,
            signatoryObj: null,
            species: null,
            genotype: null,
            constructs: null,
            trfId: null,
            completedMsg: '',
            completingInProgressSteps: false,
            printable: false,
            sessionIsAdmin: false,
            sessionUsername: false,
            sessionIsSignatory: false,
            authorisedToApprove: false,
            authorisedToView: false,
            loading: false,
          };
        }
      })
      .catch((err) => {
        console.error(err);
        return {
          error: 'No TRF found',
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
          return this.$axios
            .post('/api/form/delete', {
              trfId: this.trfId,
              signatoryObj: this.signatoryObj, // needed for email
              username: this.username, // needed for email
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'deleted'; // got status from API

                this.$buefy.toast.open({
                  message: 'Request deleted',
                  type: 'is-success',
                });
              } else {
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
              this.throwUnexpectedErrorForUser(err);
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
          return this.$axios
            .post('/api/form/approve', {
              trfId: this.trfId,
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'approved'; // got status from API

                this.$buefy.toast.open({
                  message: 'Request approved',
                  type: 'is-success',
                });
              } else {
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
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
          return this.$axios
            .post('/api/form/inprogress', {
              trfId: this.trfId,
              constructs: this.constructs,
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'in progress'; // got status from API
                this.$buefy.toast.open({
                  message: 'Request set in progress!',
                  type: 'is-success',
                });
              } else {
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
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
          return this.$axios
            .post('/api/form/completed', {
              trfId: this.trfId,
              completedMsg: value.trim(),
              username: this.username,
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'completed'; // got status from API

                this.$buefy.toast.open({
                  message: 'Request set as complete!',
                  type: 'is-success',
                });
              } else {
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
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
          return this.$axios
            .post('/api/form/deny', {
              trfId: this.trfId,
            })
            .then((res) => {
              if (res.status === 200) {
                this.status = 'denied'; // get status from API

                this.$buefy.toast.open({
                  message: 'Request has been successfully updated as "Denied"',
                  type: 'is-successful',
                });
              } else {
                this.throwUnexpectedErrorForUser('Status was not 200');
              }
            })
            .catch((err) => {
              this.throwUnexpectedErrorForUser(err);
            });
        },
      });
    },
  },
  computed: {
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
  color: red;
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
  color: red;
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
</style>
