<template>
  <v-container fluid justify="center">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="slider">
          <v-carousel hide-delimiters height="70vh">
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

    <bestSellingBooks />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import bestSellingBooks from "./bestSellingBooks.vue";

export default defineComponent({
  name: "homePage",
  components: {
    bestSellingBooks,
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
</style>
