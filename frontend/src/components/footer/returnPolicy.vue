<template>
  <v-container fluid class="return-container pa-0">
    <!-- Hero Section -->
    <v-row no-gutters class="hero-section">
      <v-col cols="12" class="text-center py-16">
        <h1 class="page-heading">RETURN POLICY</h1>
        <p class="page-description">
          We want you to love your books. If you're not completely satisfied,
          we're here to help.
        </p>
      </v-col>
    </v-row>

    <!-- Quick Overview -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="section-heading">RETURN OVERVIEW</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="overview-card h-100" elevation="2">
            <v-card-text class="text-center pa-8">
              <v-icon size="60" color="#283618" class="mb-4"
                >mdi-calendar-clock</v-icon
              >
              <h3 class="overview-title mb-4">30-DAY WINDOW</h3>
              <p class="overview-description">
                You have 30 days from the delivery date to return your books for
                a full refund.
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="mb-6">
          <v-card class="overview-card h-100" elevation="2">
            <v-card-text class="text-center pa-8">
              <v-icon size="60" color="#283618" class="mb-4"
                >mdi-book-open-variant</v-icon
              >
              <h3 class="overview-title mb-4">ORIGINAL CONDITION</h3>
              <p class="overview-description">
                Books must be in original, unread condition with all original
                packaging and materials.
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="mb-6">
          <v-card class="overview-card h-100" elevation="2">
            <v-card-text class="text-center pa-8">
              <v-icon size="60" color="#283618" class="mb-4"
                >mdi-cash-refund</v-icon
              >
              <h3 class="overview-title mb-4">FULL REFUND</h3>
              <p class="overview-description">
                Receive a full refund to your original payment method within 5-7
                business days.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Return Process -->
    <v-row no-gutters class="process-section py-12">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="section-heading-white">HOW TO RETURN</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="(step, index) in returnSteps"
            :key="index"
            cols="12"
            md="3"
            class="mb-6"
          >
            <div class="step-card text-center">
              <div class="step-number">{{ index + 1 }}</div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <!-- Detailed Policy -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" class="mb-8">
          <h2 class="section-heading text-center">DETAILED RETURN POLICY</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6" class="mb-6">
          <div class="policy-card">
            <h3 class="policy-title mb-4">ELIGIBLE RETURNS</h3>
            <ul class="policy-list">
              <li>Books in original, unread condition</li>
              <li>Items with original packaging and materials</li>
              <li>Returns initiated within 30 days of delivery</li>
              <li>Items not damaged by customer</li>
              <li>Books without writing, highlighting, or markings</li>
            </ul>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="mb-6">
          <div class="policy-card">
            <h3 class="policy-title mb-4">NON-RETURNABLE ITEMS</h3>
            <ul class="policy-list">
              <li>Personalized or customized books</li>
              <li>Digital downloads or e-books</li>
              <li>Items damaged by customer use</li>
              <li>Books with missing pages or components</li>
              <li>Returns initiated after 30-day window</li>
            </ul>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6" class="mb-6">
          <div class="policy-card">
            <h3 class="policy-title mb-4">RETURN SHIPPING</h3>
            <ul class="policy-list">
              <li>We provide prepaid return labels for defective items</li>
              <li>Customer pays return shipping for change of mind</li>
              <li>Use original packaging when possible</li>
              <li>Include all original materials and accessories</li>
              <li>Package securely to prevent damage in transit</li>
            </ul>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="mb-6">
          <div class="policy-card">
            <h3 class="policy-title mb-4">REFUND PROCESSING</h3>
            <ul class="policy-list">
              <li>Refunds processed within 2 business days of receipt</li>
              <li>Refund to original payment method</li>
              <li>Bank processing may take 5-7 business days</li>
              <li>Email confirmation sent when refund is processed</li>
              <li>Partial refunds for damaged returns</li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- FAQ Section -->
    <v-row no-gutters class="faq-section py-12">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="section-heading">RETURN FAQS</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8" class="mx-auto">
            <v-expansion-panels class="return-faq-panels">
              <v-expansion-panel
                v-for="faq in returnFaqs"
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
    </v-row>

    <!-- Contact Section -->
    <v-row no-gutters class="contact-section py-16">
      <v-col cols="12" class="text-center">
        <h2 class="contact-heading mb-6">NEED HELP WITH A RETURN?</h2>
        <p class="contact-description mb-8">
          Our customer service team is here to help make your return process as
          smooth as possible.
        </p>
        <div class="contact-buttons">
          <v-btn class="contact-btn mr-4" x-large @click="startReturn">
            Start Return
          </v-btn>
          <v-btn
            class="contact-btn-outline"
            x-large
            outlined
            @click="contactSupport"
          >
            Contact Support
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReturnPolicy",

  data() {
    return {
      returnSteps: [
        {
          title: "CONTACT US",
          description:
            "Email us or use our return form to initiate your return request.",
        },
        {
          title: "GET APPROVAL",
          description:
            "We'll review your request and provide return instructions and label.",
        },
        {
          title: "PACK & SHIP",
          description:
            "Pack your books securely and ship using our prepaid label.",
        },
        {
          title: "GET REFUND",
          description:
            "Receive your full refund within 5-7 business days of our receipt.",
        },
      ],

      returnFaqs: [
        {
          id: 1,
          question: "Can I return a book if I've read part of it?",
          answer:
            "Unfortunately, we can only accept returns for books in original, unread condition. This ensures the quality of books for all our customers.",
        },
        {
          id: 2,
          question: "What if my book arrived damaged?",
          answer:
            "If your book arrived damaged, please contact us immediately. We'll provide a prepaid return label and send a replacement at no cost to you.",
        },
        {
          id: 3,
          question: "How long do I have to return a book?",
          answer:
            "You have 30 days from the delivery date to initiate a return. Returns requested after this period cannot be accepted.",
        },
        {
          id: 4,
          question: "Do I have to pay for return shipping?",
          answer:
            "For defective or damaged items, we provide free return shipping. For other returns, customers are responsible for return shipping costs.",
        },
        {
          id: 5,
          question: "Can I exchange a book for a different title?",
          answer:
            "We don't offer direct exchanges. Please return the unwanted book for a refund and place a new order for the book you'd prefer.",
        },
        {
          id: 6,
          question: "When will I receive my refund?",
          answer:
            "Refunds are processed within 2 business days of receiving your return. Bank processing typically takes an additional 5-7 business days.",
        },
      ],
    };
  },

  methods: {
    startReturn() {
      console.log("Starting return process...");
    },

    contactSupport() {
      console.log("Contacting support for return help...");
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap");

.return-container {
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

.overview-card {
  background-color: white;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-5px);
}

.overview-title {
  font-family: "Lilita One", serif;
  font-size: 18px;
  color: #283618;
}

.overview-description {
  color: #283618;
  opacity: 0.8;
}

.process-section {
  background-color: #283618;
}

.step-card {
  padding: 2rem;
}

.step-number {
  width: 60px;
  height: 60px;
  background-color: #e7e2bf;
  color: #283618;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.step-title {
  font-family: "Lilita One", serif;
  font-size: 18px;
  color: white;
  margin-bottom: 1rem;
}

.step-description {
  color: white;
  opacity: 0.9;
}

.policy-card {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.policy-title {
  font-family: "Lilita One", serif;
  font-size: 20px;
  color: #283618;
}

.policy-list {
  color: #283618;
  opacity: 0.8;
}

.policy-list li {
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.faq-section {
  background-color: #e7e2bf;
}

.return-faq-panels {
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
  background-color: #283618;
}

.contact-heading {
  font-family: "Lilita One", serif;
  font-size: 32px;
  color: white;
}

.contact-description {
  font-size: 18px;
  color: white;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.contact-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.contact-btn {
  background-color: #e7e2bf !important;
  color: #283618 !important;
  font-family: "Playwrite GB J", serif;
  font-size: 18px;
}

.contact-btn-outline {
  border: 2px solid #e7e2bf !important;
  color: #e7e2bf !important;
  font-family: "Playwrite GB J", serif;
  font-size: 18px;
}

@media (max-width: 960px) {
  .page-heading {
    font-size: 35px;
  }

  .contact-buttons {
    flex-direction: column;
    align-items: center;
  }

  .contact-btn,
  .contact-btn-outline {
    width: 250px;
  }
}
</style>
