<template>
  <div class="login-page">
    <div v-if="isLoggedIn" class="__userName">Logged as: {{ userName }}</div>
    <div v-else class="__logout-notify">
      <h2>
        Hi, you need to be logged in to use this app.
      </h2>
    </div>
    <p v-if="!isLoggedIn" class="__login-method">
      <span class="method" @click="loginForm('login')">Login</span> or
      <span class="method" @click="loginForm('register')">Register</span>
    </p>

    <Login v-if="!isLoggedIn && selectedForm === 'login'" />
    <Register v-if="!isLoggedIn && selectedForm === 'register'" />
    <Logout v-if="isLoggedIn" />
    <span v-if="isLoggedIn">
      <p style="color: #fff">Or</p>
      <button><router-link to="/home">Back to App</router-link></button>
    </span>
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
  selectedForm = "login";

  loginForm(form: string) {
    this.selectedForm = form;
  }

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

  background-color: #32355c;
  border-radius: 25px;
  min-width: 30%;
  height: auto;

  .__login-method {
    color: #fff;
    padding: 10px;
    .method {
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #eb4d4b;
      }
    }
  }

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
    background-color: #ffffff08;
    border-radius: 25px;
    h2 {
      color: #e8f0fe;
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
    background-color: transparent;
    font-weight: bold;
    font-size: 1rem;
    outline: none;
    background-color: #fff;
    color: #32355c;
    margin: 10px 0;
    transition: all 0.6 ease-in-out;

    a {
      text-decoration: none;
      color: #32355c;
      transition: all 0.6 ease-in-out;
    }

    &:hover {
      background-color: transparent;
      color: #fff;
      cursor: pointer;
      a {
        color: #fff;
      }
    }
  }
}
</style>
