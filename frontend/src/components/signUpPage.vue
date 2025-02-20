<template>
  <v-container
    fluid
    class="signUp-container d-flex flex-column justify-center align-center"
  >
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="8" xs="12">
        <v-sheet
          class="signUp-sheet"
          :elevation="1"
          :height="1000"
          :width="800"
        >
          <h1 class="signUp-heading">Sign Up</h1>

          <h1 class="email-label">Name</h1>
          <input
            class="email-input"
            placeholder="Enter Your Name"
            type="text"
          />

          <h1 class="email-label">Email</h1>
          <input
            class="email-input"
            placeholder="Enter Your Email"
            type="email"
          />

          <h1 class="password-label">Password</h1>
          <input
            class="email-input"
            placeholder="Enter Your Password"
            type="password"
          />

          <v-checkbox
            label="Remember me"
            class="remember-me-checkbox"
          ></v-checkbox>

          <v-checkbox
            label="Yes, I’d love to hear
from Thinkadoo!"
            class="hear-from-thinkadoo-checkbox"
          ></v-checkbox>

          <div
            class="signUp-button-container d-flex flex-column justify-center align-center"
          >
            <v-btn class="signUp-button"> Sign Up </v-btn>
            <div class="have-an-account mt-10">
              Already Have An Account?
              <v-btn variant="text" class="signUpButton" @click="gotoLoginPage"
                >Login</v-btn
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

  methods: {
    gotoLoginPage() {
      this.$router.push({ name: "loginPage" });
    },
  },
});
</script>

<style scoped>
.signUp-container {
  width: 100%;
  height: 100%;
  background-color: #fefae0;
}

.signUp-sheet {
  margin-top: 130px;
  display: flex;
  flex-direction: column;
}

.signUp-heading {
  display: flex;
  justify-content: center;
  font-size: 55px;
  margin-top: 20px;
}

.email-label,
.password-label,
.name-label {
  margin-top: 40px;
  margin-left: 30px;
  font-weight: 400;
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
  margin-left: 30px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 100;
  color: grey;
}

.remember-me-checkbox {
  margin-left: 30px;
  margin-top: 50px;
  font-size: 30px;
  font-weight: 100;
  color: black;
}

.hear-from-thinkadoo-checkbox {
  margin-left: 30px;
  font-size: 30px;
  font-weight: bolder;
  color: black;
}

.signUp-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.signUp-button {
  width: 92%;
  height: 70px;
  display: flex;
  justify-content: center;
  background-color: #283618;
  font-size: 35px;
  color: white;
  border-radius: 150px;
  transition: 0.3s ease-in-out;
}
.signUp-button:hover {
  background-color: #fefae0;
  color: #405f1c;
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
</style>
