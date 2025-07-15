<template>
  <v-container fluid class="privacy-container pa-0">
    <!-- Hero Section -->
    <v-row no-gutters class="hero-section">
      <v-col cols="12" class="text-center py-16">
        <h1 class="page-heading">PRIVACY POLICY</h1>
        <p class="page-description">
          Your privacy is important to us. Learn how we collect, use, and
          protect your information.
        </p>
        <p class="last-updated">Last updated: July 2025</p>
      </v-col>
    </v-row>

    <!-- Policy Content -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="3" class="mb-6">
          <v-list class="policy-nav">
            <v-list-item
              v-for="section in sections"
              :key="section.id"
              @click="scrollToSection(section.id)"
              class="nav-item"
            >
              <v-list-item-title>{{ section.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="9">
          <div class="policy-content">
            <div
              v-for="section in sections"
              :key="section.id"
              :id="section.id"
              class="policy-section mb-8"
            >
              <h2 class="section-title mb-4">{{ section.title }}</h2>
              <div v-html="section.content" class="section-content"></div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Contact Section -->
    <v-row no-gutters class="contact-section py-16">
      <v-col cols="12" class="text-center">
        <h2 class="contact-heading mb-6">
          QUESTIONS ABOUT OUR PRIVACY POLICY?
        </h2>
        <p class="contact-description mb-8">
          If you have any questions about this Privacy Policy, please don't
          hesitate to contact us.
        </p>
        <v-btn class="contact-btn" x-large @click="contactUs">
          Contact Us
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrivacyPolicy",

  data() {
    return {
      sections: [
        {
          id: "information-collection",
          title: "Information We Collect",
          content: `
            <p>We collect information you provide directly to us, such as when you:</p>
            <ul>
              <li>Create an account or make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us for customer support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>This may include your name, email address, phone number, shipping address, and payment information.</p>
          `,
        },
        {
          id: "information-use",
          title: "How We Use Your Information",
          content: `
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send you important updates about your purchases</li>
              <li>Provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          `,
        },
        {
          id: "information-sharing",
          title: "Information Sharing",
          content: `
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li>With service providers who help us operate our business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your explicit consent</li>
            </ul>
          `,
        },
        {
          id: "data-security",
          title: "Data Security",
          content: `
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Secure server infrastructure</li>
              <li>Regular security audits</li>
              <li>Limited access to personal information</li>
            </ul>
          `,
        },
        {
          id: "cookies",
          title: "Cookies and Tracking",
          content: `
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve our website functionality</li>
            </ul>
            <p>You can control cookie settings through your browser preferences.</p>
          `,
        },
        {
          id: "your-rights",
          title: "Your Rights",
          content: `
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>Object to certain data processing activities</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided below.</p>
          `,
        },
        {
          id: "children-privacy",
          title: "Children's Privacy",
          content: `
            <p>Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>
          `,
        },
        {
          id: "policy-changes",
          title: "Changes to This Policy",
          content: `
            <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.</p>
          `,
        },
      ],
    };
  },

  methods: {
    scrollToSection(sectionId: string) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },

    contactUs() {
      console.log("Contacting for privacy questions...");
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap");

.privacy-container {
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
  margin: 0 auto 1rem;
}

.last-updated {
  font-size: 14px;
  color: #283618;
  opacity: 0.7;
  font-style: italic;
}

.policy-nav {
  background-color: #e7e2bf;
  border-radius: 8px;
  position: sticky;
  top: 20px;
}

.nav-item {
  color: #283618;
  font-weight: 500;
  border-radius: 4px;
  margin: 4px;
  cursor: pointer;
}

.nav-item:hover {
  background-color: rgba(40, 54, 24, 0.1);
}

.policy-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.policy-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 2rem;
}

.policy-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  font-family: "Lilita One", serif;
  font-size: 24px;
  color: #283618;
}

.section-content {
  color: #283618;
  opacity: 0.8;
  line-height: 1.6;
}

.section-content p {
  margin-bottom: 1rem;
}

.section-content ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.section-content li {
  margin-bottom: 0.5rem;
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

.contact-btn {
  background-color: #e7e2bf !important;
  color: #283618 !important;
  font-family: "Playwrite GB J", serif;
  font-size: 18px;
}

@media (max-width: 960px) {
  .page-heading {
    font-size: 35px;
  }

  .policy-nav {
    position: static;
  }
}
</style>
