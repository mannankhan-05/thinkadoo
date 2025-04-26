<template>
  <v-container class="lovedbyyou-books-container" fluid>
    <h1 class="lovedbyyou-book-heading">Loved By You</h1>

    <!-- Continuous horizontal scrolling carousel -->
    <div class="scrolling-carousel-container" ref="carouselContainer">
      <div
        class="scrolling-carousel"
        ref="scrollingCarousel"
        @mouseenter="pauseScroll"
        @mouseleave="resumeScroll"
      >
        <!-- First copy of books for seamless looping -->
        <div
          class="book-card-wrapper"
          v-for="book in lovedByYouBooks"
          :key="`first-${book.id}`"
        >
          <v-card :elevation="0" class="lovedbyyou-book-card">
            <div class="book-image-container">
              <v-img class="book-image" :src="book.image"></v-img>
              <v-btn class="buy-now-btn" @click="pushToSingleBookPage(book.id)"
                >Buy Now</v-btn
              >
              <v-rating
                class="prduct-rating"
                hover
                readonly
                :length="5"
                :size="32"
                :model-value="5"
                color="orange"
                active-color="orange"
                empty-icon="mdi-heart-outline"
                half-icon="mdi-heart-half-full"
                full-icon="mdi-heart"
              />
              <div class="book-title-container">
                <h1 class="ml-3 mt-3">{{ book.title }}</h1>
                <h3 class="book-description ml-3">{{ book.description }}</h3>
              </div>
            </div>
          </v-card>
        </div>

        <!-- Duplicate set of books to create seamless loop -->
        <div
          class="book-card-wrapper"
          v-for="book in lovedByYouBooks"
          :key="`second-${book.id}`"
        >
          <v-card :elevation="0" class="lovedbyyou-book-card">
            <div class="book-image-container">
              <v-img class="book-image" :src="book.image"></v-img>
              <v-btn class="buy-now-btn" @click="pushToSingleBookPage(book.id)"
                >Buy Now</v-btn
              >
              <v-rating
                class="prduct-rating"
                hover
                readonly
                :length="5"
                :size="32"
                :model-value="5"
                color="orange"
                active-color="orange"
                empty-icon="mdi-heart-outline"
                half-icon="mdi-heart-half-full"
                full-icon="mdi-heart"
              />
              <div class="book-title-container">
                <h1 class="ml-3 mt-3">{{ book.title }}</h1>
                <h3 class="book-description ml-3">{{ book.description }}</h3>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  name: "lovedByYouBooks",

  data() {
    return {
      lovedByYouBooks: [] as object[],
      scrollPosition: 0,
      scrollSpeed: 0.7, // Normal scrolling speed - not too fast, not too slow
      isPaused: false,
      animationId: null as number | null,
      lastTimestamp: 0,
    };
  },

  async mounted() {
    try {
      let response = await axiosInstance.get("/lovedByYouBooks");
      this.lovedByYouBooks = response.data;

      // Start the animation after a short delay to ensure DOM is ready
      setTimeout(() => {
        this.startScrollAnimation();
      }, 100);

      // Handle visibility change (tab switching)
      document.addEventListener(
        "visibilitychange",
        this.handleVisibilityChange
      );

      // Handle window resize
      window.addEventListener("resize", this.handleResize);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },

  beforeUnmount() {
    // Clean up
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    pushToSingleBookPage(bookId: number) {
      this.$router.push({ name: "singleBookPreview", params: { id: bookId } });
    },

    startScrollAnimation() {
      const carousel = this.$refs.scrollingCarousel as HTMLElement;
      if (!carousel) return;

      // Reset position if we've scrolled more than half the content
      const resetPoint = carousel.scrollWidth / 2;

      const animate = (timestamp: number) => {
        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const elapsed = timestamp - this.lastTimestamp;

        if (!this.isPaused && elapsed > 16) {
          // Cap at ~60fps
          this.lastTimestamp = timestamp;
          this.scrollPosition += this.scrollSpeed;

          // Reset position when we've scrolled far enough to create seamless loop
          if (this.scrollPosition >= resetPoint) {
            this.scrollPosition = 0;
          }

          carousel.style.transform = `translateX(-${this.scrollPosition}px)`;
        }

        this.animationId = requestAnimationFrame(animate);
      };

      this.animationId = requestAnimationFrame(animate);
    },

    pauseScroll() {
      this.isPaused = true;
    },

    resumeScroll() {
      this.isPaused = false;
    },

    handleVisibilityChange() {
      // Pause when tab is not visible
      if (document.hidden) {
        this.isPaused = true;
      }
    },

    handleResize() {
      // Reset animation on resize to prevent jumps
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      this.scrollPosition = 0;
      const carousel = this.$refs.scrollingCarousel as HTMLElement;
      if (carousel) {
        carousel.style.transform = `translateX(0)`;
      }
      this.startScrollAnimation();
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

.lovedbyyou-books-container {
  margin-top: 120px;
  margin-bottom: 120px;
  position: relative;
}

.lovedbyyou-book-heading {
  font-family: "Bitter", serif;
  margin-bottom: 20px;
  font-size: 40px;
}

@media (max-width: 600px) {
  .lovedbyyou-book-heading {
    display: flex;
    justify-content: center;
  }
}

/* Scrolling carousel container */
.scrolling-carousel-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.scrolling-carousel {
  display: flex;
  flex-wrap: nowrap;
  will-change: transform;
}

.book-card-wrapper {
  flex: 0 0 auto;
  width: 400px;
  padding: 0 15px;
}

.lovedbyyou-book-card {
  width: 100%;
  height: 660px;
  font-family: "Varela Round", serif;
  display: flex;
  justify-content: center;
  border-radius: 0;
  transition: transform 0.3s ease;
}

.lovedbyyou-book-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.book-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #dad7cd;
  width: 100%;
  padding: 20px;
  transition: all 0.3s ease;
}

.book-image {
  width: 100%;
  max-height: 380px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.book-image-container:hover .book-image {
  transform: scale(1.05);
}

.buy-now-btn {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 440px;
  bottom: 15px;
  left: 20px;
  background-color: #283618;
  color: white;
  border-radius: 25px;
  padding: 15px 40px;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.buy-now-btn:hover {
  background-color: #3a4f24;
  transform: scale(1.05);
}

.book-title-container {
  font-family: "Varela Round", serif;
  height: 130px;
  position: absolute;
  bottom: 0;
  left: 15px;
  right: 0;
}

.book-description {
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.prduct-rating {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 500px;
  bottom: 15px;
  left: 20px;
  font-size: 18px;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .book-card-wrapper {
    width: 250px;
  }
}

@media (max-width: 600px) {
  .book-card-wrapper {
    width: 220px;
  }

  .lovedbyyou-book-card {
    height: 600px;
  }

  .buy-now-btn {
    top: 400px;
    padding: 10px 30px;
    font-size: 16px;
  }

  .prduct-rating {
    top: 450px;
  }
}
</style>
