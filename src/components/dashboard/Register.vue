<template>
  <div class="__register">
    <form @submit.prevent="register">
      <h2>Register</h2>
      <input type="email" placeholder="Email address..." v-model="email" />
      <input type="password" placeholder="password..." v-model="password" />
      <button type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Register extends Vue {
  email = "";
  password = "";

  register() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert("Successfully registered!");
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
.__register {
  width: 100%;
  padding: 25px;
}
</style>
