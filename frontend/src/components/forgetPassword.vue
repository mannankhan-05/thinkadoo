<template>
  <v-container fluid class="forgetPassword-container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <!-- Back Button -->
        <v-icon class="back-button" @click="() => this.$router.go(-1)"
          >mdi-keyboard-backspace</v-icon
        >

        <v-sheet class="forgetPassword-sheet" :elevation="1">
          <h1 class="forgetPassword-heading">Enter Your Email</h1>

          <div class="d-flex justify-center">
            <input
              class="email-input mt-10"
              placeholder="Enter Your Email"
              type="email"
              v-model="email"
            />
          </div>

          <div
            class="send-code-button-container d-flex flex-column justify-center align-center"
          >
            <v-btn
              class="send-code-button"
              :disabled="!email || !validEmail"
              @click="sendCode"
            >
              <span v-if="!loading">Send Code</span>
              <v-progress-circular
                v-if="loading"
                indeterminate
                :size="40"
              ></v-progress-circular>
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- OTP overlay-->
    <v-overlay
      class="d-flex align-center justify-center"
      v-model="OTPcode"
      absolute
      :value="true"
      persistent
      style="z-index: 9999; background-color: rgba(0, 0, 0, 0.6)"
    >
      <v-container class="d-flex align-center justify-center" fill-height>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card class="otp-card pa-4 text-center" outlined>
            <h2 class="text-center">Enter OTP</h2>
            <v-otp-input
              v-model="OTP"
              length="6"
              class="my-4"
              input-class="otp-input"
            ></v-otp-input>
            <v-btn block class="submitCodeButton mt-4" @click="submitOTP" large>
              Submit
            </v-btn>
          </v-card>
        </v-col>
      </v-container>
    </v-overlay>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  data() {
    return {
      email: "" as string,
      loading: false as boolean,
      OTPcode: false as boolean,
      OTP: "" as string,
      OneTimePassword: "" as string,
    };
  },

  methods: {
    async sendCode() {
      this.loading = true;

      let response = await axiosInstance.post("/sendCodeToEmail", {
        email: this.email,
      });

      this.OneTimePassword = response.data;

      this.loading = false;

      this.OTPcode = true;
    },

    async submitOTP() {
      if (parseInt(this.OTP) === parseInt(this.OneTimePassword)) {
        this.$router.push({
          name: "resetPasswordPage",
          params: { email: this.email },
        });
      } else {
        this.OTPcode = false;
        alert("Invalid OTP. Try Again.");
        this.OTP = "";
      }
    },
  },

  computed: {
    validEmail() {
      return this.email.includes("@") && this.email.includes(".com");
    },
  },
});
</script>

<style scoped>
.forgetPassword-container {
  width: 100%;
  height: 850px;
  background-color: #fefae0;
}

.forgetPassword-sheet {
  width: 100%;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}

.forgetPassword-heading {
  font-family: "Bitter", serif;
  display: flex;
  justify-content: center;
  font-size: 48px;
  margin-top: 20px;
  font-weight: normal;
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

.send-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.send-code-button {
  margin-top: 70px;
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #283618;
  font-size: 25px;
  color: white;
  border-radius: 150px;
  transition: 0.3s ease-in-out;
}
.send-code-button:hover {
  background-color: #2d3f19;
  color: white;
}

.otp-card {
  max-width: 500px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.otp-input {
  font-size: 24px;
  font-weight: bold;
  color: black;
  text-align: center;
}

.submitCodeButton {
  border-radius: 30px;
  background-color: #283618;
  color: #fefae0;
  transition: 0.3s ease-in-out;
  font-size: 20px;
}

.submitCodeButton:hover {
  color: #283618;
  background-color: #fefae0;
}

@media (max-width: 600px) {
  .forgetPassword-heading {
    font-size: 40px;
  }

  .email-input {
    font-size: 23px;
  }
}
</style>
