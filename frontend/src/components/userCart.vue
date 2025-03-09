<template>
  <div>
    <div class="cart-header ml-4 mt-4">
      <v-icon class="mr-4">mdi-cart-outline</v-icon>
      <span>Cart</span>
    </div>

    <v-divider
      :thickness="5"
      color="grey-darken-4"
      class="mt-6 mb-8"
    ></v-divider>

    <v-sheet class="book-sheet" v-for="book in cart" :key="book.id">
      <v-row>
        <v-col cols="12" lg="2" md="2" sm="6" xs="12">
          <img class="book-image" :src="book.image" alt="" />
        </v-col>

        <v-col cols="12" lg="10" md="10" sm="6" xs="12">
          <div class="book-details">
            <h1>{{ book.title }}</h1>
            <h2 class="book-price">{{ book.price }}$</h2>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "userCart",

  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    };
  },
});
</script>

<style scoped>
.cart-header {
  font-size: 45px;
}

.book-sheet {
  width: 100%;
  height: 300px;
  background-color: #fefae0;
  font-family: "Bitter";
}

.book-image {
  width: 300px;
  height: 280px;
  border: 6px solid black;
  margin-left: 30px;
}

.book-details {
  margin-top: 50px;
  margin-left: 50px;
}

.book-price {
  font-weight: 400;
}
</style>
