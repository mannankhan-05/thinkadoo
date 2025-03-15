<template>
  <v-container class="best-selling-books-container" fluid>
    <h1 class="best-selling-book-heading">Best Selling Books</h1>
    <v-row justify="center">
      <v-col
        cols="12"
        md="3"
        lg="3"
        v-for="book in bestSellingBooks"
        :key="book.id"
        class="d-flex justify-center"
      >
        <v-card :elevation="0" class="best-selling-book-card">
          <div class="book-image-container">
            <v-img class="book-image" :src="book.image"></v-img>
            <v-btn class="buy-now-btn" @click="pushToSingleBookPage(book.id)"
              >Buy Now</v-btn
            >
            <div class="book-title-container">
              <h1 class="ml-3 mt-3">{{ book.title }}</h1>
              <h3 class="book-description ml-3">
                {{ descriptionEllipsis(book.description) }}
              </h3>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  name: "bestSellingBooks",
  data() {
    return {
      bestSellingBooks: [] as object[],
    };
  },
  async mounted() {
    let response = await axiosInstance.get("/bestSellingBooks");
    this.bestSellingBooks = response.data;
  },
  methods: {
    pushToSingleBookPage(bookId: number) {
      this.$router.push({ name: "singleBookPreview", params: { id: bookId } });
    },
    descriptionEllipsis(description: string) {
      if (description.length > 70) {
        return description.slice(0, 70) + "...";
      }
      return description;
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

.best-selling-books-container {
  margin-top: 120px;
  margin-bottom: 80px;
}

.best-selling-book-heading {
  font-family: "Bitter", serif;
  margin-bottom: 20px;
  font-size: 40px;
}
@media (max-width: 600px) {
  .best-selling-book-heading {
    display: flex;
    justify-content: center;
  }
}

.best-selling-book-card {
  width: 100%;
  max-width: 600px;
  height: 500px;
  font-family: "Varela Round", serif;
  display: flex;
  justify-content: center;
  border-radius: 0;
}

.book-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items at the top */
  background-color: #dad7cd;
  width: 100%;
  padding: 20px;
}

.book-image {
  width: 600px;
  margin-top: 20px;
  width: 450px;
  max-height: 250px;
  object-fit: contain; /* Prevents cropping */
}

.buy-now-btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #283618;
  color: white;
  border-radius: 25px;
  padding: 15px 40px;
  font-size: 18px;
}

.book-title-container {
  font-family: "Varela Round", serif;
  height: 130px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
}

.book-description {
  font-weight: 400;
}
</style>
