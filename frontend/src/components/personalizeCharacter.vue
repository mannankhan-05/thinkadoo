<template>
  <v-container fluid class="container">
    <v-row>
      <v-col>
        <!-- back button -->
        <div class="back-button" @click="if (step > 1) step--;">
          <v-icon>mdi-chevron-left</v-icon>
          Back
        </div>

        <!-- <v-progress-linear
          color="progress-bar blue-darken-3"
          :model-value="progress"
        ></v-progress-linear> -->
        <!-- </v-col>
    </v-row> -->

        <v-row justify="center">
          <v-col cols="12" lg="6" md="6" sm="10" xs="12">
            <!-- step 1 -->
            <v-sheet class="sheet" v-if="step === 1">
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
                  <v-col cols="12" lg="6" md="6" sm="6" xs="6">
                    <div class="avatar-image">laksjdfl</div>
                  </v-col>

                  <v-col cols="12" lg="6" md="6" sm="6" xs="6">
                    <div class="avatar-image">laksjdfl</div>
                  </v-col>
                </v-row>

                <h1 class="choose-one">Choose One</h1>

                <div class="d-flex justify-center">
                  <v-btn class="continue-button" @click="step++"
                    >Continue</v-btn
                  >
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>

        <!-- step 2 -->
        <v-row justify="center">
          <v-col cols="12" lg="12" md="12" sm="12" xs="12">
            <v-sheet class="sheet" v-if="step === 2">
              <div>
                <h1 class="sheet-heading step2-heading">
                  Every shade of skin tells a beautiful story, and none of us
                  should feel guilty for sharing ours.
                </h1>

                <!-- selected skin tone -->
                <div class="d-flex justify-center">
                  <div class="selected-skin-tone">selected skin tone</div>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
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
      step: 2,
    };
  },
});
</script>

<style scoped>
.back-button {
  position: absolute;
  top: 130px;
  left: 0;
  width: 100%;
  background-color: #283618;
  color: white;
  font-size: 25px;
}

.back-button:hover {
  cursor: pointer;
}

.container {
  width: 100%;
  height: 1600px;
  background-color: #fefae0;
}

/* STEP 2 */

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

/* STEP 2 */

.step2-heading {
  font-size: 35px;
}

.selected-skin-tone {
  width: 40%;
  height: 500px;
  margin-top: 70px;
  border: 1px solid grey;
  border-radius: 0px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 100;
  color: grey;
  margin-bottom: 50px;
}
</style>
