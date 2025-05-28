<template>
  <v-container fluid class="checkout-container">
    <v-row>
      <v-col>
        <!-- Progress indicator -->
        <div
          class="back-button d-flex justify-center"
          @click="goToPreviousStep"
        >
          <div class="current-step">
            <span :style="{ fontWeight: step === 1 ? 'bold' : 200 }">
              Shipping Details
            </span>
            &nbsp;>&nbsp;
            <span :style="{ fontWeight: step === 2 ? 'bold' : 200 }">
              Delivery
            </span>
            &nbsp;>&nbsp;
            <span :style="{ fontWeight: step === 3 ? 'bold' : 200 }">
              Review & Pay
            </span>
          </div>
        </div>

        <!-- Step 1 - Shipping Details -->
        <CheckoutStep1
          v-if="step === 1"
          :cart="cart"
          :shipping-data="shippingData"
          :coupon-data="couponData"
          @update-shipping="updateShippingData"
          @update-coupon="updateCouponData"
          @next-step="goToStep2"
        />

        <!-- Step 2 - Delivery -->
        <CheckoutStep2
          v-if="step === 2"
          :delivery-data="deliveryData"
          @update-delivery="updateDeliveryData"
          @next-step="goToStep3"
        />

        <!-- Step 3 - Review & Pay -->
        <CheckoutStep3
          v-if="step === 3"
          :cart="cart"
          :shipping-data="shippingData"
          :delivery-data="deliveryData"
          :coupon-data="couponData"
          @edit-shipping="step = 1"
          @edit-delivery="step = 2"
          @order-placed="handleOrderPlaced"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CheckoutStep1 from "./CheckoutStep1.vue";
import CheckoutStep2 from "./CheckoutStep2.vue";
import CheckoutStep3 from "./CheckoutStep3.vue";

export default defineComponent({
  name: "CheckoutContainer",
  components: {
    CheckoutStep1,
    CheckoutStep2,
    CheckoutStep3,
  },

  data() {
    return {
      step: 1,
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),

      // Shared state for all steps
      shippingData: {
        name: "",
        email: "",
        streetAddress: "",
        apt: "",
        city: "",
        zip: "",
        country: "",
        phoneNumber: "",
      },

      deliveryData: {
        type: "",
        price: 0,
        estimatedDate: "",
      },

      couponData: {
        code: "",
        isValid: false,
        discount: 0,
      },
    };
  },

  methods: {
    goToPreviousStep() {
      if (this.step > 1) {
        this.step--;
      }
    },

    goToStep2() {
      this.step = 2;
    },

    goToStep3() {
      this.step = 3;
    },

    updateShippingData(data: any) {
      this.shippingData = { ...this.shippingData, ...data };
    },

    updateDeliveryData(data: any) {
      this.deliveryData = { ...this.deliveryData, ...data };
    },

    updateCouponData(data: any) {
      this.couponData = { ...this.couponData, ...data };
    },

    handleOrderPlaced() {
      // Clear cart and reset state
      localStorage.removeItem("cart");
      this.cart = [];
      this.step = 1;
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

.current-step {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.checkout-container {
  width: 100%;
  height: auto;
  background-color: #fefae0;
}

@media (max-width: 600px) {
  .back-button {
    font-size: 24px;
  }
}
</style>
