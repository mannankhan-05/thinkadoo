<template>
  <v-container class="mt-10">
    <h1>Best Selling Books</h1>
    <v-row justify="center">
      <v-col
        cols="12"
        md="3"
        lg="3"
        v-for="book in bestSellingBooks"
        :key="book.id"
      >
        <v-card :height="500" :width="300">
          <div class="book-image-container">
            <v-img class="book-image" :src="book.image"></v-img>
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
  name: "bestSellingBooks",
  data() {
    return {
      bestSellingBooks: [] as object[],
    };
  },
  async mounted() {
    let response = await axios.get("http://localhost:5000/bestSellingBooks");
    this.bestSellingBooks = response.data;
  },
});
</script>

<style scoped>
.book-image-container {
  background-color: #fefae0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.book-image {
  padding: 20px 15px;
}
</style>
