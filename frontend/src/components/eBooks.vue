<template>
  <v-container fluid class="book-container pa-0">
    <!-- Hero Section -->
    <v-row no-gutters class="hero-section">
      <v-col cols="12" class="text-center py-16">
        <h1 class="book-collection-heading">OUR BOOK COLLECTION</h1>
        <p class="book-collection-description">
          Discover stories that celebrate love, family, and everyday heroes.
          Each book is crafted to create meaningful moments and lasting
          memories.
        </p>
      </v-col>
    </v-row>

    <!-- Featured Books Carousel -->
    <v-row no-gutters>
      <v-col cols="12" class="featured-section py-16">
        <h2 class="featured-heading text-center mb-12">FEATURED STORIES</h2>

        <v-carousel
          v-model="activeSlide"
          hide-delimiters
          :show-arrows="false"
          height="auto"
          class="featured-carousel"
        >
          <v-carousel-item v-for="book in featuredBooks" :key="book.id">
            <v-row class="fill-height" align="center">
              <v-col cols="12" md="6" class="d-flex justify-center">
                <v-img
                  :src="book.image"
                  max-width="300"
                  class="book-cover rounded-lg elevation-5"
                ></v-img>
              </v-col>
              <v-col cols="12" md="6" class="text-center text-md-left">
                <h3 class="featured-book-title">{{ book.title }}</h3>
                <p class="featured-book-author mb-4">$ {{ book.price }}</p>
                <p class="featured-book-description mb-8">
                  {{ book.description }}
                </p>
                <v-btn
                  class="view-book-btn"
                  x-large
                  rounded
                  elevation="2"
                  @click="viewBook(book.id)"
                >
                  View Book
                </v-btn>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>

        <!-- Custom Navigation -->
        <div class="carousel-navigation">
          <v-btn icon class="carousel-nav-btn" @click="prevSlide">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <div class="carousel-indicators">
            <div
              v-for="(_, index) in featuredBooks"
              :key="index"
              class="carousel-indicator"
              :class="{ active: activeSlide === index }"
              @click="activeSlide = index"
            ></div>
          </div>

          <v-btn icon class="carousel-nav-btn" @click="nextSlide">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Book Exploration Grid -->
    <v-row no-gutters class="px-4 py-12">
      <v-col cols="12" class="text-center mb-12">
        <h2 class="explore-heading">EXPLORE OUR STORIES</h2>
        <p class="explore-description">
          Discover books that celebrate love, family, and everyday heroes
        </p>
      </v-col>

      <!-- Category Tabs -->
      <!-- <v-col cols="12" class="mb-12">
        <v-tabs
          v-model="activeCategory"
          centered
          background-color="#e7e2bf"
          class="category-tabs"
        >
          <v-tab
            v-for="category in categories"
            :key="category"
            :value="category"
            class="category-tab"
          >
            {{ category }}
          </v-tab>
        </v-tabs>
      </v-col> -->

      <!-- Book Grid -->
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="book in books"
            :key="book.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="mb-6"
          >
            <v-card class="book-card h-100" elevation="2" hover>
              <div class="book-image-container">
                <v-img
                  :src="book.image"
                  height="350"
                  cover
                  class="book-image"
                  @click="viewBook(book.id)"
                ></v-img>

                <!-- <v-chip
                  v-if="book.isBestseller"
                  class="bestseller-badge"
                  color="#283618"
                  text-color="white"
                >
                  Bestseller
                </v-chip>

                <v-btn
                  icon
                  class="favorite-btn"
                  :color="favorites.includes(book.id) ? 'red' : ''"
                  @click="toggleFavorite(book.id)"
                >
                  <v-icon>
                    {{
                      favorites.includes(book.id)
                        ? "mdi-heart"
                        : "mdi-heart-outline"
                    }}
                  </v-icon>
                </v-btn> -->
              </div>

              <v-card-text class="book-card-content">
                <h3 class="book-title">{{ book.title }}</h3>

                <div class="d-flex align-center mb-3">
                  <div class="rating-stars">
                    <v-icon
                      v-for="i in 5"
                      :key="i"
                      :color="
                        i <= Math.floor(book.rating)
                          ? 'amber'
                          : 'grey lighten-2'
                      "
                      size="small"
                    >
                      mdi-star
                    </v-icon>
                  </div>
                  <!-- <span class="review-count">({{ book.reviews }})</span> -->
                </div>

                <div class="d-flex justify-space-between align-center">
                  <span class="book-price">${{ book.price }}</span>
                  <v-btn
                    color="#283618"
                    class="add-to-cart-btn"
                    @click="addToCart(book)"
                  >
                    <span v-if="!cartButtonLoading">
                      <v-icon left class="mr-2">mdi-cart</v-icon>
                      Add to Cart
                    </span>
                    <v-progress-circular
                      v-if="cartButtonLoading"
                      indeterminate
                      :size="40"
                    ></v-progress-circular>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Newsletter Section -->
    <v-row no-gutters class="newsletter-section py-16">
      <v-col cols="12" class="text-center">
        <h2 class="newsletter-heading mb-6">STAY UPDATED WITH NEW RELEASES</h2>
        <p class="newsletter-description mb-8">
          Subscribe to our newsletter and be the first to know about new books,
          special offers, and exclusive events.
        </p>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-form @submit.prevent="subscribeNewsletter">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-text-field
                    v-model="email"
                    label="Your email address"
                    outlined
                    dense
                    class="newsletter-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-btn
                    type="submit"
                    color="#283618"
                    class="newsletter-btn"
                    block
                  >
                    Subscribe
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  name: "BookCollection",

  data() {
    return {
      // Featured books data
      featuredBooks: [] as object[],

      // Books data
      books: [] as object[],

      // Categories for filtering
      categories: ["All", "Family", "Romance", "Inspiration", "Children"],

      // State variables
      activeCategory: "All",
      activeSlide: 0,
      favorites: [] as number[],
      email: "",

      cartButtonLoading: false as boolean,
    };
  },

  async mounted() {
    let response = await axiosInstance.get("/books");
    this.books = response.data.books;

    let response2 = await axiosInstance.get("/books", {
      params: {
        limit: 3,
      },
    });
    this.featuredBooks = response2.data.books;
  },

  // computed: {
  //   filteredBooks() {
  //     if (this.activeCategory === "All") {
  //       return this.books;
  //     } else {
  //       return this.books.filter(
  //         (book) => book.category === this.activeCategory
  //       );
  //     }
  //   },
  // },

  methods: {
    toggleFavorite(id: number) {
      const index = this.favorites.indexOf(id);
      if (index === -1) {
        this.favorites.push(id);
      } else {
        this.favorites.splice(index, 1);
      }
    },

    async addToCart(book: object) {
      this.cartButtonLoading = true;

      let cart = localStorage.getItem("cart");
      if (cart) {
        let cartArray = JSON.parse(cart);
        cartArray.push(book);
        localStorage.setItem("cart", JSON.stringify(cartArray));
      } else {
        localStorage.setItem("cart", JSON.stringify([book]));
      }
      this.cartButtonLoading = false;
    },

    viewBook(id: number) {
      this.$router.push({ name: "singleBookPreview", params: { id } });
    },

    nextSlide() {
      this.activeSlide = (this.activeSlide + 1) % this.featuredBooks.length;
    },

    prevSlide() {
      this.activeSlide =
        this.activeSlide === 0
          ? this.featuredBooks.length - 1
          : this.activeSlide - 1;
    },

    subscribeNewsletter() {
      // Implement newsletter subscription
      console.log(`Subscribed with email: ${this.email}`);
      this.email = "";
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

.book-container {
  width: 100%;
  height: auto;
  background-color: #fefae0;
}

/* Hero Section */
.hero-section {
  background-color: #e7e2bf;
  padding: 2rem 0;
}

.book-collection-heading {
  font-family: "Lilita One", serif;
  font-size: 55px;
  color: #283618;
  margin-bottom: 1.5rem;
}

.book-collection-description {
  font-size: 25px;
  color: #283618;
  max-width: 1000px;
  margin: 0 auto;
}

/* Featured Section */
.featured-section {
  background-color: #e7e2bf;
  margin-bottom: 2rem;
}

.featured-heading {
  font-family: "Lilita One", serif;
  font-size: 40px;
  color: #283618;
}

.featured-carousel {
  max-width: 1200px;
  margin: 0 auto;
}

.book-cover {
  object-fit: cover;
}

.featured-book-title {
  font-size: 28px;
  font-weight: bold;
  color: #283618;
  margin-bottom: 0.5rem;
}

.featured-book-author {
  font-size: 18px;
  color: #283618;
  opacity: 0.8;
}

.featured-book-description {
  font-size: 18px;
  color: #283618;
  max-width: 500px;
  margin: 0 auto;
  margin-left: 0;
}

.view-book-btn {
  background-color: #283618 !important;
  color: white !important;
  font-family: "Playwrite GB J", serif;
  font-size: 18px;
  padding: 0px 30px !important;
  border-radius: 8px !important;
  transition: 0.3s ease-in-out;
}

.view-book-btn:hover {
  background-color: #e7e2bf !important;
  color: #283618 !important;
  border: 1px solid #283618 !important;
}

.carousel-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.carousel-nav-btn {
  background-color: white !important;
  margin: 0 1rem;
}

.carousel-indicators {
  display: flex;
  gap: 8px;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(40, 54, 24, 0.3);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-indicator.active {
  background-color: #283618;
}

/* Explore Section */
.explore-heading {
  font-family: "Lilita One", serif;
  font-size: 40px;
  color: #283618;
  margin-bottom: 1rem;
}

.explore-description {
  font-size: 20px;
  color: #283618;
  max-width: 600px;
  margin: 0 auto;
}

.category-tabs {
  border-radius: 50px;
  overflow: hidden;
  max-width: 700px;
  margin: 0 auto;
}

.category-tab {
  color: #283618 !important;
  font-weight: 500;
}

.category-tab.v-tab--selected {
  background-color: #283618 !important;
  color: white !important;
  border-radius: 50px;
}

/* Book Cards */
.book-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  height: 100%;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-image-container {
  position: relative;
}

.book-image {
  transition: transform 0.5s ease;
}

.book-card:hover .book-image {
  transform: scale(1.05);
}

.bestseller-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white !important;
  z-index: 1;
}

.book-card-content {
  background-color: #fefae0;
  padding: 1.25rem;
}

.book-title {
  font-weight: bold;
  font-size: 18px;
  color: #283618;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.75rem;
}

.rating-stars {
  display: flex;
  margin-right: 0.5rem;
}

.review-count {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
}

.book-price {
  font-size: 20px;
  font-weight: bold;
  color: #283618;
}

.add-to-cart-btn {
  border-radius: 8px !important;
  color: white !important;
}

/* Newsletter Section */
.newsletter-section {
  background-color: #e7e2bf;
}

.newsletter-heading {
  font-family: "Lilita One", serif;
  font-size: 35px;
  color: #283618;
}

.newsletter-description {
  font-size: 18px;
  color: #283618;
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-input >>> .v-field__outline {
  color: #283618 !important;
}

.newsletter-btn {
  color: white !important;
  height: 56px !important;
}

/* Responsive Adjustments */
@media (max-width: 960px) {
  .book-collection-heading {
    font-size: 35px;
  }

  .featured-book-title {
    font-size: 24px;
  }

  .featured-book-description {
    font-size: 16px;
  }
}

@media (max-width: 600px) {
  .book-collection-heading {
    font-size: 30px;
  }

  .book-collection-description {
    font-size: 16px;
  }

  .featured-heading,
  .explore-heading,
  .newsletter-heading {
    font-size: 28px;
  }
}
</style>
