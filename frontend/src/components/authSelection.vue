<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="8" xs="12">
        <img
          class="user-auth-image"
          :src="require('../assets/userAuthImage.png')"
          alt=""
        />
      </v-col>

      <v-col cols="12" lg="6" md="6" sm="4" xs="12"> mannan khan </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "authSelection",
});
</script>

<style scoped>
.user-auth-image {
  width: 1300px;
  height: 1800px;
}
</style>
