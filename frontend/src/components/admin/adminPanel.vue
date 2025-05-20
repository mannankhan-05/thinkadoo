<template>
  <v-container>
    <h1 class="admin-panel-heading">
      <v-icon class="admin-icon">mdi-security-network</v-icon>
      Admin Panel
    </h1>
    <v-divider :thickness="6" class="border-opacity-25 mt-5 mb-12"></v-divider>

    <v-row justify="center">
      <v-col cols="12" lg="4" md="4" sm="6" xs="6">
        <v-card class="card">
          <h2 class="add-new-book">
            <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>
            Add New Book
          </h2>
          <v-divider class="mt-5 mb-5"></v-divider>
          <v-btn class="goto-button" @click="gotoAddBook">go to addBook</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="4" sm="6" xs="6">
        <v-card class="card">
          <h2 class="add-new-book">
            <v-icon class="mr-2">mdi-delete-circle-outline</v-icon>
            Edit/Delete Book
          </h2>
          <v-divider class="mt-5 mb-5"></v-divider>
          <v-btn class="goto-button" @click="gotoAllBooks">go to Books</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="4" sm="6" xs="6">
        <v-card class="card">
          <h2 class="add-new-book">
            <v-icon class="mr-2">mdi-clipboard-list-outline</v-icon>
            Orders
          </h2>
          <v-divider class="mt-5 mb-5"></v-divider>
          <v-btn class="goto-button" @click="gotoOrderManagement"
            >See All Orders</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    gotoAddBook() {
      this.$router.push({ name: "addBook" });
    },
    gotoAllBooks() {
      this.$router.push({ name: "adminBooks" });
    },
    gotoOrderManagement() {
      this.$router.push({ name: "orderManagement" });
    },
  },
});
</script>

<style scoped>
.admin-panel-heading {
  text-align: center;
  font-size: 3.5rem;
  margin-top: 4rem;
  font-weight: 700;
  color: #2b381d;
}

.admin-icon {
  margin-bottom: 2rem;
  margin-right: 2rem;
}

.card {
  padding: 10px;
  background-color: #fefae0;
  color: #2b381d;
}

.add-new-book {
  font-size: 30px;
  font-weight: 100;
}

.goto-button {
  background-color: #2b381d;
  color: #fefae0;
  font-size: 20px;
  font-weight: 100;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

@media (max-width: 600px) {
  .admin-panel-heading {
    font-size: 2.5rem;
  }
}
</style>
