<template>
  <v-container fluid justify="center" class="pa-0 ma-0">
    <!-- Hero Section (sm, md and lg screens) -->
    <v-row no-gutters class="d-none d-sm-flex">
      <v-col
        cols="12"
        lg="4"
        md="6"
        sm="12"
        xs="12"
        class="order-sm-2 order-xs-2 order-md-1 order-lg-1"
      >
        <div class="hero-section-text flex-column">
          <h1 class="hero-section-heading">TURN PAGES, BUILD BONDS.</h1>
          <h2 class="hero-section-description">
            Stories that celebrate love, family and everyday heroes.
          </h2>
          <v-btn class="CTA-button" @click="gotoBooks">Explore Stories</v-btn>
        </div>
      </v-col>

      <v-col
        cols="12"
        lg="8"
        md="6"
        sm="12"
        xs="12"
        class="order-sm-1 order-xs-1 order-md-2 order-lg-2"
      >
        <img
          class="hero-section-image"
          :src="require('../assets/hero-section-image.jpg')"
          alt=""
        />
      </v-col>
    </v-row>

    <!-- Hero Section (xs screen) -->
    <v-row no-gutters class="d-flex d-sm-none">
      <v-col cols="12" lg="8" md="6" sm="12" xs="12" class="pa-0 ma-0">
        <img
          class="hero-section-xs-image"
          :src="require('../assets/hero-section-image.jpg')"
          alt=""
        />
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12" xs="12" class="pa-0 ma-0">
        <div class="hero-section-xs-text flex-column">
          <h1 class="hero-section-xs-heading">TURN PAGES, BUILD BONDS.</h1>
          <h2 class="hero-section-xs-description">
            Stories that celebrate love, family and everyday heroes.
          </h2>
          <v-btn class="CTA-xs-button" @click="gotoBooks"
            >Explore Stories</v-btn
          >
        </div>
      </v-col>
    </v-row>

    <!-- Best Selling Books -->
    <bestSellingBooks />

    <!-- Why Choose Printed Books Section -->
    <v-container fluid class="whychoose-section">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8" class="text-center">
          <h2 class="whychoose-heading">WHY CHOOSE PRINTED BOOKS</h2>
          <div class="whychoose-points-container">
            <div class="whychoose-point">
              <h3 class="point-number">01</h3>
              <div class="point-content">
                <h4 class="point-title">Tactile Experience</h4>
                <p class="point-description">
                  Feel the texture of pages and enjoy a screen-free reading
                  experience.
                </p>
              </div>
            </div>
            <div class="whychoose-point">
              <h3 class="point-number">02</h3>
              <div class="point-content">
                <h4 class="point-title">Better Retention</h4>
                <p class="point-description">
                  Studies show printed books improve memory and comprehension.
                </p>
              </div>
            </div>
            <div class="whychoose-point">
              <h3 class="point-number">03</h3>
              <div class="point-content">
                <h4 class="point-title">Family Bonding</h4>
                <p class="point-description">
                  Create lasting memories through shared reading experiences.
                </p>
              </div>
            </div>
            <div class="whychoose-point">
              <h3 class="point-number">04</h3>
              <div class="point-content">
                <h4 class="point-title">No Battery Required</h4>
                <p class="point-description">
                  Enjoy your books anytime, anywhere without charging.
                </p>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Books Loved By You -->
    <lovedByYouBooks />

    <!-- home Page Reviews -->
    <homePageReviews />

    <!-- Sign In Banner -->
    <v-container fluid class="get-off-banner" v-if="!isLoggedIn">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6" class="text-center">
          <h1 class="get-10-off-heading">
            SIGN UP TO GET 10% OFF ON YOUR FIRST ORDER
          </h1>
          <div class="button-container">
            <v-btn class="sign-up-btn" @click="gotoSignUpPage">Sign Up</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import bestSellingBooks from "./bestSellingBooks.vue";
import lovedByYouBooks from "./lovedByYouBooks.vue";
import homePageReviews from "./homePageReviews.vue";

export default defineComponent({
  name: "homePage",
  components: {
    bestSellingBooks,
    lovedByYouBooks,
    homePageReviews,
  },
  data() {
    return {};
  },

  methods: {
    gotoSignUpPage() {
      this.$router.push({ name: "signUpPage" });
    },
    gotoBooks() {
      this.$router.push({ name: "books" });
    },
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

.hero-section-text {
  text-align: left;
  width: 100%;
  height: 800px;
  background-color: #e7e2bf;
  padding-left: 30px;
}
.hero-section-xs-text {
  text-align: left;
  width: 100%;
  height: 400px;
  background-color: #e7e2bf;
  padding-left: 30px;
}

.hero-section-heading {
  font-family: "Lilita One", serif;
  font-size: 50px;
  font-weight: bolder;
  color: #283618;
  padding-top: 100px;
}
.hero-section-xs-heading {
  font-family: "Lilita One", serif;
  font-size: 40px;
  font-weight: bolder;
  color: #283618;
  padding-top: 20px;
}

.hero-section-description {
  margin-top: 80px;
  font-size: 30px;
  font-weight: 400;
  color: #283618;
}
.hero-section-xs-description {
  margin-top: 30px;
  font-size: 23px;
  font-weight: 400;
  color: #283618;
}

.CTA-button {
  margin-top: 80px;
  font-family: "Playwrite GB J", serif;
  width: 55%;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  background-color: #283618;
  color: white;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
}
.CTA-xs-button {
  margin-top: 60px;
  font-family: "Playwrite GB J", serif;
  width: 55%;
  height: 60px;
  font-size: 17px;
  font-weight: bold;
  background-color: #283618;
  color: white;
  transition: 0.3s ease-in-out;
}

.CTA-button:hover,
.CTA-xs-button:hover {
  background-color: #e7e2bf;
  color: #283618;
  border: 1px solid #283618;
}

.hero-section-image {
  width: 100%;
  height: 800px;
}
.hero-section-xs-image {
  width: 100%;
  height: 400px;
}

.whychoose-section {
  background-color: #fefae0;
  padding: 60px 20px;
  margin-bottom: 40px;
}

.whychoose-heading {
  font-family: "Lilita One", serif;
  font-size: 50px;
  color: #283618;
  margin-bottom: 50px;
}

.whychoose-points-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.whychoose-point {
  display: flex;
  align-items: flex-start;
  text-align: left;
  padding: 0 20px;
}

.point-number {
  font-family: "Lilita One", serif;
  font-size: 36px;
  color: #283618;
  margin-right: 20px;
  min-width: 60px;
}

.point-content {
  flex: 1;
}

.point-title {
  font-family: "Playwrite GB J", serif;
  font-size: 24px;
  font-weight: bold;
  color: #283618;
  margin-bottom: 8px;
}

.point-description {
  font-size: 18px;
  color: #283618;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .whychoose-heading {
    font-size: 30px;
  }

  .point-number {
    font-size: 28px;
    min-width: 50px;
  }

  .point-title {
    font-size: 20px;
  }

  .point-description {
    font-size: 16px;
  }
}

.get-off-banner {
  margin-top: 130px;
  width: 100%;
  height: auto;
  background-color: #fefae0;
  left: 0;
}

.get-10-off-heading {
  font-size: 50px;
  display: flex;
  justify-content: center;
  padding-top: 30px;
}
@media (max-width: 600px) {
  .get-10-off-heading {
    font-size: 30px;
  }
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.sign-up-btn {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #283618;
  color: white;
  font-size: 23px;
  font-weight: 400;
  padding: 30px 80px;
  border-radius: 50px;
}
</style>
