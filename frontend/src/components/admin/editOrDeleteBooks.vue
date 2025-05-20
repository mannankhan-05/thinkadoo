<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xs="12"
        v-for="book in books"
        :key="book.id"
      >
        <v-card height="400" class="book-card">
          <div class="book-image-container">
            <img class="book-image" :src="book.image" alt="" />
          </div>

          <h1 class="book-title">{{ book.title }}</h1>

          <v-row class="mt-15">
            <v-col cols="6">
              <v-btn class="edit-button" @click="editBook(book.id)">
                <v-icon class="mr-2">mdi-book-edit-outline</v-icon>
                Edit</v-btn
              >
            </v-col>

            <v-col cols="6">
              <v-btn class="delete-button" @click="deleteBook(book.id)">
                <v-icon class="mr-2">mdi-delete-outline</v-icon>
                Delete</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog">
      <v-card class="edit-dialog-card">
        <h1 class="edit-book-heading">Edit Book</h1>
        <v-divider class="mt-3 mb-3"> </v-divider>

        <!-- Image -->
        <img class="image" :src="bookToEdit.image" alt="" />

        <v-form>
          <v-text-field
            label="Title"
            outlined
            class="mt-5"
            v-model="bookToEdit.title"
          ></v-text-field>
          <!-- <v-file-input label="Picture" outlined class="mt-5"></v-file-input> -->
          <v-file-input
            class="mt-5"
            clearable
            name="bookImage"
            label="Book Image"
            outlined
            prepend-icon="mdi-camera"
            v-model="bookToEdit.image"
            @change="handleFileChange($event)"
          >
            <template v-slot:selection="{ text }">
              <v-avatar v-if="imageUrl" size="30" class="mr-3 rounded">
                <img :src="imageUrl" alt="Selected Image" />
              </v-avatar>
              {{ text }}
            </template>
          </v-file-input>
          <v-text-field
            label="Description"
            outlined
            class="mt-5"
            v-model="bookToEdit.description"
          ></v-text-field>
          <v-text-field
            label="Price ($)"
            outlined
            class="mt-5"
            v-model="bookToEdit.price"
          ></v-text-field>
        </v-form>

        <v-btn class="update-button mt-10" @click="updateBook(bookToEdit.id)"
          >Update</v-btn
        >
        <v-btn class="cancel-button mt-5" @click="editDialog = false"
          >Cancel</v-btn
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../../api/axiosInstance";

interface book {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default defineComponent({
  data() {
    return {
      books: [] as object[],
      editDialog: false as boolean,
      bookToEdit: {} as book,
      imageUrl: "" as string,
    };
  },

  async mounted() {
    const response = await axiosInstance.get("/books");
    this.books = response.data.books;
  },

  methods: {
    async editBook(bookId: number) {
      this.editDialog = true;

      // Fetch book details
      const response = await axiosInstance.get(`/book/${bookId}`);
      //   this.bookToEdit = response.data;

      this.bookToEdit = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        price: response.data.price,
        image: response.data.image,
      };
    },
    async deleteBook(bookId: number) {
      await axiosInstance.delete(`/deleteBook/${bookId}`);

      // update books array
      this.books = [];
      const response = await axiosInstance.get("/books");
      this.books = response.data.books;
    },
    async updateBook(bookId: number) {
      const formData = new FormData();
      formData.append("title", this.bookToEdit.title);
      formData.append("description", this.bookToEdit.description);
      formData.append("price", this.bookToEdit.price.toString());
      formData.append("bookImage", this.bookToEdit.image);

      //   if (this.bookToEdit.image instanceof File) {
      //     formData.append("bookImage", this.bookToEdit.image);
      //   }

      await axiosInstance.put(`/updateBook/${bookId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      this.editDialog = false;
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
.book-image-container {
  display: flex;
  justify-content: center;
  height: 50%;
  width: 100%;
  margin-top: 20px;
}

.book-image {
  width: 90%;
  height: 100%;
  border-radius: 7px;
}

.book-title {
  text-align: left;
  font-weight: 100;
  margin-top: 12px;
  margin-left: 20px;
  color: #2b381d;
}

.edit-button,
.delete-button {
  height: 30px;
  background-color: #2b381d;
  color: white;
  font-size: 20px;
  font-weight: 100;
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
}

.edit-button {
  border-top-right-radius: 20px;
}

.delete-button {
  border-top-left-radius: 20px;
}

.book-card {
  border: 2px solid #2b381d;
}

.edit-dialog-card {
  width: 500px;
  height: auto;
  background-color: #fefae0;
  color: #2b381d;
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 100px;
}

.edit-book-heading {
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  color: #2b381d;
}

.update-button {
  width: 100%;
  height: 50px;
  background-color: #2b381d;
  color: white;
  font-size: 22px;
  font-weight: 100;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-button {
  width: 100%;
  height: 50px;
  background-color: red;
  color: white;
  font-size: 22px;
  font-weight: 100;
  border-radius: 6px;
  cursor: pointer;
}

.image {
  width: 100%;
  height: 200px;
  border-radius: 10px;
}
</style>
