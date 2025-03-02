<template>
  <v-container fluid class="resetPassword-container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <v-sheet class="resetPassword-sheet" :elevation="1">
          <h1 class="resetPassword-heading">Enter Your Email</h1>

          <div class="d-flex justify-center">
            <input
              class="email-input mt-10"
              placeholder="Change Your Password"
              type="password"
              v-model="password1"
            />
          </div>

          <div class="d-flex justify-center">
            <input
              class="email-input mt-10"
              placeholder="Confirm Password"
              type="password"
              v-model="password2"
            />
          </div>

          <div
            class="reset-password-button-container d-flex flex-column justify-center align-center"
          >
            <v-btn
              class="reset-password-button"
              :disabled="!validPassword"
              @click="sendCode"
            >
              <span v-if="!loading" @click="changePassword"
                >Change Password</span
              >
              <v-progress-circular
                v-if="loading"
                indeterminate
                :size="40"
              ></v-progress-circular>
            </v-btn>
          </div>

          <!-- Password Dont Match -->
          <div v-if="passwordNotMatch" class="password-not-match-container">
            Passwords Does Not Match. Please Try Again.
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      password1: "" as string,
      password2: "" as string,
      loading: false as boolean,
      passwordNotMatch: false as boolean,
    };
  },

  methods: {
    async changePassword() {
      this.loading = true;
      if (this.password1 !== this.password2) {
        this.password1 = "";
        this.password2 = "";
        this.passwordNotMatch = true;
      } else {
        await axios.put(
          `http://localhost:5000/resetPassword/${this.$route.params.email}`,
          {
            password: this.password1,
          }
        );

        this.password1 = "";
        this.password2 = "";
        this.$router.push({ name: "loginPage" });
      }
      this.loading = false;
    },
  },

  computed: {
    validPassword() {
      return this.password1.length >= 8 && this.password2.length >= 8;
    },
  },
});
</script>

<style scoped>
.resetPassword-container {
  width: 100%;
  height: 850px;
  background-color: #fefae0;
}

.resetPassword-sheet {
  width: 100%;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}

.resetPassword-heading {
  font-family: "Bitter", serif;
  display: flex;
  justify-content: center;
  font-size: 48px;
  margin-top: 20px;
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

.reset-password-button {
  margin-top: 70px;
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #283618;
  font-size: 25px;
  color: white;
  border-radius: 150px;
  transition: 0.3s ease-in-out;
}
.reset-password-button:hover {
  background-color: #fefae0;
  color: #405f1c;
}

@media (max-width: 600px) {
  .resetPassword-heading {
    font-size: 40px;
  }

  .email-input {
    font-size: 23px;
  }

  .reset-password-button {
    font-size: 20px;
  }
}

.password-not-match-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #fefae0;
  color: rgb(196, 9, 9);
  font-size: 25px;
  margin-top: 40px;
}
</style>
