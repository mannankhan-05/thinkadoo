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
</style>
