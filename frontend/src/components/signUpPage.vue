<template>
  <v-container fluid class="container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <!-- Back Button -->
        <v-icon class="back-button" @click="() => this.$router.go(-1)"
          >mdi-keyboard-backspace</v-icon
        >

        <v-sheet class="sheet" :elevation="1">
          <h1 class="heading">Sign Up</h1>

          <!-- Name -->
          <h1 class="email-label">Name</h1>
          <div class="d-flex justify-center">
            <input class="email-input" type="text" v-model="name" />
          </div>

          <!-- Email -->
          <h1 class="email-label">Email</h1>
          <div class="d-flex justify-center">
            <input class="email-input" type="email" v-model="email" />
          </div>
          <span class="email-validation-text" v-if="!validEmail"
            >email must contain @</span
          >

          <!-- Password -->
          <h1 class="password-label">Password</h1>
          <div class="d-flex justify-center">
            <input
              class="email-input"
              :type="passwordVisibility ? 'text' : 'password'"
              v-model="password"
            />
          </div>
          <span class="password-validation-text" v-if="!validPassword"
            >password must be atleast of 8 characters</span
          >

          <!-- Confirm Password -->
          <div class="d-flex justify-center">
            <input
              class="confirm-password email-input"
              placeholder="Confirm Password"
              :type="passwordVisibility ? 'text' : 'password'"
              v-model="confirmPassword"
            />
          </div>
          <span class="password-dont-match-text" v-if="passwordDontMatch"
            >Passwords Don't Match. Try Again!</span
          >

          <!-- Checkbox -->
          <div class="love-to-hear-container">
            <v-checkbox
              class="love-to-hear-checkbox mt-10"
              @click="promotions = !promotions"
            ></v-checkbox>
            <span class="love-to-hear-text"
              >Yes, I’d love to hear from Thinkadoo!</span
            >
          </div>

          <!-- Toggle Password Visibility -->
          <div class="love-to-hear-container">
            <v-checkbox
              class="love-to-hear-checkbox mb-5"
              @click="passwordVisibility = !passwordVisibility"
            ></v-checkbox>
            <span class="show-password-text">Show Password</span>
          </div>

          <!-- SignUp Button -->
          <div
            class="button-container d-flex flex-column justify-center align-center"
          >
            <v-btn class="button" @click="RegisterNewUser">
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
      passwordVisibility: false as boolean,
    };
  },

  computed: {
    validEmail() {
      return this.email.includes("@");
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
            setTimeout(() => {
              this.passwordDontMatch = false;
            }, 3000);
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
  margin-top: 20px;
}

.show-password-text {
  font-size: 23px;
  margin-left: 8px;
  margin-bottom: 40px;
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

.password-dont-match-text {
  color: red;
  font-size: 15px;
  margin-left: 40px;
}

.empty-field-snackbar {
  color: white;
  font-size: 20px;
  font-weight: 100;
}
</style>
