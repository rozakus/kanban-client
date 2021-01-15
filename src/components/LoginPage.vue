<template>
  <section
    style="display: flex; justify-content: flex-end; margin: 50px 0"
    id="page-login"
  >
    <div class="col-3 card shadow" style="width: 22rem; margin-right: 100px">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Login</h2>
        <form @submit.prevent="login">
          <label for="emailLogin">Email address</label>
          <input
            v-model="inputLogin.email"
            type="email"
            id="emailLogin"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            style="margin: 15px 0px"
          />

          <label for="passwordLogin">Password</label>
          <input
            v-model="inputLogin.password"
            type="password"
            id="passwordLogin"
            class="form-control"
            placeholder="Password"
            required
            style="margin: 15px 0px"
          />

          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
          <button
            @click="showRegisterPage"
            class="w-100 btn btn-lg btn-danger"
            type="button"
            id="to-page-register"
            style="margin: 15px 0px"
          >
            Register an Account
          </button>
          <button
            v-google-signin-button="clientId"
            class="google-signin-button btn btn-lg btn-outline-primary text-center"
          >
            <i class="bi bi-google mx-2" />
            &nbsp; Continue with Google
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  name: "LoginPage",
  directives: {
    GoogleSignInButton,
  },
  data() {
    return {
      inputLogin: {
        email: "",
        password: "",
      },
      clientId:
        "847872434739-ieov91f4btpg8551tira12pvdtatudrg.apps.googleusercontent.com",
    }
  },
  methods: {
    login() {
      this.$emit("login", this.inputLogin);
    },
    showRegisterPage() {
      this.$emit("showRegisterPage");
    },
    OnGoogleAuthSuccess(id_token) {
      // Receive the idToken and make your magic with the backend
      console.log('>>> id token', id_token)
      this.$emit("loginGoogle", id_token)
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
  },
};
</script>

<style>
</style>