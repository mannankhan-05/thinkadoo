<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="8" md="8" sm="10" xs="12">
        <!-- Review & Payment Sheet -->
        <v-sheet class="review-payment-sheet">
          <div class="shipping-header">
            <v-icon class="ml-8">mdi-credit-card-outline</v-icon>
            <span class="ml-3">Review & Payment</span>
          </div>

          <v-divider :thickness="5" class="mb-8"></v-divider>

          <v-row>
            <!-- Left Column - Order Review -->
            <v-col cols="12" lg="6" md="6" sm="12">
              <!-- Shipping Information Review -->
              <div class="review-section">
                <h2 class="review-section-title">
                  <v-icon class="mr-2">mdi-truck-delivery</v-icon>
                  Shipping Information
                </h2>
                <div class="review-content">
                  <p>
                    <strong>{{ shippingData.name }}</strong>
                  </p>
                  <p>{{ shippingData.email }}</p>
                  <p>{{ shippingData.streetAddress }}</p>
                  <p v-if="shippingData.apt">{{ shippingData.apt }}</p>
                  <p>{{ shippingData.city }}, {{ shippingData.zip }}</p>
                  <p>{{ shippingData.country }}</p>
                  <p v-if="shippingData.phoneNumber">
                    {{ shippingData.phoneNumber }}
                  </p>
                </div>
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  @click="$emit('edit-shipping')"
                >
                  Edit
                </v-btn>
              </div>

              <v-divider class="my-6"></v-divider>

              <!-- Delivery Information Review -->
              <div class="review-section">
                <h2 class="review-section-title">
                  <v-icon class="mr-2">mdi-package-variant</v-icon>
                  Delivery Method
                </h2>
                <div class="review-content">
                  <p>
                    <strong>{{
                      deliveryData.type === "standard"
                        ? "Standard Delivery"
                        : "Fast Delivery"
                    }}</strong>
                  </p>
                  <p>${{ deliveryData.price }}</p>
                  <p>Estimated delivery: {{ deliveryData.estimatedDate }}</p>
                </div>
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  @click="$emit('edit-delivery')"
                >
                  Edit
                </v-btn>
              </div>

              <v-divider class="my-6"></v-divider>

              <!-- Order Items Review -->
              <div class="review-section">
                <h2 class="review-section-title">
                  <v-icon class="mr-2">mdi-book-multiple</v-icon>
                  Order Items
                </h2>
                <div class="order-items-review">
                  <div
                    v-for="book in cart"
                    :key="book.id"
                    class="order-item-review"
                  >
                    <div class="d-flex align-center">
                      <img :src="book.image" alt="" class="review-book-image" />
                      <div class="ml-4">
                        <h3 class="book-title-review">{{ book.title }}</h3>
                        <p class="book-price-review">${{ book.price }} USD</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>

            <!-- Right Column - Payment -->
            <v-col cols="12" lg="6" md="6" sm="12">
              <!-- Payment Method Selection -->
              <div class="payment-section">
                <h2 class="review-section-title">
                  <v-icon class="mr-2">mdi-credit-card</v-icon>
                  Payment Method
                </h2>

                <v-radio-group v-model="paymentMethod" class="payment-methods">
                  <v-radio value="COD" class="payment-option">
                    <template v-slot:label>
                      <div class="payment-method-label">
                        <v-icon class="mr-2">mdi-cash</v-icon>
                        Cash On Delivery
                      </div>
                    </template>
                  </v-radio>

                  <v-radio value="credit_card" class="payment-option">
                    <template v-slot:label>
                      <div class="payment-method-label">
                        <v-icon class="mr-2">mdi-credit-card</v-icon>
                        Credit/Debit Card
                      </div>
                    </template>
                  </v-radio>

                  <v-radio value="bank_transfer" class="payment-option">
                    <template v-slot:label>
                      <div class="payment-method-label">
                        <v-icon class="mr-2">mdi-bank</v-icon>
                        Bank Transfer
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>

                <!-- Credit Card Form -->
                <div
                  v-if="paymentMethod === 'credit_card'"
                  class="credit-card-form"
                >
                  <h3 class="form-subtitle">Card Information</h3>

                  <div class="card-input-group">
                    <label class="card-label">Card Number</label>
                    <input
                      class="card-input"
                      type="text"
                      v-model="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      maxlength="19"
                      @input="formatCardNumber"
                    />
                  </div>

                  <div class="d-flex">
                    <div class="card-input-group mr-4" style="flex: 1">
                      <label class="card-label">Expiry Date</label>
                      <input
                        class="card-input"
                        type="text"
                        v-model="expiryDate"
                        placeholder="MM/YY"
                        maxlength="5"
                        @input="formatExpiryDate"
                      />
                    </div>

                    <div class="card-input-group" style="flex: 1">
                      <label class="card-label">CVV</label>
                      <input
                        class="card-input"
                        type="text"
                        v-model="cvv"
                        placeholder="123"
                        maxlength="4"
                      />
                    </div>
                  </div>

                  <div class="card-input-group">
                    <label class="card-label">Cardholder Name</label>
                    <input
                      class="card-input"
                      type="text"
                      v-model="cardholderName"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <!-- Bank Transfer Info -->
                <div
                  v-if="paymentMethod === 'bank_transfer'"
                  class="payment-info"
                >
                  <p class="payment-description">
                    Bank transfer details will be provided after order
                    confirmation. Your order will be processed once payment is
                    received.
                  </p>
                </div>
              </div>

              <v-divider class="my-6"></v-divider>

              <!-- Order Total -->
              <div class="final-total-section">
                <h2 class="review-section-title">Order Summary</h2>
                <div class="total-breakdown">
                  <div class="total-line">
                    <span>Subtotal:</span>
                    <span>${{ totalOrderAmount.toFixed(2) }}</span>
                  </div>
                  <div class="total-line">
                    <span>Delivery:</span>
                    <span>${{ deliveryData.price.toFixed(2) }}</span>
                  </div>
                  <div
                    v-if="couponData.isValid"
                    class="total-line discount-line"
                  >
                    <span>Discount (10%):</span>
                    <span>-${{ (totalOrderAmount * 0.1).toFixed(2) }}</span>
                  </div>
                  <v-divider class="my-3"></v-divider>
                  <div class="total-line final-total">
                    <span><strong>Total:</strong></span>
                    <span
                      ><strong>${{ finalTotal.toFixed(2) }}</strong></span
                    >
                  </div>
                </div>
              </div>

              <!-- Place Order Button -->
              <div class="d-flex justify-center mt-8 mb-8">
                <v-btn
                  class="place-order-button"
                  @click="placeOrder"
                  :loading="isProcessingOrder"
                  :disabled="!isPaymentValid"
                >
                  <v-icon class="mr-2">mdi-lock</v-icon>
                  Place Order - ${{ finalTotal.toFixed(2) }}
                </v-btn>
              </div>

              <!-- Security Notice -->
              <div class="security-notice">
                <v-icon class="mr-2" size="small">mdi-shield-check</v-icon>
                <span>Your payment information is secure and encrypted</span>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Order Success Dialog -->
    <v-dialog v-model="orderSuccessDialog" max-width="500" persistent>
      <v-card class="text-center pa-6">
        <v-icon color="success" size="64" class="mb-4">mdi-check-circle</v-icon>
        <h2 class="mb-4">Order Placed Successfully!</h2>
        <p class="mb-4">
          Thank you for your order. You will receive a confirmation email
          shortly.
        </p>
        <p class="mb-6"><strong>Order ID:</strong> {{ orderConfirmationId }}</p>
        <v-btn color="primary" @click="goToOrderTracking">
          Track Your Order
        </v-btn>
      </v-card>
    </v-dialog>
  </v-container>
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
  name: "CheckoutStep3",

  props: {
    cart: {
      type: Array as () => Book[],
      required: true,
    },
    shippingData: {
      type: Object,
      required: true,
    },
    deliveryData: {
      type: Object,
      required: true,
    },
    couponData: {
      type: Object,
      required: true,
    },
  },

  emits: ["edit-shipping", "edit-delivery"],

  data() {
    return {
      // Payment data
      paymentMethod: "credit_card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",

      // Order processing
      isProcessingOrder: false,
      orderSuccessDialog: false,
      orderConfirmationId: "",
    };
  },

  computed: {
    totalOrderAmount() {
      return this.cart.reduce((acc: number, book: Book) => {
        return acc + book.price;
      }, 0);
    },

    finalTotal() {
      let total = this.totalOrderAmount + this.deliveryData.price;
      if (this.couponData.isValid) {
        total = total * 0.9; // 10% discount
      }
      return total;
    },

    isPaymentValid() {
      if (this.paymentMethod === "credit_card") {
        return (
          this.cardNumber && this.expiryDate && this.cvv && this.cardholderName
        );
      }
      return true; // PayPal and bank transfer don't need validation here
    },
  },

  methods: {
    formatCardNumber() {
      // Remove all non-digits
      let value = this.cardNumber.replace(/\D/g, "");
      // Add spaces every 4 digits
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
      this.cardNumber = value;
    },

    formatExpiryDate() {
      // Remove all non-digits
      let value = this.expiryDate.replace(/\D/g, "");
      // Add slash after 2 digits
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      this.expiryDate = value;
    },

    async placeOrder() {
      this.isProcessingOrder = true;

      try {
        const orderData = {
          // Customer information
          userName: this.shippingData.name,
          userEmail: this.shippingData.email,
          userAddress: this.shippingData.streetAddress,
          userApt: this.shippingData.apt,
          city: this.shippingData.city,
          zip: this.shippingData.zip,
          country: this.shippingData.country,
          userPhone: this.shippingData.phoneNumber,

          // Order details
          orderPrice: this.finalTotal,
          deliveryType: this.deliveryData.type,
          deliveryPrice: this.deliveryData.price,
          estimatedDelivery: this.deliveryData.estimatedDate,
          status: "pending",

          // Items
          items: this.cart,

          // Payment
          paymentMethod: this.paymentMethod,

          // Coupon
          couponCode: this.couponData.isValid ? this.couponData.code : null,
          discount: this.couponData.isValid ? this.totalOrderAmount * 0.1 : 0,
        };

        // Creating order
        let response = await axiosInstance.post("/createOrder", {
          userName: orderData.userName,
          userEmail: orderData.userEmail,
          userAddress: orderData.userAddress,
          userApt: orderData.userApt,
          city: orderData.city,
          zip: orderData.zip,
          country: orderData.country,
          userPhone: orderData.userPhone,
          orderPrice: orderData.orderPrice,
          deliveryType: orderData.deliveryType,
          status: orderData.status,
        });

        // Get the created order ID
        this.orderConfirmationId = response.data;

        // Create order items
        for (let i = 0; i < this.cart.length; i++) {
          await axiosInstance.post("/addItemToOrder", {
            orderId: this.orderConfirmationId,
            bookId: this.cart[i].id,
          });
        }

        // Show success dialog
        this.orderSuccessDialog = true;
      } catch (error) {
        console.error("Error placing order:", error);
        alert("There was an error placing your order. Please try again.");
      } finally {
        this.isProcessingOrder = false;
      }
    },

    goToOrderTracking() {
      this.orderSuccessDialog = false;
      localStorage.removeItem("cart");
      this.$router.push({
        name: "trackOrder",
        params: { orderId: this.orderConfirmationId },
      });
    },
  },
});
</script>

<style scoped>
.review-payment-sheet {
  width: 100%;
  display: flex;
  margin-top: 130px;
  flex-direction: column;
  padding: 20px;
}

.shipping-header {
  font-family: "Bitter", serif;
  font-size: 45px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #283618;
}

.review-section {
  margin-bottom: 24px;
}

.review-section-title {
  font-family: "Bitter", serif;
  font-size: 24px;
  font-weight: bold;
  color: #283618;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.review-content {
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.review-content p {
  margin: 4px 0;
  font-size: 16px;
}

.order-items-review {
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}

.order-item-review {
  margin-bottom: 16px;
}

.order-item-review:last-child {
  margin-bottom: 0;
}

.review-book-image {
  width: 60px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.book-title-review {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.book-price-review {
  font-size: 16px;
  color: #283618;
  font-weight: bold;
  margin: 4px 0 0 0;
}

.payment-section {
  margin-bottom: 24px;
}

.payment-methods {
  margin: 16px 0;
}

.payment-option {
  margin-bottom: 12px;
}

.payment-method-label {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
}

.credit-card-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 16px;
}

.form-subtitle {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #283618;
}

.card-input-group {
  margin-bottom: 16px;
}

.card-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #283618;
}

.card-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.card-input:focus {
  outline: none;
  border-color: #283618;
}

.payment-info {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 16px;
}

.payment-description {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.final-total-section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.total-breakdown {
  margin-top: 16px;
}

.total-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 16px;
}

.discount-line {
  color: #28a745;
}

.final-total {
  font-size: 20px;
  color: #283618;
}

.place-order-button {
  background-color: #283618;
  color: white;
  font-size: 20px;
  width: 100%;
  height: 65px;
  border-radius: 8px;
}

.security-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
  margin-top: 16px;
}

@media (max-width: 600px) {
  .shipping-header {
    font-size: 32px;
  }

  .review-section-title {
    font-size: 20px;
  }

  .place-order-button {
    font-size: 18px;
  }
}
</style>
