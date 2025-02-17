<template>
  <v-container class="lovedbyyou-books-container" fluid>
    <h1 class="lovedbyyou-book-heading">Loved By You</h1>
    <v-row justify="center">
      <v-col
        cols="12"
        md="3"
        lg="3"
        v-for="book in lovedByYouBooks"
        :key="book.id"
        class="d-flex justify-center"
      >
        <v-card :elevation="0" class="lovedbyyou-book-card">
          <div class="book-image-container">
            <v-img class="book-image" :src="book.image"></v-img>
            <v-btn class="buy-now-btn" @click="pushToSingleBookPage(book.id)"
              >Buy Now</v-btn
            >
            <v-rating
              class="prduct-rating"
              hover
              readonly
              :length="5"
              :size="32"
              :model-value="5"
              color="orange"
              active-color="orange"
              empty-icon="mdi-heart-outline"
              half-icon="mdi-heart-half-full"
              full-icon="mdi-heart"
            />
            <div class="book-title-container">
              <h1 class="ml-3 mt-3">{{ book.title }}</h1>
              <h3 class="book-description ml-3">{{ book.description }}</h3>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "lovedByYouBooks",

  data() {
    return {
      lovedByYouBooks: [] as object[],
    };
  },
  async mounted() {
    let response = await axios.get("http://localhost:5000/lovedByYouBooks");
    this.lovedByYouBooks = response.data;
  },
  methods: {
    pushToSingleBookPage(bookId: number) {
      this.$router.push({ name: "singleBookPreview", params: { id: bookId } });
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");
.lovedbyyou-books-container {
  margin-top: 120px;
  margin-bottom: 120px;
}

.lovedbyyou-book-heading {
  font-family: "Varela Round", serif;
  margin-bottom: 20px;
  font-size: 40px;
}

.lovedbyyou-book-card {
  width: 100%;
  max-width: 600px;
  height: 660px;
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
  max-height: 380px; /* Ensure image fits */
  object-fit: contain; /* Prevents cropping */
}

.buy-now-btn {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 440px;
  bottom: 15px;
  left: 20px;
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
  left: 15px;
  right: 0;
}

.book-description {
  font-weight: 400;
}

.prduct-rating {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 500px;
  bottom: 15px;
  left: 20px;
  font-size: 18px;
}
</style>
