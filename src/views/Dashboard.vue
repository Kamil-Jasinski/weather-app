<template>
  <div class="login-page">
    <div v-if="isLoggedIn" class="__userName">
      Logged as:
      <span style="color: #eb4d4b; margin-left: 10px;"> {{ userName }}</span>
    </div>
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
    <span class="logged-in-menu" v-if="isLoggedIn">
      <Logout />
      <p style="color: #fff">Or</p>
      <button class="positive">
        <router-link to="/home">Go to App</router-link>
      </button>
    </span>

    <div v-if="showLoginAlert" :class="`log-info ${loginAlertClass}`">
      <p>{{ loginAlertContent }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Login from "@/components/dashboard/Login.vue";
import Logout from "@/components/dashboard/Logout.vue";
import Register from "@/components/dashboard/Register.vue";

@Component({
  components: {
    Login,
    Register,
    Logout,
  },
})
export default class Dashboard extends Vue {
  selectedForm = "login";

  loginForm(form: string): void {
    this.selectedForm = form;
  }

  get isLoggedIn(): boolean {
    return this.$store.getters.isLoggedIn;
  }

  get loginAlertContent(): string {
    return this.$store.getters.loginAlertContent;
  }

  get showLoginAlert(): boolean {
    return this.$store.getters.showLoginAlert;
  }

  get loginAlertClass(): string {
    return this.$store.getters.loginAlertClass;
  }

  get userName() {
    return this.$store.getters.userName;
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
  position: relative;

  background-color: #32355c;
  border-radius: 25px;
  min-width: 810px;
  height: auto;
  min-height: 500px;

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

  .logged-in-menu {
    display: flex;
    width: max-content;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .log-info {
    border: 1px solid transparent;
    margin-bottom: 10px;
    border-radius: 0.25rem;
    position: absolute;
    bottom: 0;
    p {
      padding: 15px;
    }
  }
  .error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  .success {
    background-color: #d4edda;
    color: #155724;
    border-color: #c3e6cb;
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
    margin: 10px 15px;
    background-color: transparent;
    font-weight: bold;
    font-size: 1rem;
    outline: none;
    background-color: #fff;
    color: #32355c;
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

  .positive {
    background-color: #eb4d4b;
    border-color: #fff;
    a {
      color: #fff;
    }
  }
}
</style>
