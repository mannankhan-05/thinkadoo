<template>
  <v-container fluid class="pa-0">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="12" xs="12" class="m-0 p-0">
        <div class="user-auth-image-container">
          <div class="overlay"></div>
          <h1 class="welcome-text">Welcome To Thinkadoo</h1>
          <p class="tagline">Big Dreams Start Small – Let's Build Together!</p>
        </div>
      </v-col>

      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
        <div
          class="login-container mt-md-10 d-flex flex-column justify-center align-center"
        >
          <h1 class="login-heading">Let's Log You In</h1>

          <v-btn class="login-email-btn mt-12" @click="gotoLoginPage">
            <v-icon class="mr-5">mdi-email</v-icon>
            <span>Login with email</span>
          </v-btn>

          <!-- <v-btn class="login-email-btn mt-4">
            <v-icon class="mr-5">mdi-google</v-icon>
            <span>Continue with Google</span>
          </v-btn> -->

          <v-btn
            class="login-google-btn mt-6"
            @click="handleGoogleSignIn"
            elevation="1"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              class="google-logo"
            />
            <span class="google-btn-text">Sign in with Google</span>
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
@import url("https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

.user-auth-image-container {
  width: 100%;
  height: 87vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #fefae0, #283618);
  animation: animatedBackground 10s ease infinite alternate;
}

/* Subtle animated background gradient */
@keyframes animatedBackground {
  0% {
    background: linear-gradient(135deg, #fefae0, #606c38);
  }
  100% {
    background: linear-gradient(135deg, #283618, #fefae0);
  }
}

/* Overlay for better contrast */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
}

/* Welcome text styling */
.welcome-text {
  font-family: "Bitter", serif;
  font-size: 50px;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

/* Tagline styling */
.tagline {
  font-size: 20px;
  color: white;
  font-weight: 500;
  margin-top: 10px;
  z-index: 2;
  opacity: 0.8;
}

/* Floating animated shapes */
.user-auth-image-container::before,
.user-auth-image-container::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  opacity: 0.7;
  animation: floatingShapes 6s infinite alternate ease-in-out;
}

.user-auth-image-container::before {
  top: 10%;
  left: 10%;
}

.user-auth-image-container::after {
  bottom: 15%;
  right: 15%;
}

/* Floating animation for shapes */
@keyframes floatingShapes {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

.login-heading {
  font-size: 60px;
  font-weight: bold;
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

.login-google-btn {
  width: 620px;
  height: 80px;
  background-color: #fff;
  color: #3c4043;
  font-size: 16px;
  font-weight: 370;
  font-family: "Roboto", sans-serif;
  border: 1px solid #dadce0;
  border: 3px solid #000;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: none;
  transition: box-shadow 0.2s ease-in-out;
}

.login-google-btn:hover {
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 2px 6px rgba(60, 64, 67, 0.15);
}

.google-logo {
  width: 60px;
  height: 60px;
  margin-right: 12px;
}

.google-btn-text {
  font-size: 40px;
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

@media (max-width: 600px) {
  .login-heading {
    margin-top: 50px;
    font-size: 50px;
  }

  .login-email-btn {
    width: 620px;
    font-size: 28px;
  }

  .google-logo {
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }

  .google-btn-text {
    font-size: 28px;
  }

  .user-auth-image-container {
    width: 100% !important;
    height: 60vh !important;
  }

  .user-auth-image {
    width: 100% !important;
    height: auto !important;
  }

  .welcome-text {
    font-size: 38px;
  }

  .tagline {
    font-size: 15px;
  }
}
</style>
