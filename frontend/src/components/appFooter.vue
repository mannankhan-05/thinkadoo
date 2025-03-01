<template>
  <v-container fluid class="full-footer pa-0 ma-0">
    <v-row no-gutters>
      <v-col cols="12" lg="12" md="12" sm="12" xs="12">
        <img
          class="footer-image"
          :src="require('../assets/footerImage.png')"
          alt=""
        />

        <div class="footer">
          <v-row>
            <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <div class="d-flex flex-column align-center text-center">
                <h1 class="footer-heading">HELP AND INFORMATION</h1>
                <h2 class="footer-subheading">HELP AND FAQS</h2>
                <h2 class="footer-subheading">DELIVERY INFORMATION</h2>
              </div>
              <v-divider
                class="mt-4 mb-4 d-flex d-md-none"
                :thickness="4"
              ></v-divider>
            </v-col>

            <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <div class="d-flex flex-column align-center text-center">
                <h1 class="footer-heading">ABOUT THINKADOO</h1>
                <h2 class="footer-subheading">OUR STORY</h2>
              </div>
              <v-divider
                class="mt-4 mb-4 d-flex d-md-none"
                :thickness="4"
              ></v-divider>
            </v-col>

            <v-col cols="12" lg="4" md="4" sm="12" xs="12">
              <div class="d-flex flex-column align-center text-center">
                <h1 class="footer-heading">CORPORATE INFORMATION</h1>
                <h2 class="footer-subheading">PRIVACY POLICY</h2>
                <h2 class="footer-subheading">RETURN POLICY</h2>
              </div>
            </v-col>
          </v-row>

          <!-- <div class="icons">
            <div class="icon icon1">
              <img :src="require('../assets/facebook.svg')" alt="" />
            </div>

            <div class="icon icon2">
              <img :src="require('../assets/tiktok.svg')" alt="" />
            </div>

            <div class="icon icon3">
              <img :src="require('../assets/twitter.svg')" alt="" />
            </div>

            <div class="icon icon4">
              <img :src="require('../assets/instagram.svg')" alt="" />
            </div>
          </div> -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style>
.full-footer {
  bottom: 0;
  left: 0;
  right: 0;
}

.footer-image {
  width: 100%;
  display: block;
  margin: 0;
  padding: 0;
}

.footer {
  width: 100%;
  height: 100%;
  background-color: #bc6c25;
}

.footer-heading {
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 20px;
}

.footer-subheading {
  font-size: 30px;
  margin-bottom: 5px;
  font-weight: normal;
  transition: 0.3s ease-in-out;
}
.footer-subheading:hover {
  color: #fff;
  cursor: pointer;
}

.icon {
  position: absolute;
  bottom: 40px;
  left: 70px;
  width: 34px;
  height: 34px;
}

.icon2 {
  margin-left: 50px;
}

.icon3 {
  margin-left: 100px;
}

.icon4 {
  margin-left: 150px;
}

@media (max-width: 600px) {
  .footer-heading {
    font-size: 30px;
  }

  .footer-subheading {
    font-size: 25px;
  }
}
</style>
