<template>
  <div id="login">
    <div class="card">


      <div class="card-header" v-show="!!!$store.state.user">
        <p class="card-header-title">
          Please Sign In
        </p>
      </div>

      <div class="card-content">
        <form @submit.prevent="onSubmit" v-if="!$store.state.user">

          <div class="field">
            <div class="control">
              <input class="input" id="username" type="text" name="username" title="username"
                     placeholder="Username" autocomplete="current-password"
                     v-model="credentials.username" required autofocus>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" id="password" type="password" name="password" title="password"
                     placeholder="Password" autocomplete="current-password"
                     v-model="credentials.password" required>
            </div>
          </div>

          <div class="level options">
            <div class="checkbox level-left">
              <input type="checkbox" id="checkbox" class="regular-checkbox">
              <label for="checkbox"></label>
              <span class="has-text-weight-light has-text-dark is-size-7">Remember me</span>
            </div>

            <a class="level-right has-text-weight-light	has-text-dark is-size-7" href="#">Forgot
              Password?</a>
          </div>
          <div v-if="submitting">Submitting ....</div>
          <button type="submit" class="button is-primary is-fullwidth is-outlined">Sign in</button>
        </form>
        <div v-else>
          You are logged in!
        </div>
        <div style="color: red;" v-if="error">{{error}}</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        submitting: false,
        error: null,
        credentials: {
          username: '',
          password: ''
        },
      }
    },
    methods: {
      async onSubmit() {
        const self = this;
        self.submitting = true;


        console.log(this.$auth)
        this.$auth.loginWith('local', {
          data: {
            username: self.credentials.username,
            password: self.credentials.password
          }
        })
          .then(() => {
            self.submitting = false;

            this.$router.push({
              path: '/'
            })

          })
          .catch(err => {
            self.submitting = false;
            self.error = err;
            console.error(err);
          })
      }
    }
  }
</script>

<style>

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


</style>
