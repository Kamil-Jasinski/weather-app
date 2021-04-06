<template>
  <button @click="logout" class="__logout">Logout</button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Logout extends Vue {
  email = "";
  password = "";
  logoutAlert: any;

  logout(): void {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // CLEAR ALERT TIMEOUT
        window.clearTimeout(this.logoutAlert);

        // Clear user name

        this.$store.commit("SET_USER_NAME", { userName: "" });

        // IS USER LOGGED IN ?
        this.$store.commit("CHANGE_IS_LOGGED_IN", { logged: false });

        // SET SUCCESS ALERT
        this.$store.commit("SET_LOGIN_ALERT", {
          showAlert: true,
          content: "Successfull logged out!",
          class: "success",
        });

        // SET ALERT TIMEOUT / CLEAR ALERT
        this.logoutAlert = setTimeout(() => {
          this.$store.commit("SET_LOGIN_ALERT", {
            showAlert: false,
            content: "",
            class: "",
          });
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
