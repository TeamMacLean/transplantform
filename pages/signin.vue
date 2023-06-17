<template>
  <div id="login">
    <div class="card">
      <div class="card-header" v-show="!!!$store.state.user">
        <p class="card-header-title">Please Sign In</p>
      </div>

      <div class="card-content">
        <form @submit.prevent="onSubmit" v-if="!$store.state.user">
          <div class="field has-addons">
            <p class="control is-expanded">
              <input
                class="input"
                id="username"
                type="text"
                name="username"
                title="username"
                placeholder="Username"
                v-model="credentials.username"
                required
                autofocus
              />
            </p>
            <p class="control">
              <a class="button is-static"> @nbi.ac.uk </a>
            </p>
          </div>
          <div class="field">
            <div class="control">
              <input
                class="input"
                id="password"
                type="password"
                name="password"
                title="password"
                placeholder="Password"
                v-model="credentials.password"
                required
              />
            </div>
          </div>
          <div class="field">
            <p class="pb5">Temporary testing of different roles</p>
            <p><i>- Imagined roles not actual people</i></p>
            <p class="pb20">
              <i>- Only works for Jodie or George during testing phase</i>
            </p>
            <b-radio v-model="radio" name="name" native-value="pikej">
              Admin user (pikej or deeks)
            </b-radio>
            <b-radio v-model="radio" name="name" native-value="jjones">
              Group Leader user (jjones)
            </b-radio>
            <b-radio v-model="radio" name="name" native-value="alam">
              Research Assistant user (alam)
            </b-radio>
            <b-radio v-model="radio" name="name" native-value="heal">
              Normal user (heal)
            </b-radio>
          </div>

          <!--<div class="level options">-->
          <!--<div class="checkbox level-left">-->
          <!--<input type="checkbox" id="checkbox" class="regular-checkbox">-->
          <!--<label for="checkbox"></label>-->
          <!--<span class="has-text-weight-light has-text-dark is-size-7">Remember me</span>-->
          <!--</div>-->

          <!--<a class="level-right has-text-weight-light	has-text-dark is-size-7" href="#">Forgot-->
          <!--Password?</a>-->
          <!--</div>-->
          <div v-if="submitting">Submitting ....</div>
          <button
            type="submit"
            class="button is-primary is-fullwidth is-outlined"
          >
            Sign in
          </button>
        </form>
        <div v-else>You are logged in!</div>
        <div style="color: red" v-if="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // console.log(this.$nuxt.context.from);
    return {
      submitting: false,
      error: null,
      radio: 'pikej',
      credentials: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      const self = this;
      self.submitting = true;

      this.$auth
        .loginWith('local', {
          data: {
            username: self.credentials.username,
            password: self.credentials.password,
            // Only during Jodie testing
            radio: self.radio,
          },
        })
        .then((results) => {
          self.submitting = false;

          this.$router.push({
            path: this.$nuxt.context.from.path,
          });
        })
        .catch((err) => {
          self.submitting = false;
          self.error = err;
          console.error(err);
        })
        .finally(() => {
          self.submitting = false;
        });
    },
  },
};
</script>

<style scoped>
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 55px);
  /*background: #F7F7F7;*/
}

#login .card {
  width: 24rem;
  border-radius: 4px;
  margin-top: -100px;
}

#login .regular-checkbox {
  margin-right: 2px;
}

.pb20 {
  padding-bottom: 20px;
}
.pb5 {
  padding-bottom: 5px;
}
</style>
