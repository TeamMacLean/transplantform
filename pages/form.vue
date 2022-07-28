<template>
  <div :class="getWrapperClass">
    <div class="component-wrapper">
      <h1 :class="getTitleClass">
        {{ getTitleText }}
      </h1>

      <h3 v-if="sessionIsAdmin" class="title is-4">I am an admin user</h3>
      <h3 v-else-if="sessionIsSignatory" class="title is-4">
        I am a group leader
      </h3>
      <h3 v-else class="title is-4">I am a regular user</h3>

      <div v-if="error">
        <p>
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
        <div class="status-wrapper">
          <h1 class="title is-3">Status: {{ this.status }}</h1>
          <div
            v-if="
              (sessionIsAdmin || sessionIsSignatory) && status === 'unapproved'
            "
          >
            <b-button @click="handleApprove" type="is-success is-light"
              >Approve</b-button
            >
            <b-button @click="handleDeny" type="is-danger is-light"
              >Deny</b-button
            >
            <hr />
          </div>
          <div v-if="sessionIsAdmin && status === 'approved'">
            <b-button @click="handleSetInProgress" type="is-success"
              >Set In Progress</b-button
            >
            <hr />
          </div>
          <div v-if="sessionIsAdmin && status === 'in progress'">
            <b-button @click="handleComplete" type="is-success is-light"
              >Complete request</b-button
            >
            <hr />
          </div>
        </div>

        <b-field grouped>
          <b-field label="Date">
            <div>{{ this.date }}</div>
          </b-field>

          <b-field label="Username">
            <div>{{ this.username }}</div>
          </b-field>

          <b-field label="Signatory">
            <div>{{ this.signatoryObj.name }}</div>
          </b-field>
        </b-field>

        <hr />

        <b-field grouped>
          <b-field label="Species">
            <div>{{ this.species }}</div>
          </b-field>

          <b-field label="Genotype">
            <div>{{ this.genotype }}</div>
          </b-field>
        </b-field>

        <hr />

        <h3 class="title is-3">Constructs</h3>
        <h3 class="title is-6">In priority order</h3>

        <div class="display-construct-cards-wrapper">
          <DisplayConstructCard
            v-for="(card, index) in formConstructCards"
            :theIndex="index"
            :card="card"
            :key="index"
            :status="status"
          />
        </div>

        <hr />

        <b-field label="Notes">
          <div>{{ notes }}</div>
        </b-field>

        <hr />

        <b-button
          type="is-danger"
          v-if="status !== 'deleted'"
          @click="handleDeleteRequest"
          >Delete request</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import DisplayConstructCard from '../components/DisplayConstructCard.vue';
import { getFormDataFromId } from '../modules/hardcodedData.js';

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

    // TODO fetch error from server
    const theData = getFormDataFromId(route.query.id);

    const theDataResults = theData ? theData : {};

    return {
      ...theDataResults,
      error: '', // initialise regardless to avoid errors
    };

    // return $axios
    //   .get("/form", { params: { id: route.query.id } })
    //   .then((res) => {
    //     if (res.status === 200 && res.data.trfForm) {
    //       const trfForm = res.data.trfForm;
    //       return {
    //         ...trfForm, // TODO remove
    //         trfId: trfForm.id,
    //       };
    //     } else {
    //       error({ statusCode: 501, message: "TRF form not found" });
    //       this.$buefy.toast.open({
    //         message: 'Unexpected error. Please contact system admin.',
    //         type: "is-danger",
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     error({ statusCode: 501, message: "TRF form not found" });
    //     this.$buefy.toast.open({
    //       message: 'Unexpected error. Please contact system admin.',
    //       type: "is-danger",
    //     });
    //   });
  },
  methods: {
    handleDeleteRequest() {
      this.$buefy.dialog.confirm({
        title: 'Delete request',
        message: 'Are you sure you want to delete this request?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          // TODO send approval to API and get a response
          // ...

          this.status = 'deleted'; // get status from API

          this.$buefy.toast.open({
            message: 'Request deleted',
            type: 'is-success',
          });
        },
      });
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
          // TODO send approval to API and get a response
          // ...

          this.status = 'approved'; // get status from API

          this.$buefy.toast.open({
            message: 'Request approved',
            type: 'is-success',
          });
        },
      });
    },
    handleSetInProgress() {
      this.$buefy.dialog.confirm({
        title: 'Set into progress',
        message: 'Are you sure you want to set this request into progress?',
        confirmText: 'Approve',
        cancelText: 'Cancel',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => {
          // TODO send into progress status to API and get a response
          // ...

          this.status = 'in progress'; // get status from API

          this.$buefy.toast.open({
            message: 'Request set in progress!',
            type: 'is-success',
          });
        },
      });
    },
    handleComplete() {
      this.$buefy.dialog.confirm({
        title: 'Complete',
        message: 'Are you sure you want to set this request as completed?',
        confirmText: 'Approve',
        cancelText: 'Cancel',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => {
          // TODO send completed status to API and get a response
          // ...

          this.status = 'completed'; // get status from API

          this.$buefy.toast.open({
            message: 'Request set as complete!',
            type: 'is-success',
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
          // TODO send rejection to API and get a response
          // ...
          this.status = 'denied'; // get status from API

          this.$buefy.toast.open({
            message: 'Request denied',
            type: 'is-danger',
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
          default:
            return '';
        }
      };

      const appendage = getCssAppendage(this.status);
      return `title is-2${appendage}`;
    },
    getTitleText() {
      const getAppendage = (status) => {
        switch (status) {
          case 'completed':
            return ': COMPLETED';
          case 'deleted':
            return ': DELETED';
          default:
            return '';
        }
      };

      const appendage = getAppendage(this.status);
      return `TRF Form #${this.trfId}${appendage}`;
    },
    sessionIsAdmin() {
      const result = this.$auth.$state.user.isAdmin;
      console.log('this auth', this.$auth.$state);
      console.log('sessionIsAdmin', result);
      return result;
    },
    sessionUsername() {
      return this.$auth.$state.user.username;
    },
    sessionIsSignatory() {
      return this.$auth.$state.user.username === this.signatoryObj.username;
    },
    authorisedToApprove() {
      // TODO get backend not to send data but error message if not authorised

      const { user } = this.$auth.$state;
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
        this.signatoryObj.username, // required signatory username
        username, // session username
        isAdmin // session is admin
      );
    },
    authorisedToView() {
      // TODO get backend not to send data but error message if not authorised

      const { user } = this.$auth.$state;
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
        this.signatoryObj.username, // required signatory username
        this.username, // form username
        username, // session username
        isAdmin // session is admin
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
  color: red;
}

.display-construct-cards-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}

.display-construct-cards-wrapper > div {
  margin-bottom: 30px;
}

.status-wrapper {
  padding-bottom: 20px;
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
</style>
