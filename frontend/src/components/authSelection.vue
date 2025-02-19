<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="6" xs="12">
        <img
          class="user-auth-image"
          :src="require('../assets/userAuthImage.png')"
          alt=""
        />
      </v-col>

      <v-col cols="12" lg="6" md="6" sm="6" xs="12">
        <div
          class="login-container d-flex flex-column justify-center align-center"
        >
          <h1 class="login-heading">Let's Log You In</h1>

          <v-btn class="login-email-btn mt-12" @click="gotoLoginPage">
            <v-icon class="mr-5">mdi-email</v-icon>
            <span>Login with email</span>
          </v-btn>

          <h1 class="not-a-member">Not a member ?</h1>
          <h1 class="sign-up-text">
            Go to sign up
            <v-icon class="arrow-icon" @click="gotoSignUpPage"
              >mdi-arrow-top-right-thick</v-icon
            >
          </h1>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "authSelection",

  methods: {
    gotoLoginPage() {
      this.$router.push({ name: "loginPage" });
    },
    gotoSignUpPage() {
      this.$router.push({ name: "signUpPage" });
    },
  },
});
</script>

<style scoped>
.user-auth-image {
  width: 1500px;
  height: 1600px;
}

.login-heading {
  font-size: 60px;
  font-weight: bold;
}

.login-container {
  margin-top: 120px;
}

.login-email-btn {
  width: 620px;
  height: 80px;
  border: 3px solid #000;
  border-radius: 0;
  color: black;
  background-color: white;
  font-size: 40px;
  text-transform: lowercase;
  transition: 0.3s ease-in-out;
}
.login-email-btn:hover {
  background-color: #000;
  color: white;
}

.not-a-member {
  font-size: 50px;
  font-weight: bold;
  margin-top: 100px;
}

.sign-up-text {
  font-size: 40px;
  font-weight: normal;
}

.arrow-icon {
  font-size: 30px;
  transition: 0.3s ease-in-out;
}
.arrow-icon:hover {
  font-size: 35px;
  color: grey;
  cursor: pointer;
}
</style>
