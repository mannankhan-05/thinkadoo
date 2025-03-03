<template>
  <v-app>
    <appNavbar />
    <v-main class="main-content">
      <router-view />
    </v-main>
    <appFooter />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import appNavbar from "./components/appNavbar.vue";
import appFooter from "./components/appFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    appNavbar,
    appFooter,
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

.back-button {
  position: absolute;
  top: 160px;
  left: 30px;
  font-size: 35px;
}

/* Ensure the app takes full viewport height */
html,
body,
#app,
.v-application {
  height: 100%;
  display: flex;
  flex-direction: column;
}

body {
  font-family: "Varela Round", sans-serif;
}

/* Make content area take full height and push footer down */
.main-content {
  flex-grow: 1; /* Pushes footer to bottom */
}

/* Ensure the footer is at the bottom */
.appFooter {
  width: 100%;
  background-color: #bc6c25;
}
</style>
