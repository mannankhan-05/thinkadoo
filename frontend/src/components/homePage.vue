<template>
  <v-container fluid justify="center">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="slider">
          <v-carousel :show-arrows="false" height="100vh" cycle interval="3000">
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              cover
            ></v-carousel-item>
          </v-carousel>
        </div>
      </v-col>
    </v-row>

    <!-- Best Selling Books -->
    <bestSellingBooks />

    <!-- why choose printed books image -->
    <img
      class="whychoose-ebook-image"
      :src="require('../assets/whychoose-ebook.png')"
      alt=""
    />

    <!-- Books Loved By You -->
    <lovedByYouBooks />

    <!-- home Page Reviews -->
    <homePageReviews />

    <!-- Sign In Banner -->
    <v-container fluid class="get-off-banner">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6" class="text-center">
          <h1 class="get-10-off-heading">
            SIGN UP TO GET 10% OFF ON YOUR FIRST ORDER
          </h1>
          <div class="button-container">
            <v-btn class="sign-up-btn">Sign Up</v-btn>
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
    return {
      items: [{ src: "/slider1.png" }, { src: "/slider2.png" }],
    };
  },
});
</script>

<style scoped>
.slider {
  width: 100vw;
}

.v-carousel {
  width: 100%;
}

.v-carousel-item {
  width: 100%;
  height: 100vh;
}

.whychoose-ebook-image {
  width: 100%;
  margin-bottom: 40px;
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
  font-size: 30px;
  font-weight: 400;
  padding: 40px 50px;
  border-radius: 50px;
}
</style>
