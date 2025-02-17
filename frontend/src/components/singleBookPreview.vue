<template>
  <v-container>
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
        </div>
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
  height: 700px;
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
</style>
