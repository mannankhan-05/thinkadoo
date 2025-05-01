<template>
  <v-container fluid class="container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <!-- Back Button -->
        <v-icon class="back-button" @click="() => this.$router.go(-1)"
          >mdi-keyboard-backspace</v-icon
        >

        <!-- Edit Heading Sheet -->
        <v-sheet class="sheet mb-15" :elevation="1">
          <h1 class="edit-heading">Edit Account</h1>
        </v-sheet>

        <!-- Edit Account Form -->
        <!-- Name -->
        <v-sheet class="pa-5 mb-5" :elevation="1">
          <h1 class="email-label">Name</h1>
          <div class="d-flex justify-center">
            <input class="email-input" type="text" v-model="userName" />
          </div>
        </v-sheet>

        <!-- Email -->
        <v-sheet class="pa-5 mb-5" :elevation="1">
          <h1 class="email-label">Email</h1>
          <div class="d-flex justify-center">
            <input class="email-input" type="email" v-model="userEmail" />
          </div>
        </v-sheet>

        <!-- Password -->
        <v-sheet class="pa-5 mb-5" :elevation="1">
          <h1 class="email-label">New Password</h1>
          <div class="d-flex justify-center">
            <input class="email-input" type="password" />
          </div>

          <h1 class="email-label">Confirm New Password</h1>
          <div class="d-flex justify-center">
            <input class="email-input" type="password" />
          </div>
        </v-sheet>

        <!-- Save Changes Button -->
        <div
          class="button-container d-flex flex-column justify-center align-center"
        >
          <v-btn class="button" @click="saveChanges">
            <span v-if="!saveButtonLoading">Save Changes</span>
            <v-progress-circular
              v-if="saveButtonLoading"
              indeterminate
              :size="40"
            ></v-progress-circular>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      saveButtonLoading: false as boolean,
    };
  },

  computed: {
    userName() {
      return this.$store.state.userName;
    },
    userEmail() {
      return this.$store.state.userEmail;
    },
  },
});
</script>

<style scoped>
.edit-heading {
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

/* .login-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
} */

/* .button {
  margin-top: 50px;
  margin-bottom: 50px; */
/* width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #283618;
  font-size: 25px;
  color: white;
  border-radius: 0px;
  transition: 0.3s ease-in-out; */
/* } */
/* .login-button:hover {
  background-color: #2d3f19;
  color: white;
} */
</style>
