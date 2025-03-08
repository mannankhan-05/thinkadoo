<template>
  <v-container fluid class="container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <v-progress-linear
          color="progress-bar blue-darken-3"
          :model-value="progress"
        ></v-progress-linear>
        <!-- </v-col>
    </v-row> -->

        <!-- <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12"> -->
        <v-sheet class="sheet">
          <div>
            <h1 class="sheet-heading">Who is this book intended for?</h1>

            <label class="name-label">Name</label>
            <div class="d-flex justify-center">
              <input
                class="email-input"
                placeholder="Enter Your Name"
                type="text"
                v-model="name"
              />
            </div>

            <label class="name-label">Gender</label>
            <v-row justify="center">
              <v-col cols="12" lg="6" md="6" sm="10" xs="12">
                <v-btn class="gender-button boy">Boy</v-btn>
              </v-col>

              <v-col cols="12" lg="6" md="6" sm="10" xs="12">
                <v-btn class="gender-button girl">Girl</v-btn>
              </v-col>
            </v-row>

            <!-- images -->
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="10" xs="12">
                <div class="avatar-image">laksjdfl</div>
              </v-col>

              <v-col cols="12" lg="6" md="6" sm="10" xs="12">
                <div class="avatar-image">laksjdfl</div>
              </v-col>
            </v-row>

            <h1 class="choose-one">Choose One</h1>

            <div class="d-flex justify-center">
              <v-btn class="continue-button">Continue</v-btn>
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
  name: "personalizeCharacter",

  data() {
    return {
      progress: 0,
    };
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 1600px;
  background-color: #fefae0;
}

.sheet {
  /* background-color: #fefae0; */
  width: 100%;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
}

.sheet-heading {
  font-family: "Bitter", serif;
  display: flex;
  justify-content: center;
  font-size: 50px;
  margin-top: 20px;
  margin-bottom: 50px;
  font-weight: normal;
}

.name-label {
  margin-left: 90px;
  font-weight: 400;
  font-size: 26px;
  font-weight: bold;
}

.email-input {
  height: 100px;
}

.email-input {
  margin-top: 10px;
  border: 1px solid grey;
  border-radius: 0px;
  width: 80%;
  height: 70px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 100;
  color: grey;
  margin-bottom: 80px;
}

.gender-button {
  margin-top: 10px;
  border: 1px solid grey;
  border-radius: 0px;
  width: 80%;
  height: 70px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 100;
  color: grey;
  margin-bottom: 50px;
}

.boy {
  margin-left: 90px;
}

.avatar-image {
  width: 100%;
  height: 500px;
  margin-top: 100px;
  border: 1px solid grey;
  border-radius: 0px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 100;
  color: grey;
  margin-bottom: 50;
}
.progress-bar {
  position: fixed;
}

.choose-one {
  font-family: "Bitter", serif;
  display: flex;
  justify-content: center;
  font-size: 50px;
  margin-top: 20px;
  margin-bottom: 50px;
  font-weight: normal;
}

.continue-button {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  border: 1px solid grey;
  background-color: #283618;
  border-radius: 0px;
  width: 60%;
  height: 70px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 100;
  color: white;
  margin-bottom: 50px;
}
</style>
