<template>
  <div class="__login">
    <form @submit.prevent="login">
      <h2>LOGIN</h2>
      <input type="email" placeholder="Email address..." v-model="email" />
      <input type="password" placeholder="password..." v-model="password" />
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Login extends Vue {
  email = "";
  password = "";
  loginAlert: any;

  login(): void {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        // CLEAR ALERT TIMEOUT
        window.clearTimeout(this.loginAlert);

        // IS USER LOGGED IN ?
        this.$store.commit("CHANGE_IS_LOGGED_IN", { logged: true });

        // SET SUCCESS ALERT
        this.$store.commit("SET_LOGIN_ALERT", {
          showAlert: true,
          content: "Successfull logged in!",
          class: "success",
        });

        // SET ALERT TIMEOUT / CLEAR ALERT
        this.loginAlert = setTimeout(() => {
          this.$store.commit("SET_LOGIN_ALERT", {
            showAlert: false,
            content: "",
            class: "",
          });
          this.$router.push("/home");
        }, 3000);
      })
      .catch((error) => {
        // SET ERROR ALERT
        this.$store.commit("SET_LOGIN_ALERT", {
          showAlert: true,
          content: error.message,
          class: "error",
        });
      });
  }
}
</script>

<style lang="scss" scoped>
.__login {
  width: 100%;
  padding: 25px;
}
</style>
