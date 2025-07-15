<template>
  <v-container fluid class="story-container pa-0">
    <!-- Hero Section -->
    <v-row no-gutters class="hero-section">
      <v-col cols="12" class="text-center py-16">
        <h1 class="page-heading">OUR STORY</h1>
        <p class="page-description">
          Discover the journey behind our passion for bringing meaningful
          stories to families everywhere
        </p>
      </v-col>
    </v-row>

    <!-- Mission Section -->
    <v-container class="py-12">
      <v-row align="center">
        <v-col cols="12" md="6" class="mb-6">
          <div class="mission-content">
            <h2 class="section-heading mb-6">OUR MISSION</h2>
            <p class="mission-text mb-4">
              At the heart of our story is a simple belief: books have the power
              to bring people together, create lasting memories, and celebrate
              the bonds that matter most.
            </p>
            <p class="mission-text mb-4">
              We curate stories that celebrate love, family, and everyday heroes
              because we believe these are the stories that shape us, inspire
              us, and remind us of what truly matters.
            </p>
            <p class="mission-text">
              Every book we choose is selected with care, ensuring it
              contributes to building stronger connections between readers and
              their loved ones.
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="text-center">
          <v-img
            src="/placeholder.svg?height=400&width=500"
            alt="Our Mission"
            class="mission-image rounded-lg"
            max-width="500"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!-- Values Section -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="section-heading">OUR VALUES</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="value in values"
          :key="value.title"
          cols="12"
          md="4"
          class="mb-6"
        >
          <v-card class="value-card h-100" elevation="2">
            <v-card-text class="text-center pa-8">
              <v-icon size="60" :color="value.color" class="mb-4">{{
                value.icon
              }}</v-icon>
              <h3 class="value-title mb-4">{{ value.title }}</h3>
              <p class="value-description">{{ value.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Team Section -->
    <v-row no-gutters class="team-section py-12">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="section-heading">MEET OUR TEAM</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="member in team"
            :key="member.name"
            cols="12"
            sm="6"
            md="3"
            class="mb-6"
          >
            <div class="team-card text-center">
              <v-img
                :src="member.image"
                alt="Team Member"
                class="team-image rounded-circle mx-auto mb-4"
                width="150"
                height="150"
              ></v-img>
              <h3 class="team-name">{{ member.name }}</h3>
              <p class="team-role">{{ member.role }}</p>
              <p class="team-description">{{ member.description }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <!-- Contact Section -->
    <v-row no-gutters class="contact-section py-16">
      <v-col cols="12" class="text-center">
        <h2 class="contact-heading mb-6">JOIN OUR STORY</h2>
        <p class="contact-description mb-8">
          Be part of our mission to bring meaningful stories to families
          everywhere. Subscribe to our newsletter and stay connected with our
          journey.
        </p>
        <v-btn class="contact-btn" x-large @click="joinNewsletter">
          Subscribe Now
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OurStory",

  data() {
    return {
      values: [
        {
          title: "FAMILY FIRST",
          description:
            "We believe in the power of family bonds and choose stories that strengthen these connections.",
          icon: "mdi-heart",
          color: "#283618",
        },
        {
          title: "QUALITY CURATION",
          description:
            "Every book is carefully selected for its ability to inspire, educate, and entertain.",
          icon: "mdi-star",
          color: "#283618",
        },
        {
          title: "INCLUSIVE STORIES",
          description:
            "We celebrate diversity and ensure our collection represents all families and experiences.",
          icon: "mdi-account-group",
          color: "#283618",
        },
      ],

      team: [
        {
          name: "Sarah Johnson",
          role: "Founder & CEO",
          description:
            "Passionate about bringing families together through storytelling.",
          image: "/placeholder.svg?height=150&width=150",
        },
        {
          name: "Michael Chen",
          role: "Head of Curation",
          description:
            "Expert in children's literature with 15 years of experience.",
          image: "/placeholder.svg?height=150&width=150",
        },
        {
          name: "Emma Roberts",
          role: "Community Manager",
          description:
            "Dedicated to building connections within our reading community.",
          image: "/placeholder.svg?height=150&width=150",
        },
        {
          name: "David Wilson",
          role: "Operations Director",
          description:
            "Ensures every book reaches families safely and on time.",
          image: "/placeholder.svg?height=150&width=150",
        },
      ],
    };
  },

  methods: {
    joinNewsletter() {
      console.log("Joining newsletter...");
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap");

.story-container {
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

.mission-content {
  padding: 2rem;
}

.mission-text {
  font-size: 16px;
  color: #283618;
  opacity: 0.8;
  line-height: 1.6;
}

.mission-image {
  border: 4px solid #283618;
}

.value-card {
  background-color: white;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-title {
  font-family: "Lilita One", serif;
  font-size: 20px;
  color: #283618;
}

.value-description {
  color: #283618;
  opacity: 0.8;
}

.team-section {
  background-color: #e7e2bf;
}

.team-card {
  padding: 2rem;
}

.team-image {
  border: 3px solid #283618;
}

.team-name {
  font-family: "Lilita One", serif;
  font-size: 20px;
  color: #283618;
  margin-bottom: 0.5rem;
}

.team-role {
  font-weight: 600;
  color: #283618;
  margin-bottom: 0.5rem;
}

.team-description {
  color: #283618;
  opacity: 0.8;
  font-size: 14px;
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
}
</style>
