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

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Register extends Vue {
  email = "";
  password = "";
  registerAlert: any;

  register(): void {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        // CLEAR ALERT TIMEOUT
        window.clearTimeout(this.registerAlert);

        // IS USER LOGGED IN ?
        this.$store.commit("CHANGE_IS_LOGGED_IN", { logged: true });

        // SET SUCCESS ALERT
        this.$store.commit("SET_LOGIN_ALERT", {
          showAlert: true,
          content: "Welcome on the board! Have a nice time!",
          class: "success",
        });

        // SET ALERT TIMEOUT / CLEAR ALERT
        this.registerAlert = setTimeout(() => {
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
.__register {
  width: 100%;
  padding: 25px;
}
</style>
