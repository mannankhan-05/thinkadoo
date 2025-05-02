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
          <h1 class="heading">Edit Account</h1>
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

        <v-sheet class="pa-5 mb-5" :elevation="1">
          <!-- Checkbox -->
          <div class="love-to-hear-container">
            <v-checkbox
              class="love-to-hear-checkbox mt-10"
              @click="checkbox = !checkbox"
              v-model="promotions"
            ></v-checkbox>
            <span class="love-to-hear-text">Promotions</span>
          </div>
        </v-sheet>

        <!-- Password -->
        <!-- <v-sheet class="pa-5 mb-5" :elevation="1">
          <h1 class="email-label">New Password</h1>
          <div class="d-flex justify-center">
            <input class="email-input" type="password" />
          </div>

          <h1 class="email-label">Confirm New Password</h1>
          <div class="d-flex justify-center">
            <input class="email-input" type="password" />
          </div>
        </v-sheet> -->

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
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  data() {
    return {
      userName: "" as string,
      userEmail: "" as string,
      promotions: false as boolean,
      checkbox: false as boolean,
      saveButtonLoading: false as boolean,
    };
  },

  async mounted() {
    let response = await axiosInstance.get(`/user/${this.$store.state.userId}`);
    this.userName = response.data.name;
    this.userEmail = response.data.email;
    this.promotions = response.data.promotions;
  },

  methods: {
    async saveChanges() {
      this.saveButtonLoading = true;
      const { userName, userEmail, promotions } = this;

      await this.$store.dispatch("editUser", {
        userName,
        userEmail,
        promotions,
      });

      this.saveButtonLoading = false;
    },
  },
});
</script>

<style scoped></style>
