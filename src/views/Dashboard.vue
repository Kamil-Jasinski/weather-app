<template>
  <div class="login-page">
    <div v-if="isLoggedIn" class="__userName">Logged as: {{ userName }}</div>
    <div v-else class="__logout-notify">
      <h2>
        Hi, you need to be logged in to use this app.
      </h2>
    </div>
    <Login v-if="!isLoggedIn" />
    <Register v-if="!isLoggedIn" />
    <Logout v-if="isLoggedIn" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Login from "@/components/dashboard/Login.vue";
import Logout from "@/components/dashboard/Logout.vue";
import Register from "@/components/dashboard/Register.vue";
import firebase from "firebase";

@Component({
  components: {
    Login,
    Register,
    Logout,
  },
})
export default class Dashboard extends Vue {
  get isLoggedIn() {
    return this.$store.getters.isLoggedIn;
  }

  get userName(): void {
    let name: string;
    if (firebase.auth().currentUser !== null) {
      name = firebase.auth().currentUser.email;
    } else {
      name = "";
    }

    return name;
  }
}
</script>

<style lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;

  background-color: #eb4d4b;
  border-radius: 25px;
  min-width: 30%;
  height: auto;

  .__userName {
    border: 1px solid #ffffff;
    border-radius: 25px;
    padding: 10px;
    min-width: 25%;
    background-color: transparent;
    outline: none;
    margin: 20px 0;
    color: #fff;
    display: flex;
  }

  .__logout-notify {
    padding: 20px;
    background-color: #fff;
    border-radius: 25px;
    h2 {
      color: #eb4d4b;
      margin: 0;
      font-weight: bold;
    }
  }

  h2 {
    color: #fff;
    font-weight: 200;
    letter-spacing: 0.25rem;
    margin-bottom: 20px;
    align-self: center;
    justify-self: center;
  }

  input {
    border: 1px solid #ffffff;
    border-radius: 25px;
    padding: 10px;
    min-width: 25%;
    background-color: transparent;
    outline: none;
    margin: 0 10px;
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  }

  button {
    border: 1px solid #fff;
    border-radius: 25px;
    padding: 10px;
    background-color: #fff;
    font-weight: bold;
    font-size: 1rem;
    outline: none;
    color: #eb4d4b;
    &:hover {
      color: #fff;
      background-color: #eb4d4b;
      cursor: pointer;
    }
  }
}
</style>
