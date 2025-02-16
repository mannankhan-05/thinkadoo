<template>
  <v-container>
    <!-- above navbar -->
    <div class="top-navbar"></div>

    <!-- navbar -->
    <v-app-bar :elevation="0" height="80" class="mt-13">
      <template v-slot:prepend>
        <img
          class="thinkadoo-logo"
          :src="require('../assets/thinkadoo.png')"
          contain
          alt="Logo"
        />
        <h2 class="home">Home</h2>
        <h2 class="about">About</h2>
        <h2 class="category">Category</h2>
      </template>

      <template v-slot:append>
        <div class="navbar-icons">
          <v-icon>mdi-magnify</v-icon>
        </div>

        <div class="navbar-icons">
          <v-icon>mdi-account</v-icon>
        </div>

        <div class="navbar-icons">
          <v-icon>mdi-cart</v-icon>
        </div>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "appNavbar",
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sigmar&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");

.top-navbar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background-color: #283618;
}

.thinkadoo-logo {
  font-size: 80px;
  height: 150px;
  width: 230px;
}

.thinkadoo-heading {
  font-family: "Sigmar", serif;
}

.navbar-icons {
  font-size: 29px;
  margin-right: 28px;
}
.navbar-icons:hover {
  cursor: pointer;
}

.home,
.about,
.category {
  font-family: "Ubuntu", serif;
  font-weight: 300;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 8px;
  font-size: 30px;
  color: black;
}
</style>
