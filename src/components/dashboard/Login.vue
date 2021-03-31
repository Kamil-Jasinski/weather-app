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

<script>
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Login extends Vue {
  email = "";
  password = "";

  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert("Successfully logged in");
        this.$store.commit("CHANGE_IS_LOGGED_IN", { logged: true });
        this.$router.push("/home");
      })
      .catch((error) => {
        alert(error.message);
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
