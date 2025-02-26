<template>
  <v-container fluid class="addBook-container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="6" sm="10" xs="12">
        <v-sheet class="addBook-sheet" :elevation="1">
          <h1 class="addBook-heading">Add New Book</h1>
          <div class="form">
            <h1 class="email-label">Title</h1>
            <div class="d-flex justify-center">
              <v-text-field
                class="email-input"
                clearable
                variant="outlined"
                v-model="title"
              ></v-text-field>
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
              <v-text-field
                class="email-input"
                clearable
                variant="outlined"
                v-model="description"
              ></v-text-field>
            </div>
            <h1 class="email-label">Price</h1>
            <div class="d-flex justify-center">
              <v-text-field
                class="email-input"
                clearable
                variant="outlined"
                v-model="price"
              ></v-text-field>
            </div>
            <div
              class="mt-10 mb-10 addBook-button-container d-flex flex-column justify-center align-center"
            >
              <v-btn
                class="addBook-button"
                @click="addNewBook"
                :disabled="!title || !picture || !description || !price"
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

<style scoped>
.addBook-container {
  width: 100%;
  height: 1300px;
  background-color: #fefae0;
}

.addBook-sheet {
  width: 100%;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
}

.addBook-heading {
  display: flex;
  justify-content: center;
  font-size: 55px;
  margin-top: 20px;
}

.email-input {
  width: 92%;
  margin-left: 30px;
  margin-right: 30px;
}

.email-label {
  margin-top: 40px;
  margin-left: 30px;
  font-weight: 400;
}

.addBook-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.addBook-button {
  width: 92%;
  height: 70px;
  display: flex;
  justify-content: center;
  background-color: #283618;
  font-size: 35px;
  color: white;
  border-radius: 150px;
  transition: 0.3s ease-in-out;
}
.addBook-button:hover {
  background-color: #fefae0;
  color: #405f1c;
}
</style>
