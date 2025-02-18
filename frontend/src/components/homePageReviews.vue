<template>
  <v-container fluid>
    <h1 class="reviews-heading mb-5 mt-7">Reviews</h1>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="3"
        md="3"
        v-for="review in productReviews"
        :key="review.id"
      >
        <div class="reviews-container"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "homePageReviews",

  data() {
    return {
      productReviews: [] as object[],
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:5000/getBookReviews");
    this.productReviews = response.data;
  },
});
</script>

<style scoped>
.reviews-heading {
  font-size: 40px;
}

.reviews-container {
  max-width: 500px;
  height: 300px;
  background-color: #aaae7f;
}
</style>
