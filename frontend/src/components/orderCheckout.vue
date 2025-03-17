<template>
  <v-container fluid class="checkout-container">
    <v-row>
      <v-col>
        <!-- back button -->
        <div
          class="back-button d-flex justify-center"
          @click="if (step > 1) step--;"
        >
          <span :style="{ fontWeight: step === 1 ? 'bold' : 200 }"
            >Shipping Details</span
          >
          &nbsp;>&nbsp;
          <span :style="{ fontWeight: step === 2 ? 'bold' : 200 }"
            >Delivery</span
          >
          &nbsp;>&nbsp;
          <span :style="{ fontWeight: step === 3 ? 'bold' : 200 }"
            >Review & Pay</span
          >
        </div>

        <!-- ---------- STEP 1 ---------- -->
        <div v-if="step === 1">
          <v-row justify="center">
            <v-col cols="12" lg="6" md="6" sm="6" xs="12">
              <!-- Shipping Details sheet -->
              <v-sheet class="shipping-details-sheet">
                <div class="shipping-header">
                  <v-icon class="ml-8">mdi-lock-outline</v-icon>
                  <span class="ml-3">Shipping Details</span>
                </div>

                <v-divider :thickness="5" class="mb-12"></v-divider>

                <!-- Shipping Input Fields -->
                <div>
                  <h1 class="input-label">Name</h1>
                  <div class="d-flex justify-center">
                    <input class="input-field" type="text" v-model="name" />
                  </div>

                  <h1 class="input-label">Email</h1>
                  <div class="d-flex justify-center">
                    <input class="input-field" type="text" v-model="email" />
                  </div>

                  <h1 class="input-label">Street address (or P.O. Box)</h1>
                  <div class="d-flex justify-center">
                    <input
                      class="input-field"
                      type="text"
                      v-model="streetAddress"
                    />
                  </div>

                  <h1 class="input-label">
                    Apt #, Building, etc. (leave blank if none)
                  </h1>
                  <div class="d-flex justify-center">
                    <input class="input-field" type="text" v-model="apt" />
                  </div>

                  <h1 class="input-label">Town/City</h1>
                  <div class="d-flex justify-center">
                    <input class="input-field" type="text" v-model="city" />
                  </div>

                  <h1 class="input-label">ZIP / Postcode</h1>
                  <div class="d-flex justify-center">
                    <input class="input-field" type="text" v-model="zip" />
                  </div>

                  <h1 class="input-label">Country</h1>
                  <div class="d-flex justify-center">
                    <input class="input-field" type="text" v-model="country" />
                  </div>

                  <h1 class="input-label">Phone Number (optional)</h1>
                  <div class="d-flex justify-center">
                    <input
                      class="input-field"
                      type="text"
                      v-model="phoneNumber"
                    />
                  </div>

                  <div
                    class="continue-btn-container d-flex justify-center mt-5 mb-15"
                  >
                    <v-btn class="continue-button" @click="step++"
                      >Continue to delievery</v-btn
                    >
                  </div>
                </div>
              </v-sheet>
            </v-col>

            <v-col cols="12" lg="4" md="4" sm="6" xs="12">
              <!-- Order Summary Sheet -->
              <v-sheet class="order-summary-sheet">
                <div class="summary-header text-start">
                  <span class="pa-3">Order Summary</span>
                </div>

                <v-divider :thickness="5" class="mb-12"></v-divider>

                <!-- book/books -->
                <v-row justify="center" v-for="book in cart" :key="book.id">
                  <v-col cols="12" lg="6" md="6" sm="6" xs="6">
                    <div class="d-flex justify-center">
                      <img class="book-image" :src="book.image" alt="" />
                    </div>
                  </v-col>

                  <v-col cols="12" lg="6" md="6" sm="6" xs="6">
                    <div>
                      <h2 class="book-title">{{ book.title }}</h2>
                      <h2 class="customize-char-text">customize character</h2>
                      <h2 class="book-price">{{ book.price }} USD</h2>
                    </div>
                  </v-col>
                </v-row>

                <!-- coupon code -->
                <h1 class="coupon-label d-flex justify-center">Coupon Code</h1>
                <div class="d-flex justify-center">
                  <v-row justify="center" no-gutters>
                    <v-col cols="8">
                      <input class="coupon-field" type="text" />
                    </v-col>

                    <v-col cols="2">
                      <div
                        class="validate-coupon-container d-flex justify-center align-center"
                      >
                        <v-tooltip text="validate coupon">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="validate-coupon-icon"
                              >mdi-check-decagram</v-icon
                            >
                          </template>
                        </v-tooltip>
                      </div>
                    </v-col>
                  </v-row>
                </div>

                <v-divider :thickness="5" class="mb-5"></v-divider>

                <!-- total price -->
                <div>
                  <h1 class="ml-6 mb-5">
                    Order Total
                    <span class="order-amount">{{ totalOrderAmount }} USD</span>
                  </h1>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </div>

        <!-- ---------- STEP 2 ---------- -->
        <div v-if="step === 2">
          <v-row justify="center">
            <v-col cols="12" lg="4" md="4" sm="6" xs="10">
              <!-- Order Delivery Sheet -->
              <v-sheet class="order-delivery-sheet">
                <v-radio-group v-model="orderDelivery">
                  <template v-slot:label> </template>
                  <v-radio
                    value="standard"
                    @click="orderDelivery = 'standard'"
                    class="mt-7"
                  >
                    <template v-slot:label>
                      <h2 class="delivery-type ml-3">
                        Standard Delivery <span class="price">9.99$</span>
                        <p class="order-delivery-date">
                          Your Order Will Be Delivered To You at
                          {{
                            new Date(
                              Date.now() + 15 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString()
                          }}
                        </p>
                      </h2>
                    </template>
                  </v-radio>

                  <v-divider :thickness="5" class="mt-7 mb-7"></v-divider>

                  <v-radio
                    value="fast"
                    @click="orderDelivery = 'fast'"
                    class="mb-7"
                  >
                    <template v-slot:label>
                      <h2 class="delivery-type ml-3">
                        Fast Delivery <span class="price">25.99$</span>
                        <p class="order-delivery-date">
                          Your Order Will Be Delivered To You at
                          {{
                            new Date(
                              Date.now() + 10 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString()
                          }}
                        </p>
                      </h2>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-sheet>

              <div class="d-flex justify-center mt-15">
                <v-btn class="continue-button" @click="step++">Continue</v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
  name: "orderCheckout",

  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),
      step: 1,

      // STEP : 1
      name: "" as string,
      email: "" as string,
      streetAddress: "" as string,
      apt: "" as string,
      city: "" as string,
      zip: "" as string,
      country: "" as string,
      phoneNumber: "" as string,

      // STEP : 2
      orderDelivery: "",
    };
  },

  computed: {
    totalOrderAmount() {
      return this.cart.reduce((acc: number, book: Book) => {
        return acc + book.price;
      }, 0);
    },
    isUserLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
  },
});
</script>

<style scoped>
.back-button {
  font-family: "Bitter", serif;
  position: absolute;
  top: 130px;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #283618;
  color: white;
  font-size: 31px;
}
.back-button:hover {
  cursor: pointer;
}

.checkout-container {
  width: 100%;
  height: auto;
  background-color: #fefae0;
}

.shipping-details-sheet {
  width: 100%;
  display: flex;
  margin-top: 130px;
  flex-direction: column;
}

.order-summary-sheet {
  width: 100%;
  height: auto;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
}

.order-delivery-sheet {
  width: 100%;
  height: auto;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
}

.shipping-header {
  font-family: "Bitter", serif;
  font-size: 45px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #283618;
}

.input-label {
  margin-left: 60px;
  font-family: "Bitter", serif;
  font-weight: 400;
}

.input-field {
  border: 3px solid rgb(185, 181, 181);
  border-radius: 0px;
  width: 88%;
  height: 70px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 100;
  color: grey;
  margin-bottom: 50px;
}

.continue-button {
  background-color: #283618;
  color: white;
  font-size: 25px;
  width: 70%;
  height: 65px;
  border-radius: 0px;
}

.summary-header {
  font-size: 35px;
  font-weight: 450;
  padding: 10px 20px;
}

.book-image {
  width: 80%;
  height: 100%;
}

.book-title {
  margin-top: 30px;
  font-size: 28px;
}

.customize-char-text {
  font-size: 23px;
  font-weight: 100;
  margin-top: 15px;
  color: rgb(16, 16, 143);
}

.book-price {
  margin-top: 15px;
  font-weight: bold;
}

.coupon-label {
  margin-top: 70px;
  font-size: 38px;
  font-weight: bold;
}

.coupon-field {
  border: 3px solid rgb(185, 181, 181);
  border-radius: 50px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  width: 100%;
  height: 70px;
  padding-left: 40px;
  font-size: 30px;
  font-size: 23px;
  font-weight: 100;
  color: grey;
  margin-bottom: 50px;
}

.validate-coupon-container {
  border: 3px solid rgb(185, 181, 181);
  height: 70px;
  width: 100%;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  color: #283618;
  font-size: 30px;
}

.validate-coupon-icon {
  transition: 0.2s ease-in-out;
}
.validate-coupon-icon:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.order-amount {
  margin-left: 200px;
  font-size: 30px;
  font-weight: bold;
  color: rgb(16, 16, 143);
}

.order-delivery-sheet {
  font-family: "Bitter", serif;
}

.order-delivery-date {
  font-size: 17px;
  font-weight: 400;
  margin-top: 10px;
}

.delivery-type {
  font-size: 30px;
  font-weight: bold;
}

.price {
  position: absolute;
  right: 80px;
}

@media (max-width: 600px) {
  .price {
    position: relative;
    right: 0;
  }
}
</style>
