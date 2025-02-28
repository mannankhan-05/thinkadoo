<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xs="12"
        v-for="book in books"
        :key="book.id"
      >
        <v-card height="400" :elevation="8">
          <div class="book-image-container">
            <img class="book-image" :src="book.image" alt="" />
          </div>

          <h1 class="book-title">{{ book.title }}</h1>

          <v-row class="mt-15">
            <v-col cols="6">
              <v-btn class="edit-button">
                <v-icon class="mr-2">mdi-book-edit-outline</v-icon>
                Edit</v-btn
              >
            </v-col>

            <v-col cols="6">
              <v-btn class="delete-button">
                <v-icon class="mr-2">mdi-delete-outline</v-icon>
                Delete</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      books: [] as object[],
    };
  },

  async mounted() {
    const response = await axios.get("http://localhost:5000/books");
    this.books = response.data.books;
    console.log(this.books);
  },
});
</script>

<style scoped>
.book-image-container {
  display: flex;
  justify-content: center;
  height: 50%;
  width: 100%;
  margin-top: 20px;
}

.book-image {
  width: 90%;
  height: 100%;
  border-radius: 7px;
}

.book-title {
  text-align: left;
  font-weight: 100;
  margin-top: 12px;
  margin-left: 20px;
  color: #2b381d;
}

.edit-button,
.delete-button {
  height: 30px;
  background-color: #2b381d;
  color: white;
  font-size: 20px;
  font-weight: 100;
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
}

.edit-button {
  border-top-right-radius: 20px;
}

.delete-button {
  border-top-left-radius: 20px;
}
</style>
