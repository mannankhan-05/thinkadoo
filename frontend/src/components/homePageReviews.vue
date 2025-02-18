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
        <div class="reviews-container">
          <v-rating
            class="d-flex justify-center pt-6 pb-3"
            hover
            readonly
            :length="review.rating"
            :size="32"
            :model-value="review.rating"
            active-color="orange-darken-4"
          />

          <p class="review-text d-flex justify-center mb-3">
            {{ review.review }}
          </p>

          <h3 class="user-name">{{ review.user.name }}</h3>
        </div>
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
  position: relative;
  max-width: 500px;
  height: 300px;
  background-color: #aaae7f;
}

.review-text {
  font-size: 30px;
  font-weight: 400;
}

.user-name {
  position: absolute;
  bottom: 40px;
  padding-left: 20px;
}
</style>
