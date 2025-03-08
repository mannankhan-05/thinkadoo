<template>
  <v-container fluid class="signUp-container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <!-- Back Button -->
        <v-icon class="back-button" @click="() => this.$router.go(-1)"
          >mdi-keyboard-backspace</v-icon
        >

        <v-sheet class="signUp-sheet" :elevation="1">
          <h1 class="signUp-heading">Sign Up</h1>

          <h1 class="email-label">Name</h1>
          <div class="d-flex justify-center">
            <input
              class="email-input"
              placeholder="Enter Your Name"
              type="text"
              v-model="name"
            />
          </div>

          <h1 class="email-label">Email</h1>
          <div class="d-flex justify-center">
            <input
              class="email-input"
              placeholder="Enter Your Email"
              type="email"
              v-model="email"
            />
          </div>
          <span class="email-validation-text" v-if="!validEmail"
            >email must contain @ and .com</span
          >

          <h1 class="password-label">Password</h1>
          <div class="d-flex justify-center">
            <input
              class="email-input"
              placeholder="Enter Your Password"
              type="password"
              v-model="password"
            />
          </div>

          <div class="d-flex justify-center">
            <input
              class="confirm-password email-input"
              placeholder="Confirm Password"
              type="password"
              v-model="confirmPassword"
            />
          </div>
          <span class="password-validation-text" v-if="!validPassword"
            >password must be atleast of 8 characters</span
          >

          <div class="love-to-hear-container">
            <v-checkbox
              class="love-to-hear-checkbox mt-10 mb-5"
              @click="promotions = !promotions"
            ></v-checkbox>
            <span class="love-to-hear-text"
              >Yes, I’d love to hear from Thinkadoo!</span
            >
          </div>

          <div
            class="signUp-button-container d-flex flex-column justify-center align-center"
          >
            <v-btn class="signUp-button" @click="RegisterNewUser">
              <span v-if="!signUpButtonLoading">Sign Up</span>
              <v-progress-circular
                v-if="signUpButtonLoading"
                indeterminate
                :size="40"
              ></v-progress-circular>
            </v-btn>
            <div class="have-an-account mt-10">
              Already Have An Account?
              <v-btn variant="text" class="signUpButton" @click="gotoLoginPage">
                Login
              </v-btn>
            </div>
          </div>

          <!-- Snackbar if fields are empty -->
          <v-snackbar v-model="emptyFields" :timeout="2000" rounded="pill">
            <h4 class="empty-field-snackbar d-flex align-center">
              Please fill all the text fields.
            </h4>
          </v-snackbar>
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
      name: "" as string,
      email: "" as string,
      password: "" as string,
      confirmPassword: "" as string,
      passwordDontMatch: false as boolean,
      promotions: false as boolean,
      signUpButtonLoading: false as boolean,
      emptyFields: false as boolean,
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
    gotoLoginPage() {
      this.$router.push({ name: "loginPage" });
    },
    async RegisterNewUser() {
      this.signUpButtonLoading = true;
      const { name, email, password, promotions } = this;

      try {
        if (
          this.name !== "" &&
          this.email !== "" &&
          this.password !== "" &&
          this.confirmPassword !== "" &&
          this.validEmail &&
          this.validPassword
        ) {
          if (this.password !== this.confirmPassword) {
            this.passwordDontMatch = true;
          } else {
            await this.$store.dispatch("registerUser", {
              name,
              email,
              password,
              promotions,
              // router: this.$router,
            });
          }

          this.name = "";
          this.email = "";
          this.password = "";
          this.confirmPassword = "";
          this.signUpButtonLoading = false;
        } else {
          this.signUpButtonLoading = false;
          this.emptyFields = true;
        }
      } catch (err) {
        throw new Error("Error Registering A New User : " + err);
      }
    },
  },
});
</script>

<style scoped>
.signUp-container {
  width: 100%;
  height: 1400px;
  background-color: #fefae0;
}

.signUp-sheet {
  width: 100%;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
}

.signUp-heading {
  font-family: "Bitter", serif;
  display: flex;
  justify-content: center;
  font-size: 55px;
  margin-top: 20px;
  font-weight: normal;
}

.email-label,
.password-label,
.name-label {
  margin-top: 40px;
  margin-left: 40px;
  font-weight: 400;
  font-size: 26px;
}

.password-label {
  margin-top: 50px;
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

.confirm-password {
  margin-top: 30px;
}

.love-to-hear-container {
  display: flex;
  align-items: center;
}

.love-to-hear-checkbox {
  margin-left: 30px;
  font-size: 30px;
  font-weight: bolder;
  color: black;
}

.love-to-hear-text {
  font-size: 23px;
  margin-left: 8px;
}

.signUp-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.signUp-button {
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
.signUp-button:hover {
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

.email-validation-text,
.password-validation-text {
  color: rgb(3, 83, 3);
  font-size: 15px;
  margin-left: 40px;
}

.empty-field-snackbar {
  color: white;
  font-size: 20px;
  font-weight: 100;
}

@media (max-width: 600px) {
  .signUp-heading {
    font-size: 48px;
  }

  .signUp-button {
    font-size: 25px;
    width: 80%;
  }

  .email-input {
    font-size: 23px;
  }
}
</style>
