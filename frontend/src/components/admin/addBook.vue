<template>
  <v-container fluid class="container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <!-- Back Button -->
        <v-icon class="back-button" @click="() => this.$router.go(-1)"
          >mdi-keyboard-backspace</v-icon
        >

        <v-sheet class="sheet" :elevation="1">
          <h1 class="heading">Add New Book</h1>
          <div class="form">
            <h1 class="email-label">Title</h1>
            <div class="d-flex justify-center">
              <input class="email-input" clearable v-model="title" />
            </div>
            <h1 class="email-label">Picture</h1>
            <div class="d-flex justify-center">
              <v-file-input
                name="bookImage"
                variant="outlined"
                required
                v-model="picture"
                @change="handleFileChange($event)"
                class="email-input mb-4"
              >
                <template v-slot:selection="{ text }">
                  <v-avatar v-if="imageUrl" size="30" class="mr-3 rounded">
                    <img :src="imageUrl" alt="Selected Image" />
                  </v-avatar>
                  {{ text }}
                </template>
              </v-file-input>
            </div>
            <h1 class="email-label">Description</h1>
            <div class="d-flex justify-center">
              <input
                class="email-input"
                clearable
                variant="outlined"
                v-model="description"
              />
            </div>
            <h1 class="email-label">Price</h1>
            <div class="d-flex justify-center">
              <input
                class="email-input"
                clearable
                variant="outlined"
                v-model="price"
              />
            </div>
            <div class="mt-10 mb-15 button-container">
              <v-btn class="button mt-10 mb-10" @click="addNewBook"
                >Add New Book</v-btn
              >
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../../api/axiosInstance";

export default defineComponent({
  name: "addBook",

  data() {
    return {
      title: "" as string,
      picture: "" as string,
      imageUrl: "" as string,
      description: "" as string,
      price: 0 as number,
    };
  },
  methods: {
    async addNewBook() {
      if (!this.title || !this.picture || !this.description || !this.price) {
        return;
      }
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("bookImage", this.picture);
      formData.append("description", this.description);
      formData.append("price", this.price != null ? this.price.toString() : "");

      await axiosInstance.post("/addBook", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      this.title = "";
      this.price = 0;
      this.description = "";
      this.picture = "";
      this.imageUrl = "";
    },
    handleFileChange(event: any) {
      // User selects file → event triggered → extract file → check if valid → create preview URL → show preview
      const file = event.target.files[0];
      if (file && file instanceof File) {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.imageUrl = "";
      }
    },
  },
});
</script>

<style scoped>
.email-input {
  width: 92%;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
