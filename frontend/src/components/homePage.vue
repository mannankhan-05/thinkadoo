<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="12" md="12" sm="12">
        <div class="slider">
          <v-carousel hide-delimiters>
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
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "homePage",
  data() {
    return {
      items: [{ src: "/slider1.png" }, { src: "/slider2.png" }],
    };
  },
});
</script>

<style scoped>
.slider {
  width: 100%;
}
</style>
