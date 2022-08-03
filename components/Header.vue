<template>
  <!-- THIS WRAPPER DIV IS ALSO TEMP whilst testing different user roles -->
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
            v-show="this.$auth.loggedIn"
            class="navbar-item has-dropdown is-hoverable"
          >
            <a class="navbar-link">
              <font-awesome-icon
                :icon="['far', 'user-circle']"
                class="fa-2x"
                style="margin-right: 8px"
              />
              {{ this.sessionUser && this.sessionUser.name }}
            </a>

            <div class="navbar-dropdown">
              <nuxt-link
                v-if="this.sessionUser.isAdmin"
                to="/admin"
                class="navbar-item"
              >
                Edit database (<b>Admin </b>)</nuxt-link
              >
              <nuxt-link
                v-if="this.sessionUser.isAdmin"
                to="/constructs"
                class="navbar-item"
              >
                Search constructs (<b>Admin </b>)</nuxt-link
              >
              <a class="navbar-item" v-on:click="LogOut"> Sign out </a>
            </div>
          </div>

          <div v-show="!this.$auth.loggedIn" class="navbar-item">
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
      <p>My username is: '{{ user.username }}'</p>
      <p>I am {{ user.isAdmin ? '' : ' not ' }} an admin</p>
      <p>
        I am
        {{
          isGroupLeader
            ? ' a group leader for ' + isGroupLeaderFor
            : ' not a group leader'
        }}
      </p>
      <p>
        I am
        {{
          isResearchAssistant
            ? ' a research assistant for ' + isResearchAssistantFor
            : ' not a research assistant'
        }}
      </p>
      <p>I am {{ isNormalUser ? '' : ' not ' }} just a normal user</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderAfterLogin',
  // TEMP DATA
  data() {
    const { user } = this.$auth.$state;
    const isGroupLeader = !!(
      user.isGroupLeaderForObj && user.isGroupLeaderForObj.username
    );
    const isGroupLeaderFor = isGroupLeader
      ? user.isGroupLeaderForObj.username
      : null;
    const isResearchAssistant = !!user.isResearchAssistantFor;
    const isResearchAssistantFor = isResearchAssistant
      ? user.isResearchAssistantFor
      : null;
    const isNormalUser =
      !user.isAdmin && !isGroupLeader && !isResearchAssistant;
    return {
      sessionUser: user,
      isGroupLeader,
      isGroupLeaderFor,
      isResearchAssistant,
      isResearchAssistantFor,
      isNormalUser,
    };
  },
  methods: {
    async LogOut() {
      await this.$auth.logout();
      this.$store.commit('setUser', null);
      this.$store.commit('increment');
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
</style>
