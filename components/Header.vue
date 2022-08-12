<template>
  <!-- THIS WRAPPER DIV IS ALSO TEMP whilst testing different user roles -->
  <!-- Also check that 'George Deeks (TSL) populates when all this user data stuff is stripped back out' -->
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item">
          <b class="has-text-primary">TransPlant</b>
        </nuxt-link>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          type="button"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link to="/new" class="navbar-item"> New TRF Form </nuxt-link>
          <nuxt-link to="/forms" class="navbar-item"> Search TRFs </nuxt-link>
          <nuxt-link to="/contact" class="navbar-item"> Contact Us </nuxt-link>
        </div>
        <div class="navbar-end">
          <div
            v-if="this.$auth.loggedIn"
            class="navbar-item has-dropdown is-hoverable"
          >
            <a class="navbar-link">
              <font-awesome-icon
                :icon="['far', 'user-circle']"
                class="fa-2x"
                style="margin-right: 8px"
              />
              {{ user && user.name ? user.name : '(Please refresh page)' }}
            </a>

            <div class="navbar-dropdown">
              <nuxt-link
                v-if="user && user.isAdmin"
                to="/admin"
                class="navbar-item"
              >
                Edit database (<b>Admin </b>)</nuxt-link
              >
              <nuxt-link
                v-if="user && user.isAdmin"
                to="/constructs"
                class="navbar-item"
              >
                Search constructs (<b>Admin </b>)</nuxt-link
              >
              <a class="navbar-item" v-on:click="LogOut"> Sign out </a>
            </div>
          </div>
          <div
            v-show="
              !this.$auth.loggedIn
              /**
               * DOES NOT WORK ON REFRESH PAGE
               * && this.$router.history.current.name !== 'signin'
               * */
            "
            class="navbar-item"
          >
            <div class="buttons">
              <nuxt-link
                to="/signin"
                class="button is-outlined is-primary"
                type="button"
              >
                Sign in
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- TEMP -->
    <div class="custom-admin-knowledge">
      <div
        v-show="this.$auth.loggedIn && !this.loading && this.webmasterTesting"
      >
        <div v-if="!user || !user.username">Please refresh for user info</div>
        <div v-else>
          <p class="underline">
            My username is: '{{
              (user && user.username) || '(Please refresh page)'
            }}'
          </p>
          <p :class="user && user.isAdmin ? 'is-green' : 'is-red'">
            - I am {{ user && user.isAdmin ? '' : ' not ' }} an admin
          </p>
          <p :class="isGroupLeader ? 'is-green' : 'is-red'">
            - I am
            {{
              isGroupLeader
                ? ' a group leader for ' + isGroupLeaderFor
                : ' not a group leader'
            }}
          </p>
          <p :class="isResearchAssistant ? 'is-green' : 'is-red'">
            - I am
            {{
              isResearchAssistant
                ? ' a research assistant for ' + isResearchAssistantFor
                : ' not a research assistant'
            }}
          </p>
          <p :class="isNormalLoggedInUser ? 'is-green' : 'is-red'">
            - I am {{ isNormalLoggedInUser ? '' : ' not ' }} just a normal user
          </p>
        </div>
        <div v-show="!this.$auth.loggedIn">
          <p>No one is logged in.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderAfterLogin',
  mounted() {
    if (this.user === null) {
      const theUser =
        this && this.$auth && this.$auth.$state && this.$auth.$state.user
          ? this.$auth.$state.user
          : null;

      const isGroupLeader = !!(theUser && theUser.isGroupLeaderForObj);
      const isGroupLeaderFor = isGroupLeader
        ? theUser.isGroupLeaderForObj.username
        : null;
      const isResearchAssistant = !!(theUser && theUser.isResearchAssistantFor);
      const isResearchAssistantFor = isResearchAssistant
        ? theUser.isResearchAssistantFor
        : null;
      const isNormalLoggedInUser =
        !(theUser && theUser.isAdmin) && !isGroupLeader && !isResearchAssistant;

      this.user = theUser;
      this.isGroupLeader = isGroupLeader;
      this.isGroupLeaderFor = isGroupLeaderFor;
      this.isResearchAssistant = isResearchAssistant;
      this.isResearchAssistantFor = isResearchAssistantFor;
      this.isNormalLoggedInUser = isNormalLoggedInUser;
      this.loading = false;

      this.$nuxt.refresh();
    }
  },
  data() {
    const { WEBMASTER_TESTING } = process.env;
    const webmasterTesting = WEBMASTER_TESTING === 'true';
    return {
      user: null,
      isGroupLeader: null,
      isGroupLeaderFor: null,
      isResearchAssistant: null,
      isResearchAssistantFor: null,
      isNormalLoggedInUser: null,
      loading: true,
      webmasterTesting,
    };
  },
  methods: {
    async LogOut() {
      const result = await this.$auth.logout();
      this.$router.push({
        path: '/',
      });
    },
  },
};
</script>
<style scoped>
.navbar-menu > .navbar-item.is-active {
  background-color: #f7f7f7 !important;
}

.custom-admin-knowledge {
  margin-left: 20px;
  font-size: 1rem;
  font-weight: bold;
}

.is-green {
  color: green;
}

.is-red {
  color: red;
}

.underline {
  text-decoration: underline;
  color: purple;
}
</style>
