<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Above Navbar -->
        <div class="top-navbar"></div>

        <!-- Navbar -->
        <v-app-bar :elevation="0" height="80" class="navbar mt-12">
          <template v-slot:prepend>
            <!-- Logo in md and lg screens -->
            <img
              class="thinkadoo-logo d-none d-md-flex"
              :src="require('../assets/thinkadoo.png')"
              contain
              alt="Logo"
              @click="this.$router.push({ name: 'home' })"
            />

            <!-- Drawer Icon (Visible in xs and sm screens) -->
            <v-icon
              class="drawer-icon-xs-sm d-flex d-md-none"
              @click="drawer = !drawer"
            >
              mdi-format-list-bulleted
            </v-icon>
            <v-icon
              class="magnify-icon-xs-sm d-flex d-md-none"
              @click="searchDrawer = !searchDrawer"
              >mdi-magnify</v-icon
            >

            <!-- List in md and lg screens (Home , About, Category) -->
            <h2
              class="home d-none d-md-flex"
              @click="this.$router.push({ name: 'home' })"
            >
              Home
            </h2>
            <h2 class="about d-none d-md-flex">About</h2>
            <!-- Category with hover dropdown -->
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ props }">
                <h2 class="category d-none d-md-flex" v-bind="props">
                  Category
                </h2>
              </template>

              <!--  -->
              <div class="category-list">
                <v-row justify="center">
                  <v-col cols="12" sm="6">
                    <v-list-item>
                      <h2 class="all-books" @click="gotoBooks">All Books</h2>
                    </v-list-item>
                  </v-col>

                  <!-- Ages -->
                  <v-col cols="12" sm="6">
                    <v-list-item>
                      <h2 class="age ml-4">Age</h2>
                      <v-list class="books-age-list">
                        <v-list-item class="books-by-years">
                          0-3 years
                        </v-list-item>
                        <v-list-item class="books-by-years">
                          3-6 years
                        </v-list-item>
                        <v-list-item class="books-by-years">
                          6-9 years
                        </v-list-item>
                      </v-list>
                    </v-list-item>
                  </v-col>
                </v-row>
              </div>
            </v-menu>
          </template>

          <!-- thinkadoo logo in sm and xs screens -->
          <img
            class="thinkadoo-logo thinkadoo-logo-sm-xs d-flex d-md-none"
            :src="require('../assets/thinkadoo-image-logo.png')"
            contain
            alt="Logo"
            @click="this.$router.push({ name: 'home' })"
          />

          <!-- search, cart, account icons -->
          <template v-slot:append>
            <div class="navbar-icons d-none d-md-flex">
              <v-icon @click="searchDrawer = !searchDrawer">mdi-magnify</v-icon>
            </div>

            <div class="navbar-icons d-none d-md-flex">
              <v-icon @click="gotoCartPage">mdi-cart</v-icon>
            </div>

            <div class="navbar-icons">
              <v-icon v-if="!userLoggedIn" @click="gotoAuthSelectionPage">
                mdi-account
              </v-icon>

              <!-- User Avatar with Popover -->
              <v-menu v-else offset-y>
                <template v-slot:activator="{ props }">
                  <div
                    v-bind="props"
                    class="loggedIn-user-name-characters d-flex justify-center align-center"
                  >
                    {{ this.$store.state.nickname }}
                  </div>
                </template>

                <!-- Popover list -->
                <v-list class="menu-popover-list">
                  <v-list-item>
                    <v-list-item-title>
                      <div class="user-name">
                        {{ this.$store.state.userName }}
                      </div>
                      <span>{{ this.$store.state.userEmail }}</span>
                      <v-divider class="mt-3"></v-divider>
                    </v-list-item-title>
                  </v-list-item>

                  <!-- If the user is admin -->
                  <v-list-item
                    v-if="this.$store.state.isAdmin"
                    @click="this.$router.push({ name: 'adminPanel' })"
                  >
                    <v-list-item-title>
                      <v-btn class="admin-button">
                        <v-icon class="text-h5 mr-3">mdi-account-cog</v-icon>
                        <span class="text-h5">Admin Panel</span>
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="logoutDialog = true">
                    <v-list-item-title>
                      <v-icon class="text-h5 mr-3">mdi-logout</v-icon>
                      <span class="text-h5">Logout</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
        </v-app-bar>

        <!-- Home Drawer -->
        <v-row>
          <v-col cols="12" sm="8" xs="12">
            <v-navigation-drawer
              class="drawer mt-11"
              v-model="drawer"
              temporary
              width="500"
            >
              <!-- cancel drawer icon -->
              <v-icon class="drawer-close-icon" @click="drawer = !drawer"
                >mdi-window-close</v-icon
              >

              <v-list density="compact" nav class="drawer-list mt-13">
                <v-list-item
                  @click="this.$router.push({ name: 'home' })"
                  class="mb-5"
                >
                  <v-icon class="home-icon">mdi-home</v-icon>
                  <span class="home-heading">Home</span>
                </v-list-item>

                <v-list-item class="mb-5"
                  ><v-icon class="about-icon">mdi-forum</v-icon>
                  <span class="about-heading">About</span>
                </v-list-item>

                <v-list-item @click="gotoCartPage">
                  <v-icon class="home-icon">mdi-cart</v-icon>
                  <span class="home-heading">Cart</span>
                </v-list-item>

                <!-- Category expansion panel -->
                <v-list-item>
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        <v-icon class="category-icon">mdi-list-status</v-icon>
                        <span class="category-heading"
                          >Categories</span
                        ></v-expansion-panel-title
                      >
                      <v-expansion-panel-text>
                        <v-list>
                          <v-list-item class="books-by-years"
                            >0-3 years</v-list-item
                          >
                          <v-list-item class="books-by-years"
                            >3-6 years</v-list-item
                          >
                          <v-list-item class="books-by-years"
                            >6-9 years</v-list-item
                          >
                        </v-list>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>
        </v-row>

        <!-- Search Drawer -->
        <v-row justify="center">
          <v-col cols="12" sm="8" xs="12">
            <v-navigation-drawer
              class="drawer mt-11"
              v-model="searchDrawer"
              temporary
              width="500"
            >
              <v-icon
                class="drawer-close-icon"
                @click="searchDrawer = !searchDrawer"
                >mdi-window-close</v-icon
              >

              <v-row justify="center" class="mt-15" no-gutters>
                <v-col cols="8">
                  <input
                    class="search-field"
                    type="text"
                    placeholder="Search Books"
                    v-model="searchQuery"
                    @keypress="getRelevantBooks"
                  />
                </v-col>

                <v-col cols="2">
                  <div class="search-icon-container">
                    <v-icon>mdi-magnify</v-icon>
                  </div>
                </v-col>
              </v-row>

              <!--  Suggested Searches -->
              <h1 class="suggested-searches-heading">Suggested searches</h1>

              <v-list>
                <v-list-item
                  v-for="suggestedSearches in titles"
                  :key="suggestedSearches.id"
                  ><span
                    class="relevant-searches-list"
                    @click="gotoBookReviewPage(suggestedSearches.id)"
                    >{{ suggestedSearches.title }}</span
                  ></v-list-item
                >
              </v-list>
            </v-navigation-drawer>
          </v-col>
        </v-row>

        <!-- Logout Dialog -->
        <v-dialog v-model="logoutDialog" max-width="400">
          <v-card>
            <v-card-title class="headline"
              ><v-icon class="mr-4">mdi-logout-variant</v-icon
              >Logout</v-card-title
            >
            <v-card-text>are you sure you want to logout?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="logout-no-btn"
                variant="text"
                @click="logoutDialog = false"
                >No</v-btn
              >
              <v-btn class="logout-yes-btn" variant="tonal" @click="logout"
                >Yes</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../api/axiosInstance";

export default defineComponent({
  name: "appNavbar",
  data() {
    return {
      drawer: false as boolean,
      searchDrawer: false as boolean,
      searchQuery: "" as string,
      titles: [] as object[],
      logoutDialog: false as boolean,
    };
  },

  methods: {
    gotoAuthSelectionPage() {
      this.$router.push({ name: "authSelection" });
    },
    logout() {
      this.$store.dispatch("logoutUser");
      this.logoutDialog = false;
      this.$router.push({ name: "home" });
    },
    gotoCartPage() {
      this.$router.push({ name: "cartPage" });
    },
    gotoBookReviewPage(bookId: number) {
      this.searchQuery = "";
      this.$router.push({ name: "singleBookPreview", params: { id: bookId } });
    },
    async getRelevantBooks() {
      let response = await axiosInstance.get(
        `/searchBooks?q=${this.searchQuery}`
      );
      this.titles = response.data;
    },
    gotoBooks() {
      this.$router.push({ name: "books" });
    },
  },

  computed: {
    userLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Varela+Round&display=swap");

.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background-color: #283618;
  z-index: 1000;
}

.thinkadoo-logo {
  font-size: 80px;
  height: 150px;
  width: 230px;
}
.thinkadoo-logo:hover {
  cursor: pointer;
}

.thinkadoo-logo-sm-xs {
  font-size: 40px;
  height: 80px;
  width: 120px;
}

.navbar-icons {
  font-size: 29px;
  margin-right: 28px;
}
.navbar-icons:hover {
  cursor: pointer;
}

.home,
.about,
.category {
  font-weight: 300;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 8px;
  font-size: 24px;
  color: black;
  transition: 0.2s ease-in-out;
}

.home:hover,
.about:hover,
.category:hover {
  cursor: pointer;
  color: #395f11;
}

.loggedIn-user-name-characters {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #283618;
  color: white;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
}

.user-name {
  font-weight: bold;
  color: #283618;
}

.menu-popover-list {
  width: 400px;
}

.drawer-icon-xs-sm {
  font-size: 30px;
  margin-left: 20px;
}

.magnify-icon-xs-sm {
  font-size: 30px;
  margin-left: 5px;
}

.drawer-close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
}

.drawer-list {
  font-size: 24px;
}

.admin-button {
  width: 100%;
  height: auto;
  background-color: #213012;
  color: white;
  font-size: 15px;
  font-weight: bold;
}
.admin-button:hover {
  cursor: pointer;
  background-color: #fefae0;
  color: #283618;
}

.home-icon,
.about-icon,
.category-icon {
  font-size: 30px;
  margin-right: 20px;
  color: #395f11;
}

.home-heading,
.about-heading,
.category-heading {
  font-size: 20px;
}

.search-field-container {
  width: 100%;
}

.search-icon-container {
  width: 100%;
  height: 50px;
  background-color: #283618;
  color: white;
  border: 3px solid #283618;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-field {
  width: 100%;
  height: 50px;
  border: 1px solid #283618;
  padding-left: 10px;
  font-size: 20px;
  font-weight: 100;
}

.search-field:focus {
  outline: none;
}

.suggested-searches-heading {
  font-family: "Bitter", serif;
  font-weight: 400;
  margin-top: 40px;
  margin-left: 40px;
  color: grey;
  font-size: 28px;
}

.relevant-searches-list {
  font-family: "Bitter", serif;
  font-size: 21px;
  font-weight: 500;
  margin-left: 28px;
  color: black;
}
.relevant-searches-list:hover {
  cursor: pointer;
  color: #293f12;
}

.category-list {
  font-family: "Bitter", serif;
  margin-top: 25px;
  background: white;
  width: 700px;
  padding: 20px;
}

.age {
  color: #395f11;
}

.all-books:hover,
.books-by-years:hover {
  color: #395f11;
  cursor: pointer;
}

.books-age-list {
  font-size: 21px;
  font-weight: 400;
}

.logout-no-btn {
  color: #395f11;
  font-size: 18px;
  font-weight: bold;
}

.logout-yes-btn {
  background-color: #395f11;
  color: white;
  border-radius: 50px;
  padding: 5px 20px;
  font-size: 18px;
  font-weight: bold;
  transition: 0.3s ease-in-out;
}
.logout-yes-btn:hover {
  color: #395f11;
  background-color: white;
  cursor: pointer;
}
</style>
