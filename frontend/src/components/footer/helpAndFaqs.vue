<template>
  <v-container fluid class="help-container pa-0">
    <!-- Hero Section -->
    <v-row no-gutters class="hero-section">
      <v-col cols="12" class="text-center py-16">
        <h1 class="page-heading">HELP & FAQS</h1>
        <p class="page-description">
          Find answers to common questions and get the help you need
        </p>
      </v-col>
    </v-row>

    <!-- FAQ Categories -->
    <v-container class="py-8">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="section-heading">FREQUENTLY ASKED QUESTIONS</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3" class="mb-6">
          <v-list class="category-list">
            <v-list-item
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="{ 'active-category': selectedCategory === category }"
              class="category-item"
            >
              <v-list-item-title>{{ category }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="9">
          <v-expansion-panels class="faq-panels">
            <v-expansion-panel
              v-for="faq in filteredFaqList"
              :key="faq.id"
              class="faq-panel"
            >
              <v-expansion-panel-title class="faq-question">
                {{ faq.question }}
              </v-expansion-panel-title>
              <v-expansion-panel-text class="faq-answer">
                {{ faq.answer }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>

    <!-- Contact Section -->
    <v-row no-gutters class="contact-section py-16">
      <v-col cols="12" class="text-center">
        <h2 class="contact-heading mb-6">STILL NEED HELP?</h2>
        <p class="contact-description mb-8">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <v-btn class="contact-btn" x-large @click="contactSupport">
          Contact Support
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelpAndFaqs",

  data() {
    return {
      searchQuery: "",
      selectedCategory: "All",
      categories: [
        "All",
        "Orders",
        "Shipping",
        "Returns",
        "Account",
        "Payment",
      ],

      faqs: [
        {
          id: 1,
          category: "Orders",
          question: "How do I place an order?",
          answer:
            "You can place an order by browsing our book collection, adding items to your cart, and proceeding to checkout. Follow the simple steps to complete your purchase.",
        },
        {
          id: 2,
          category: "Orders",
          question: "Can I modify my order after placing it?",
          answer:
            "Orders can be modified within 2 hours of placement. Please contact our support team immediately if you need to make changes.",
        },
        {
          id: 3,
          category: "Shipping",
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.",
        },
        {
          id: 4,
          category: "Shipping",
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.",
        },
        {
          id: 5,
          category: "Returns",
          question: "What is your return policy?",
          answer:
            "We accept returns within 30 days of purchase. Books must be in original condition. Please see our Return Policy page for full details.",
        },
        {
          id: 6,
          category: "Account",
          question: "How do I create an account?",
          answer:
            "Click on 'Sign Up' in the top right corner of our website and fill in your details. You'll receive a confirmation email to activate your account.",
        },
        {
          id: 7,
          category: "Payment",
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely.",
        },
      ],
    };
  },

  computed: {
    filteredFaqList() {
      let filtered = this.faqs;

      if (this.selectedCategory !== "All") {
        filtered = filtered.filter(
          (faq) => faq.category === this.selectedCategory
        );
      }

      if (this.searchQuery) {
        filtered = filtered.filter(
          (faq) =>
            faq.question
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },
  },

  methods: {
    contactSupport() {
      // Implement contact support functionality
      console.log("Contacting support...");
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap");

.help-container {
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
  max-width: 600px;
  margin: 0 auto;
}

.search-section {
  background-color: #fefae0;
}

.search-input >>> .v-field__outline {
  color: #283618 !important;
}

.section-heading {
  font-family: "Lilita One", serif;
  font-size: 32px;
  color: #283618;
}

.category-list {
  background-color: #e7e2bf;
  border-radius: 8px;
}

.category-item {
  color: #283618;
  font-weight: 500;
  border-radius: 4px;
  margin: 4px;
}

.active-category {
  background-color: #283618 !important;
  color: white !important;
  border-radius: 4px !important;
}

.faq-panels {
  background-color: transparent;
}

.faq-panel {
  background-color: white;
  margin-bottom: 8px;
  border-radius: 8px;
}

.faq-question {
  color: #283618;
  font-weight: 600;
}

.faq-answer {
  color: #283618;
  opacity: 0.8;
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
  /* padding: 12px 12px 30px 30px !important; */
}

@media (max-width: 960px) {
  .page-heading {
    font-size: 35px;
  }
}
</style>
