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
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  name: "homePageReviews",

  data() {
    return {
      productReviews: [] as object[],
    };
  },
  async mounted() {
    const response = await axiosInstance.get("/getBookReviews");
    this.productReviews = response.data;
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

.reviews-heading {
  font-family: "Bitter", serif;
  font-size: 40px;
}
@media (max-width: 600px) {
  .reviews-heading {
    display: flex;
    justify-content: center;
  }
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
