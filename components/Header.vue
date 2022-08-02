<template>
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
            {{ this.$auth && this.$auth.user && this.$auth.user.name }}
          </a>

          <div class="navbar-dropdown">
            <nuxt-link
              v-if="this.$auth.user.isAdmin"
              to="/admin"
              class="navbar-item"
            >
              Edit database (<b>Admin </b>)</nuxt-link
            >
            <nuxt-link
              v-if="this.$auth.user.isAdmin"
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
</template>

<script>
export default {
  name: 'HeaderAfterLogin',
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
</style>
