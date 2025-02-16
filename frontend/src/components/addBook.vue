<template>
  <v-container>
    <div class="form">
      <v-text-field
        clearable
        label="Title"
        variant="outlined"
        v-model="title"
      ></v-text-field>
      <v-file-input
        name="bookImage"
        label="Picture"
        variant="outlined"
        required
        v-model="picture"
        @change="handleFileChange($event)"
        class="mb-4"
      >
        <template v-slot:selection="{ text }">
          <v-avatar v-if="imageUrl" size="30" class="mr-3 rounded">
            <img :src="imageUrl" alt="Selected Image" />
          </v-avatar>
          {{ text }}
        </template>
      </v-file-input>
      <v-text-field
        clearable
        label="Description"
        variant="outlined"
        v-model="description"
      ></v-text-field>
      <v-text-field
        clearable
        label="Price"
        variant="outlined"
        v-model="price"
      ></v-text-field>
      <v-btn @click="addNewBook">Add New Book</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

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
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("bookImage", this.picture);
      formData.append("description", this.description);
      formData.append("price", this.price != null ? this.price.toString() : "");

      await axios.post("http://localhost:5000/addBook", formData, {
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

<style></style>
