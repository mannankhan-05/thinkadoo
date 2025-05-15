<template>
  <v-container fluid class="reviews-section">
    <h1 class="reviews-heading mb-5 mt-7">Reviews</h1>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="3"
        md="4"
        sm="6"
        v-for="review in productReviews"
        :key="review.id"
        class="review-col"
      >
        <div class="reviews-container">
          <div class="quote-mark quote-top">"</div>

          <v-rating
            class="d-flex justify-center pt-6 pb-3 rating-stars"
            hover
            readonly
            :length="review.rating"
            :size="32"
            :model-value="review.rating"
            active-color="orange-darken-4"
          />

          <div class="review-text-wrapper">
            <p class="review-text">
              {{ review.review }}
            </p>
          </div>

          <div class="user-info">
            <div class="user-avatar">
              {{ getInitials(review.name) }}
            </div>
            <h3 class="user-name">{{ review.name }}</h3>
          </div>

          <div class="quote-mark quote-bottom">"</div>
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
  methods: {
    getInitials(name: string): string {
      if (!name) return "";
      return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

.reviews-section {
  padding-bottom: 60px;
}

.reviews-heading {
  font-family: "Bitter", serif;
  font-size: 40px;
  position: relative;
  display: inline-block;
  margin-left: 16px;
}

.reviews-heading::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 80px;
  height: 4px;
  background-color: #283618;
}

@media (max-width: 600px) {
  .reviews-heading {
    display: flex;
    justify-content: center;
    margin-left: 0;
  }

  .reviews-heading::after {
    left: 50%;
    transform: translateX(-50%);
  }
}

.review-col {
  padding: 16px;
}

.reviews-container {
  position: relative;
  max-width: 500px;
  height: 300px;
  background-color: #aaae7f;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.reviews-container:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.quote-mark {
  font-family: "Bitter", serif;
  font-size: 80px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.3);
  position: absolute;
}

.quote-top {
  top: 10px;
  left: 15px;
}

.quote-bottom {
  bottom: -20px;
  right: 15px;
}

.rating-stars {
  position: relative;
  z-index: 2;
}

.review-text-wrapper {
  flex: 1;
  overflow-y: auto;
  margin: 0 10px;
  padding: 0 5px;
  position: relative;
  z-index: 2;

  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #283618 transparent;
}

.review-text-wrapper::-webkit-scrollbar {
  width: 6px;
}

.review-text-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.review-text-wrapper::-webkit-scrollbar-thumb {
  background-color: #283618;
  border-radius: 10px;
}

.review-text {
  font-size: 18px;
  font-weight: 400;
  font-family: "Varela Round", sans-serif;
  line-height: 1.5;
  color: #283618;
  text-align: center;
  margin-bottom: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 2;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #283618;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Varela Round", sans-serif;
  font-weight: 600;
  margin-right: 12px;
  font-size: 16px;
}

.user-name {
  font-family: "Bitter", serif;
  font-size: 18px;
  color: #283618;
  font-weight: 600;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .reviews-container {
    height: 280px;
  }

  .review-text {
    font-size: 16px;
  }
}

@media (max-width: 600px) {
  .reviews-container {
    height: 250px;
  }

  .quote-mark {
    font-size: 60px;
  }

  .quote-top {
    top: 5px;
    left: 10px;
  }

  .quote-bottom {
    bottom: -15px;
    right: 10px;
  }
}
</style>
