<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="6">
        <div class="bookImageContainer">
          <v-img
            class="bookImage"
            :src="book.image"
            :aspect-ratio="1"
            cover
          ></v-img>
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <div class="product-details ml-md-5 mt-md-0 mt-3">
          <h1 class="book-title">{{ book.title }}</h1>

          <div class="d-flex align-center mb-2">
            <span class="book-reviews">Reviews</span>
            <div class="ml-4 d-flex">
              <v-icon
                v-for="n in 5"
                :key="n"
                class="star"
                :color="
                  n <= (averageRating || 5)
                    ? 'amber-darken-2'
                    : 'grey-lighten-1'
                "
              >
                mdi-star
              </v-icon>
            </div>
            <span class="ml-2 review-count">({{ reviews.length || 0 }})</span>
          </div>

          <div class="book-text">
            Supercharge your child's learning journey with this amazingly
            personalized alphabet book, full of beautiful illustrations and
            hilarious characters.
          </div>

          <div class="mt-5 d-flex align-items-center">
            <v-icon class="baby-icon mt-1">mdi-baby-face-outline</v-icon>
            <h5 class="baby-icon-text ml-5">Recommended for ages 0-3</h5>
          </div>

          <div class="mt-5 d-flex align-items-center">
            <v-icon class="baby-icon mt-1">mdi-home-outline</v-icon>
            <h5 class="baby-icon-text ml-5">
              Printed and dispatched in 2-4 working days
            </h5>
          </div>

          <div class="mt-8 d-flex align-items-center baby-icon-text book-price">
            <span>$</span>{{ book.price }} USD
          </div>

          <div class="mt-8">
            <v-btn class="add-to-card-btn" @click="buyNow(book)">Buy Now</v-btn>
          </div>

          <div class="mt-4">
            <v-btn class="add-to-card-btn" @click="addToLocalStorage(book)"
              >Add To Cart</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- quote (image) -->
    <!-- <v-img
      class="quote-image mb-md-15 mb-5 mt-10"
      :src="require('../assets/quote.png')"
      alt="Quote"
      max-height="300"
      contain
    ></v-img> -->

    <!-- heroes section -->
    <div class="bookImageContainer mt-10">
      <v-row>
        <v-col cols="12" md="6" lg="6">
          <v-img
            class="heroes-image"
            :src="require('../assets/heroes.jpeg')"
            alt="Heroes"
            height="500"
            cover
          ></v-img>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <span class="heroes-text">
            Watch their eyes light up as they turn each page. Our stories aren't
            just tales—they're tools to spark curiosity, kindness, and courage.
            Whether snuggled up with a printed book or exploring an e-book
            on-the-go, every story celebrates everyday heroes and lifelong
            values. Let's turn reading time into heart-growing time. Ready to
            start their journey?
          </span>
        </v-col>
      </v-row>
    </div>

    <!-- Reviews Section -->
    <v-row class="mt-16">
      <v-col cols="12">
        <h2 class="review-heading text-h3 font-weight-bold mb-6">
          Customer Reviews
        </h2>

        <!-- Review List -->
        <div v-if="reviews.length > 0" class="reviews-container mb-10">
          <v-card
            v-for="(review, index) in reviews"
            :key="index"
            class="mb-4 review-card"
            elevation="2"
          >
            <v-card-title class="d-flex align-center">
              <v-avatar color="#283618" class="mr-4">
                <span class="text-h6 text-white">{{
                  review.name.charAt(0)
                }}</span>
              </v-avatar>
              <div>
                <div class="font-weight-bold">{{ review.name }}</div>
                <div class="d-flex">
                  <v-icon
                    v-for="n in 5"
                    :key="n"
                    size="small"
                    :color="
                      n <= review.rating ? 'amber-darken-2' : 'grey-lighten-1'
                    "
                  >
                    mdi-star
                  </v-icon>
                  <span class="ml-2 text-caption">{{
                    formatDate(review.date)
                  }}</span>
                </div>
              </div>
            </v-card-title>
            <v-card-text>
              <p>{{ review.review }}</p>
            </v-card-text>
          </v-card>
        </div>
        <div v-else class="text-center mb-10">
          <p class="text-h6">
            No reviews yet. Be the first to review this book!
          </p>
        </div>

        <!-- Add Review Button -->
        <div class="text-center mb-6">
          <v-btn
            color="#283618"
            class="submit-review-button text-white px-8 py-2"
            size="large"
            @click="showReviewForm = !showReviewForm"
          >
            {{ showReviewForm ? "Cancel" : "Write a Review" }}
          </v-btn>
        </div>

        <!-- Review Form -->
        <v-expand-transition>
          <v-card
            v-if="showReviewForm"
            class="review-form-card mb-10"
            elevation="3"
          >
            <v-card-title class="review-form-heading text-h5 font-weight-bold"
              >Share Your Experience</v-card-title
            >
            <v-card-text>
              <v-form
                ref="reviewForm"
                v-model="isFormValid"
                @submit.prevent="submitReview"
              >
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newReview.name"
                      label="Your Name"
                      :rules="[(v) => !!v || 'Name is required']"
                      required
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newReview.email"
                      label="Email Address"
                      :rules="[
                        (v) => !!v || 'Email is required',
                        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                      ]"
                      required
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <label
                      class="rating-heading text-subtitle-1 font-weight-medium d-block mb-2"
                      >Rating</label
                    >
                    <div class="d-flex align-center">
                      <v-rating
                        v-model="newReview.rating"
                        color="amber-darken-2"
                        hover
                        size="large"
                      ></v-rating>
                      <span class="ml-2 text-body-2"
                        >{{ newReview.rating }} of 5 stars</span
                      >
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="newReview.comment"
                      label="Your Review"
                      :rules="[
                        (v) => !!v || 'Review is required',
                        (v) =>
                          v.length >= 10 ||
                          'Review must be at least 10 characters',
                      ]"
                      required
                      variant="outlined"
                      rows="4"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-btn
                  color="#283618"
                  class="submit-review-button text-white px-8"
                  size="large"
                  type="submit"
                  :disabled="!isFormValid || submittingReview"
                >
                  <span>
                    <v-progress-circular
                      v-if="submittingReview"
                      indeterminate
                      :size="25"
                      class="mr-2"
                    ></v-progress-circular>
                    Submit Review</span
                  >
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  name: "singleBookPreview",

  data() {
    return {
      book: {} as object,
      reviews: [] as Array<{
        name: string;
        email: string;
        rating: number;
        comment: string;
        date: Date;
      }>,
      newReview: {
        name: "",
        email: "",
        rating: 5,
        comment: "",
      },
      showReviewForm: false,
      isFormValid: false,
      averageRating: 0,
      submittingReview: false,
    };
  },

  async mounted() {
    let response = await axiosInstance.get(`/book/${this.$route.params.id}`);
    this.book = response.data;

    this.fetchReviews();
  },

  methods: {
    addToLocalStorage(book: object) {
      let cart = localStorage.getItem("cart");
      if (cart) {
        let cartArray = JSON.parse(cart);
        cartArray.push(book);
        localStorage.setItem("cart", JSON.stringify(cartArray));
      } else {
        localStorage.setItem("cart", JSON.stringify([book]));
      }
    },

    buyNow(book: object) {
      let bookToBuy = localStorage.getItem("bookToBuy");
      if (bookToBuy) {
        localStorage.removeItem("bookTo");
      }
      localStorage.setItem("bookToBuy", JSON.stringify(book));

      this.$router.push({ name: "personalizeCharacter" });
    },

    async fetchReviews() {
      let response = await axiosInstance(
        `/bookReviews/${this.$route.params.id}`
      );
      this.reviews = response.data;

      this.calculateAverageRating();
    },

    async submitReview() {
      if (!this.isFormValid) return;

      this.submittingReview = true;

      await axiosInstance.post("/createBookReview", {
        name: this.newReview.name,
        email: this.newReview.email,
        rating: this.newReview.rating,
        review: this.newReview.comment,
        bookId: this.$route.params.id,
      });

      // Reset form
      this.newReview = {
        name: "",
        email: "",
        rating: 5,
        comment: "",
      };

      this.showReviewForm = false;

      // Recalculate average
      this.calculateAverageRating();

      alert("Thank you for your review!");
    },

    calculateAverageRating() {
      if (this.reviews.length === 0) return;

      const sum = this.reviews.reduce(
        (total, review) => total + review.rating,
        0
      );
      this.averageRating = Math.round((sum / this.reviews.length) * 10) / 10;
    },

    formatDate(date: Date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
});
</script>

<style scoped>
.bookImageContainer {
  width: 100%;
  min-height: 400px;
}

.bookImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.bookImage:hover {
  transform: scale(1.02);
}

.book-title {
  font-family: "Bitter", serif;
  font-size: 60px;
  font-weight: bold;
  /* font-family: "Lato", sans-serif; */
  color: #333;
  margin-top: 50px;
}

.book-reviews {
  font-size: 30px;
  font-family: "Lato", sans-serif;
  color: #333;
  font-weight: 350;
}

.review-count {
  font-size: 18px;
  color: #666;
}

.star {
  color: orange;
  font-size: 30px;
}

.book-text {
  font-size: 30px;
  font-weight: 250;
  line-height: 1.4;
  margin-top: 20px;
}

.baby-icon {
  font-size: 40px;
  color: #283618;
}

.baby-icon-text {
  font-size: 30px;
  font-weight: 300;
}

.book-price {
  font-size: 40px;
  font-weight: bolder;
  color: #283618;
}

.add-to-card-btn {
  display: flex;
  justify-content: center;
  width: 400px;
  height: 60px;
  background-color: #283618;
  color: white;
  font-size: 35px;
  padding: 40px 40px;
  font-weight: 300;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(40, 54, 24, 0.2);
}

.add-to-card-btn:hover {
  background-color: #2b3b17;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(40, 54, 24, 0.3);
}

.quote-image {
  width: 100%;
  display: block;
  max-height: 300px;
  object-fit: contain;
}

.heroes-image {
  width: 100%;
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.heroes-image:hover {
  transform: translateY(-5px);
}

.heroes-text {
  font-size: 30px;
  display: flex;
  justify-content: center;
  font-weight: 300;
  margin-top: 140px;
  line-height: 1.5;
}

.review-form-card {
  border-radius: 16px;
  padding: 20px;
  background-color: #fefae0;
  border: 1px solid rgba(40, 54, 24, 0.2);
}

.review-card {
  border-radius: 12px;
  border-left: 5px solid #283618;
  transition: transform 0.2s ease;
}

.review-card:hover {
  transform: translateX(5px);
}

.review-heading,
.review-form-heading,
.rating-heading {
  font-family: "Bitter", serif;
}

.submit-review-button {
  border-radius: 8px !important;
}

@media (max-width: 960px) {
  .heroes-text {
    margin-top: 40px;
    font-size: 24px;
  }
}

@media (max-width: 600px) {
  .book-title {
    font-size: 30px; /* Reduce size on small screens */
    margin-top: 20px;
  }
  .book-reviews {
    font-size: 20px;
  }
  .book-text,
  .baby-icon-text {
    font-size: 20px;
  }
  .book-price {
    font-size: 30px;
  }
  .add-to-card-btn {
    font-size: 25px;
    padding: 20px;
    width: 100%;
  }
  .heroes-text {
    font-size: 18px;
    margin-top: 20px;
  }
  .star {
    font-size: 20px;
  }
  .baby-icon {
    font-size: 30px;
  }
}
</style>
