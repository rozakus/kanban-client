<template>
  <section
    style="display: flex; justify-content: flex-end; margin: 50px 0"
    id="page-register"
  >
    <div class="col-3 card shadow" style="width: 22rem; margin-right: 100px">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Register</h2>
        <form @submit.prevent="register">
          <label for="emailRegister">Email address</label>
          <input
            v-model="inputRegister.email"
            type="email"
            id="emailRegister"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            style="margin: 15px 0px"
          />

          <label for="passwordRegister">Password</label>
          <input
            v-model="inputRegister.password"
            type="password"
            id="passwordRegister"
            class="form-control"
            placeholder="Password"
            required
            style="margin: 15px 0px"
          />

          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Register
          </button>
          <button
            @click="showLoginPage"
            class="w-100 btn btn-lg btn-warning"
            type="button"
            id="to-page-login"
            style="margin: 15px 0px"
          >
            Already have an account
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
  name: "RegisterPage",
  directives: {
    GoogleSignInButton,
  },
  data() {
    return {
      inputRegister: {
        email: "",
        password: "",
      },
      clientId:
        "847872434739-ieov91f4btpg8551tira12pvdtatudrg.apps.googleusercontent.com",
    };
  },
  methods: {
    register() {
      this.$emit("register", this.inputRegister);
    },
    showLoginPage() {
      this.$emit("showLoginPage");
    },
    OnGoogleAuthSuccess(id_token) {
      // Receive the idToken and make your magic with the backend
      console.log(">>> id token", id_token);
      this.$emit("loginGoogle", id_token);
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
  },
};
</script>

<style>
</style>