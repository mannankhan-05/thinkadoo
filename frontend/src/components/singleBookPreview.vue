<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="6">
        <div class="bookImageContainer">
          <v-img class="bookImage" :src="book.image"></v-img>
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <div class="product-details ml-5 mt-15">
          <h1 class="book-title">{{ book.title }}</h1>

          <span class="book-reviews">Reviews</span>
          <v-icon class="star ml-8">mdi-star</v-icon>
          <v-icon class="star">mdi-star</v-icon>
          <v-icon class="star">mdi-star</v-icon>
          <v-icon class="star">mdi-star</v-icon>
          <v-icon class="star">mdi-star</v-icon>

          <div class="book-text">
            Supercharge your child’s learning journey with this amazingly
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
            <v-btn class="add-to-card-btn">Add To Cart</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- quote (image) -->
    <img
      class="quote-image mb-15"
      :src="require('../assets/quote.png')"
      alt=""
    />

    <!-- anoter image -->
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <img
          class="heroes-image"
          :src="require('../assets/heroes.jpeg')"
          alt=""
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <span class="heroes-text"
          >Watch their eyes light up as they turn each page. Our stories aren’t
          just tales—they’re tools to spark curiosity, kindness, and courage.
          Whether snuggled up with a printed book or exploring an e-book on-
          the-go, every story celebrates everyday heroes and lifelong values.
          Let’s turn reading time into heart- growing time. Ready to start their
          journey?</span
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "singleBookPreview",

  data() {
    return {
      book: {} as object,
    };
  },
  async mounted() {
    let response = await axios.get(
      `http://localhost:5000/book/${this.$route.params.id}`
    );
    this.book = response.data;
  },
});
</script>

<style scoped>
.bookImageContainer {
  width: 100%;
  height: 800px;
}

.bookImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-title {
  font-size: 60px;
  font-weight: bold;
  font-family: "Lato", sans-serif;
  color: #333;
  margin-top: 50px;
}

.book-reviews {
  font-size: 30px;
  font-family: "Lato", sans-serif;
  color: #333;
  margin-top: 20px;
  font-weight: 350;
}

.star {
  color: orange;
  font-size: 40px;
  margin-bottom: 17px;
}

.book-text {
  font-size: 30px;
  font-weight: 250;
}

.baby-icon {
  font-size: 40px;
}

.baby-icon-text {
  font-size: 30px;
  font-weight: 300;
}

.book-price {
  font-size: 45px;
  font-weight: bolder;
}

.add-to-card-btn {
  display: flex;
  justify-content: center;
  height: 60px;
  background-color: #283618;
  color: white;
  font-size: 40px;
  padding: 40px 40px;
  font-weight: 300;
  border-radius: 0;
}

.quote-image {
  width: 100%;
}

.heroes-image {
  width: 100%;
  border-radius: 150px;
}

.heroes-text {
  font-size: 30px;
  display: flex;
  justify-content: center;
  font-weight: thin;
  margin-top: 140px;
}
</style>
