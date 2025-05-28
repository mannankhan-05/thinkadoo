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

    <!-- If cart is empty -->
    <v-empty-state
      v-if="cart.length === 0"
      icon="mdi-cart"
      text="It looks like your cart is empty. Start shopping now!"
      title="Cart is Empty"
    ></v-empty-state>

    <!-- else -->
    <v-sheet v-else class="book-sheet" v-for="book in cart" :key="book.id">
      <v-row>
        <v-col cols="12" lg="2" md="2" sm="6" xs="12">
          <img class="book-image" :src="book.image" alt="" />
        </v-col>

        <v-col cols="12" lg="10" md="10" sm="6" xs="12">
          <div class="book-details">
            <h1>{{ book.title }}</h1>
            <h2 class="customize-char-btn">Customize Character</h2>
            <h2 class="book-price">{{ book.price }}$</h2>
            <v-btn
              class="remove-from-cart-btn"
              @click="removeBookFromCart(book.id)"
              >Remove From Cart</v-btn
            >
          </div>
        </v-col>
      </v-row>
      <v-divider
        :thickness="5"
        color="grey-darken-4"
        class="mt-6 pb-8"
      ></v-divider>
    </v-sheet>

    <div class="sub-total-price">
      <h2 v-if="cart.length != 0" class="sub-total-label">
        Sub Total : <span class="sub-total-amount">{{ subTotalPrice }}$</span>
      </h2>

      <div class="buttons-container d-flex flex-column align-end">
        <v-btn class="continue-btn" @click="gotoBooksPage"
          >Continue Shopping</v-btn
        >
        <v-btn
          v-if="cart.length != 0"
          class="checkout-btn"
          @click="gotoCheckoutPage"
          >Checkout</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Book {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default defineComponent({
  name: "userCart",

  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    };
  },

  computed: {
    subTotalPrice() {
      return this.cart.reduce((acc: number, book: Book) => {
        return acc + book.price;
      }, 0);
    },
  },

  methods: {
    removeBookFromCart(bookId: number) {
      const updatedCart = this.cart.filter((book: Book) => book.id !== bookId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      this.cart = updatedCart;
    },
    gotoBooksPage() {
      this.$router.push({ name: "books" });
    },
    gotoCheckoutPage() {
      this.$router.push({ name: "orderCheckout" });
    },
  },
});
</script>

<style scoped>
.cart-header {
  font-size: 45px;
}

.book-sheet {
  width: 100%;
  min-height: 300px;
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

.customize-char-btn {
  font-weight: 400;
  color: #f8b400;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 22px;
  transition: 0.3s ease-in-out;
}
.customize-char-btn:hover {
  color: #2b2b2b;
}

.sub-total-price {
  text-align: right;
  margin-right: 20px;
}

.sub-total-label {
  font-size: 40px;
  font-weight: 400;
}

.sub-total-amount {
  font-size: 25px;
  font-weight: 400;
  color: #8a6604;
}

.continue-btn,
.checkout-btn {
  width: 400px;
  height: 60px;
  background-color: #283618;
  color: white;
  font-size: 25px;
  font-weight: 400;
  margin-top: 20px;
  border-radius: 8px;
  transition: 0.3 ease-in-out;
}

.continue-btn:hover,
.checkout-btn:hover {
  background-color: #2b3b17;
}

.remove-from-cart-btn {
  width: 300px;
  height: 50px;
  background-color: #f8b400;
  color: #2b2b2b;
  font-size: 22px;
  font-weight: 400;
  margin-top: 20px;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
}
.remove-from-cart-btn:hover {
  background-color: #6a7261;
  color: white;
}

@media (max-width: 600px) {
  .sub-total-price {
    text-align: center;
  }

  .buttons-container {
    justify-content: center;
    align-items: center;
  }

  .sub-total-price {
    margin-right: 0;
  }

  .continue-btn,
  .checkout-btn {
    width: 100%;
    display: block;
  }
}
</style>
