<template>
  <button @click="logout" class="__logout">Logout</button>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Logout extends Vue {
  email = "";
  password = "";

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("Successfully logged out");
        this.$store.commit("CHANGE_IS_LOGGED_IN", { logged: false });
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
