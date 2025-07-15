<template>
  <v-container fluid class="delivery-container pa-0">
    <!-- Hero Section -->
    <v-row no-gutters class="hero-section">
      <v-col cols="12" class="text-center py-16">
        <h1 class="page-heading">DELIVERY INFORMATION</h1>
        <p class="page-description">
          Everything you need to know about our shipping and delivery options
        </p>
      </v-col>
    </v-row>

    <!-- Delivery Options -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="section-heading">SHIPPING OPTIONS</h2>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="delivery-card h-100" elevation="2">
            <v-card-text class="text-center pa-8">
              <v-icon size="60" color="#283618" class="mb-4">mdi-truck</v-icon>
              <h3 class="delivery-title mb-4">STANDARD DELIVERY</h3>
              <p class="delivery-time mb-4">3-5 Business Days</p>
              <p class="delivery-price mb-4">$4.99</p>
              <p class="delivery-description">
                Perfect for regular orders. Your books will arrive safely within
                3-5 business days.
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="mb-6">
          <v-card class="delivery-card h-100" elevation="2">
            <v-card-text class="text-center pa-8">
              <v-icon size="60" color="#283618" class="mb-4">mdi-rocket</v-icon>
              <h3 class="delivery-title mb-4">FAST DELIVERY</h3>
              <p class="delivery-time mb-4">1-2 Business Days</p>
              <p class="delivery-price mb-4">$9.99</p>
              <p class="delivery-description">
                Need your books quickly? Express delivery gets them to you in
                1-2 business days.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Delivery Areas -->
    <v-row no-gutters class="delivery-areas-section py-12">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="section-heading-white">DELIVERY AREAS</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" class="mb-6">
            <div class="area-card">
              <h3 class="area-title">DOMESTIC SHIPPING</h3>
              <p class="area-description mb-4">
                We deliver to all states and territories within the country.
              </p>
              <ul class="area-features">
                <li>Free tracking on all orders</li>
                <li>Signature required for orders over $100</li>
                <li>Safe drop-off available</li>
                <li>Weekend delivery available</li>
              </ul>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="mb-6">
            <div class="area-card">
              <h3 class="area-title">INTERNATIONAL SHIPPING</h3>
              <p class="area-description mb-4">
                We ship to over 50 countries worldwide.
              </p>
              <ul class="area-features">
                <li>7-14 business days delivery</li>
                <li>Customs duties may apply</li>
                <li>Full tracking provided</li>
                <li>Insurance included</li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <!-- Packaging Info -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="section-heading">PACKAGING & CARE</h2>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="12" md="6" class="mb-6">
          <div class="packaging-content">
            <h3 class="packaging-title mb-4">PROTECTIVE PACKAGING</h3>
            <p class="packaging-description mb-4">
              Every book is carefully packaged to ensure it arrives in perfect
              condition. We use:
            </p>
            <ul class="packaging-features">
              <li>Bubble wrap for extra protection</li>
              <li>Sturdy cardboard mailers</li>
              <li>Moisture-resistant packaging</li>
              <li>Eco-friendly materials when possible</li>
            </ul>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="text-center">
          <v-icon size="200" color="#283618">mdi-package-variant</v-icon>
        </v-col>
      </v-row>
    </v-container>

    <!-- Contact Section -->
    <v-row no-gutters class="contact-section py-16">
      <v-col cols="12" class="text-center">
        <h2 class="contact-heading mb-6">DELIVERY QUESTIONS?</h2>
        <p class="contact-description mb-8">
          Need help with your delivery? Our customer service team is here to
          assist you.
        </p>
        <v-btn class="contact-btn" x-large @click="contactSupport">
          Contact Us
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DeliveryInformation",

  methods: {
    contactSupport() {
      console.log("Contacting support for delivery questions...");
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap");

.delivery-container {
  background-color: #fefae0;
}

.hero-section {
  background-color: #e7e2bf;
}

.page-heading {
  font-family: "Lilita One", serif;
  font-size: 45px;
  color: #283618;
  margin-bottom: 1.5rem;
}

.page-description {
  font-size: 20px;
  color: #283618;
  max-width: 700px;
  margin: 0 auto;
}

.section-heading {
  font-family: "Lilita One", serif;
  font-size: 32px;
  color: #283618;
}

.section-heading-white {
  font-family: "Lilita One", serif;
  font-size: 32px;
  color: white;
}

.delivery-card {
  background-color: white;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.delivery-card:hover {
  transform: translateY(-5px);
}

.delivery-title {
  font-family: "Lilita One", serif;
  font-size: 20px;
  color: #283618;
}

.delivery-time {
  font-size: 16px;
  color: #283618;
  font-weight: 600;
}

.delivery-price {
  font-size: 24px;
  color: #283618;
  font-weight: bold;
}

.delivery-description {
  color: #283618;
  opacity: 0.8;
}

.delivery-areas-section {
  background-color: #283618;
}

.area-card {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  height: 100%;
}

.area-title {
  font-family: "Lilita One", serif;
  font-size: 20px;
  color: white;
  margin-bottom: 1rem;
}

.area-description {
  color: white;
  opacity: 0.9;
}

.area-features {
  color: white;
  opacity: 0.9;
}

.area-features li {
  margin-bottom: 0.5rem;
}

.packaging-content {
  padding: 2rem;
}

.packaging-title {
  font-family: "Lilita One", serif;
  font-size: 24px;
  color: #283618;
}

.packaging-description {
  color: #283618;
  opacity: 0.8;
  font-size: 16px;
}

.packaging-features {
  color: #283618;
  opacity: 0.8;
}

.packaging-features li {
  margin-bottom: 0.5rem;
}

.contact-section {
  background-color: #e7e2bf;
}

.contact-heading {
  font-family: "Lilita One", serif;
  font-size: 32px;
  color: #283618;
}

.contact-description {
  font-size: 18px;
  color: #283618;
  max-width: 500px;
  margin: 0 auto;
}

.contact-btn {
  background-color: #283618 !important;
  color: white !important;
  font-family: "Playwrite GB J", serif;
  font-size: 18px;
}

@media (max-width: 960px) {
  .page-heading {
    font-size: 35px;
  }
}
</style>
