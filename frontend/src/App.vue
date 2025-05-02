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

.container {
  width: 100%;
  height: auto;
  background-color: #fefae0;
}

.sheet {
  width: 100%;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
}

.heading {
  font-family: "Bitter", serif;
  display: flex;
  justify-content: center;
  font-size: 55px;
  margin-top: 20px;
  font-weight: normal;
}

.email-label,
.password-label,
.name-label {
  margin-top: 40px;
  margin-left: 40px;
  font-weight: 400;
  font-size: 26px;
}

.password-label {
  margin-top: 50px;
}

.email-input {
  height: 100px;
}

.email-input {
  border: 3px solid grey;
  border-radius: 0px;
  width: 92%;
  height: 70px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 100;
  color: grey;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  width: 92%;
  height: 50px !important;
  display: flex;
  justify-content: center;
  background-color: #283618;
  font-size: 25px;
  color: white !important;
  border-radius: 0px;
  transition: 0.3s ease-in-out;
}
.button:hover {
  background-color: #2d3f19;
  color: white;
}

.love-to-hear-container {
  display: flex;
  align-items: center;
}

.love-to-hear-checkbox {
  margin-left: 30px;
  font-size: 30px;
  font-weight: bolder;
  color: black;
}

.love-to-hear-text {
  font-size: 23px;
  margin-left: 8px;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .heading {
    font-size: 48px;
  }

  .button {
    font-size: 25px;
    width: 80%;
  }

  .email-input {
    font-size: 23px;
  }
}
</style>
