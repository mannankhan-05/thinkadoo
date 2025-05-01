<template>
  <v-container fluid class="edit-container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <!-- Back Button -->
        <v-icon class="back-button" @click="() => this.$router.go(-1)"
          >mdi-keyboard-backspace</v-icon
        >

        <!-- Edit Heading Sheet -->
        <v-sheet class="edit-sheet mb-15" :elevation="1">
          <h1 class="edit-heading">Edit Account</h1>
        </v-sheet>

        <!-- Edit Account Form -->
        <v-sheet> edit sheet </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.edit-container {
  width: 100%;
  height: 1100px;
  background-color: #fefae0;
}

.edit-sheet {
  width: 100%;
  margin-top: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-heading {
  font-family: "Bitter", serif;
  display: flex;
  justify-content: center;
  font-size: 55px;
  margin-top: 20px;
  font-weight: normal;
}
</style>
