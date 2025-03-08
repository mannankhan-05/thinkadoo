<template>
  <v-container fluid class="login-container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <!-- Back Button -->
        <v-icon class="back-button" @click="() => this.$router.go(-1)"
          >mdi-keyboard-backspace</v-icon
        >

        <v-sheet class="login-sheet" :elevation="1">
          <h1 class="login-heading">Login</h1>

          <h1 class="email-label">Email</h1>
          <div class="d-flex justify-center">
            <input
              class="email-input"
              placeholder="Enter Your Email"
              type="email"
              v-model="email"
            />
          </div>

          <h1 class="password-label">Password</h1>
          <div class="d-flex justify-center">
            <input
              class="email-input"
              placeholder="Enter Your Password"
              type="password"
              v-model="password"
            />
          </div>

          <h1 class="forget-password-label" @click="gotoForgetPasswordPage">
            Forget Password?
          </h1>

          <div class="remember-me-container">
            <v-checkbox
              class="remember-me-checkbox"
              @click="rememberMe = !rememberMe"
            ></v-checkbox>
            <span class="remember-me-text">Remember me</span>
          </div>

          <div
            class="login-button-container d-flex flex-column justify-center align-center"
          >
            <v-btn
              class="login-button"
              :disabled="!email || !password || !validEmail || !validPassword"
              @click="loginExistingUser"
            >
              <span v-if="!loginButtonLoading">Login</span>
              <v-progress-circular
                v-if="loginButtonLoading"
                indeterminate
                :size="40"
              ></v-progress-circular>
            </v-btn>
            <div class="have-an-account mt-10">
              Don't Have An Account?
              <v-btn variant="text" class="signUpButton" @click="gotoSignUpPage"
                >Create account</v-btn
              >
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "loginPage",
  data() {
    return {
      email: "" as string,
      password: "" as string,
      rememberMe: false as boolean,
      loginButtonLoading: false as boolean,
    };
  },

  computed: {
    validEmail() {
      return this.email.includes("@") && this.email.includes(".com");
    },
    validPassword() {
      return this.password.length >= 8;
    },
  },

  methods: {
    gotoSignUpPage() {
      this.$router.push({ name: "signUpPage" });
    },
    gotoForgetPasswordPage() {
      this.$router.push({ name: "forgetPasswordPage" });
    },
    async loginExistingUser() {
      this.loginButtonLoading = true;
      const { email, password, rememberMe } = this;

      await this.$store.dispatch("loginUser", {
        email,
        password,
        rememberMe,
      });

      this.email = "";
      this.password = "";
      this.loginButtonLoading = false;
    },
  },
});
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 1100px;
  background-color: #fefae0;
}

.login-sheet {
  width: 100%;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
}

.login-heading {
  font-family: "Bitter", serif;
  display: flex;
  justify-content: center;
  font-size: 55px;
  margin-top: 20px;
  font-weight: normal;
}

.email-label,
.password-label {
  margin-top: 40px;
  margin-left: 40px;
  font-weight: 400;
  font-size: 26px;
}

.password-label {
  margin-top: 50px;
}

.forget-password-label {
  margin-top: 20px;
  margin-left: 40px;
  font-weight: 400;
  font-size: 26px;
  color: #3e5e1a;
}
.forget-password-label:hover {
  cursor: pointer;
}

.email-input {
  height: 100px;
}

.email-input {
  border: 3px solid grey;
  border-radius: 10px;
  width: 92%;
  height: 70px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 100;
  color: grey;
}

.remember-me-container {
  display: flex;
  align-items: center;
}

.remember-me-checkbox {
  margin-left: 30px;
  margin-top: 50px;
  font-size: 30px;
  font-weight: 100;
  color: black;
}

.remember-me-text {
  font-size: 23px;
  margin-left: 8px;
  margin-top: 30px;
}

.login-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 92%;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #283618;
  font-size: 25px;
  color: white;
  border-radius: 0px;
  transition: 0.3s ease-in-out;
}
.login-button:hover {
  background-color: #2d3f19;
  color: white;
}

.have-an-account {
  font-size: 20px;
}

.signUpButton {
  font-size: 20px;
  color: #405f1c;
  font-weight: bold;
  transition: 0.3s ease-in-out;
}

.signUpButton:hover {
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .login-heading {
    font-size: 48px;
  }

  .login-button {
    font-size: 25px;
    width: 80%;
  }

  .email-input {
    font-size: 23px;
  }
}
</style>
