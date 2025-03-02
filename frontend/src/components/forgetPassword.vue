<template>
  <v-container fluid class="forgetPassword-container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
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
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      email: "" as string,
      loading: false as boolean,
    };
  },

  methods: {
    async sendCode() {
      this.loading = true;

      await axios.post("http://localhost:5000/sendCodeToEmail", {
        email: this.email,
      });

      this.email = "";
      this.loading = false;
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
  height: 800px;
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
  background-color: #fefae0;
  color: #405f1c;
}
</style>
