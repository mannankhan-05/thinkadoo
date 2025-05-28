<template>
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
            <input
              class="input-field"
              type="text"
              v-model="localShippingData.name"
              @input="updateShipping"
            />
          </div>

          <h1 class="input-label">Email</h1>
          <div class="d-flex justify-center">
            <input
              class="input-field"
              type="email"
              v-model="localShippingData.email"
              @input="updateShipping"
            />
          </div>

          <h1 class="input-label">Street address (or P.O. Box)</h1>
          <div class="d-flex justify-center">
            <input
              class="input-field"
              type="text"
              v-model="localShippingData.streetAddress"
              @input="updateShipping"
            />
          </div>

          <h1 class="input-label">
            Apt #, Building, etc. (leave blank if none)
          </h1>
          <div class="d-flex justify-center">
            <input
              class="input-field"
              type="text"
              v-model="localShippingData.apt"
              @input="updateShipping"
            />
          </div>

          <h1 class="input-label">Town/City</h1>
          <div class="d-flex justify-center">
            <input
              class="input-field"
              type="text"
              v-model="localShippingData.city"
              @input="updateShipping"
            />
          </div>

          <h1 class="input-label">ZIP / Postcode</h1>
          <div class="d-flex justify-center">
            <input
              class="input-field"
              type="text"
              v-model="localShippingData.zip"
              @input="updateShipping"
            />
          </div>

          <h1 class="input-label">Country</h1>
          <div class="d-flex justify-center">
            <input
              class="input-field"
              type="text"
              v-model="localShippingData.country"
              @input="updateShipping"
            />
          </div>

          <h1 class="input-label">Phone Number (optional)</h1>
          <div class="d-flex justify-center">
            <input
              class="input-field"
              type="text"
              v-model="localShippingData.phoneNumber"
              @input="updateShipping"
            />
          </div>

          <div class="continue-btn-container d-flex justify-center mt-5 mb-15">
            <v-btn class="continue-button" @click="saveShippingDetails">
              Continue to delivery
            </v-btn>
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
            <div class="book-details">
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
              <input
                v-model="localCouponData.code"
                class="coupon-field"
                type="text"
                @input="updateCoupon"
              />
            </v-col>

            <v-col cols="2">
              <div
                class="validate-coupon-container d-flex justify-center align-center"
                @click="validateCoupon"
              >
                <v-tooltip text="validate coupon">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" class="validate-coupon-icon">
                      mdi-check-decagram
                    </v-icon>
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
            <span class="order-amount amount">{{ totalOrderAmount }} USD</span>
          </h1>
        </div>

        <!-- If coupon is valid -->
        <div v-if="localCouponData.isValid">
          <v-divider :thickness="5" class="mb-5"></v-divider>

          <h1 class="ml-6 mb-5">
            After Discount
            <span class="order-amount discount">
              {{ (totalOrderAmount * 0.9).toFixed(2) }} USD
            </span>
          </h1>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../../api/axiosInstance";

interface Book {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default defineComponent({
  name: "CheckoutStep1",

  props: {
    cart: {
      type: Array as () => Book[],
      required: true,
    },
    shippingData: {
      type: Object,
      required: true,
    },
    couponData: {
      type: Object,
      required: true,
    },
  },

  emits: ["update-shipping", "update-coupon", "next-step"],

  data() {
    return {
      localShippingData: { ...this.shippingData },
      localCouponData: { ...this.couponData },
    };
  },

  computed: {
    totalOrderAmount() {
      return this.cart.reduce((acc: number, book: Book) => {
        return acc + book.price;
      }, 0);
    },
  },

  watch: {
    shippingData: {
      handler(newVal) {
        this.localShippingData = { ...newVal };
      },
      deep: true,
    },
    couponData: {
      handler(newVal) {
        this.localCouponData = { ...newVal };
      },
      deep: true,
    },
  },

  methods: {
    updateShipping() {
      this.$emit("update-shipping", this.localShippingData);
    },

    updateCoupon() {
      this.$emit("update-coupon", this.localCouponData);
    },

    async validateCoupon() {
      try {
        let response = await axiosInstance.post("validateCoupon", {
          couponCode: this.localCouponData.code,
        });

        this.localCouponData.isValid = response.data.isValid;
        this.localCouponData.discount = response.data.isValid ? 0.1 : 0;
        this.updateCoupon();
      } catch (error) {
        console.error("Error validating coupon:", error);
        this.localCouponData.isValid = false;
        this.localCouponData.discount = 0;
        this.updateCoupon();
      }
    },

    saveShippingDetails() {
      if (
        !this.localShippingData.name ||
        !this.localShippingData.email ||
        !this.localShippingData.streetAddress ||
        !this.localShippingData.city ||
        !this.localShippingData.zip ||
        !this.localShippingData.country
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      this.$emit("next-step");
    },
  },
});
</script>

<style scoped>
.shipping-details-sheet,
.order-summary-sheet {
  width: 100%;
  display: flex;
  margin-top: 130px;
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
  border-radius: 8px;
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
  font-size: 30px;
  font-weight: bold;
  color: rgb(16, 16, 143);
}

.amount {
  margin-left: 200px;
}

.discount {
  color: #476d1b;
  margin-left: 140px;
}

@media (max-width: 600px) {
  .book-details {
    margin-left: 50px;
  }

  .amount {
    margin-left: 240px;
  }

  .discount {
    margin-left: 220px;
  }
}
</style>
