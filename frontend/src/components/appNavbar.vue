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
              class="drawer-icon d-flex d-md-none"
              @click="drawer = !drawer"
            >
              mdi-format-list-bulleted
            </v-icon>

            <!-- List in md and lg screens (Home , About, Category) -->
            <h2
              class="home d-none d-md-flex"
              @click="this.$router.push({ name: 'home' })"
            >
              Home
            </h2>
            <h2 class="about d-none d-md-flex">About</h2>
            <h2 class="category d-none d-md-flex">Category</h2>
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
            <div class="navbar-icons">
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
                    {{ this.$store.state.userName.charAt(0) }}
                    {{ this.$store.state.userName.charAt(1) }}
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

                  <v-list-item class="d-flex d-md-none" @click="gotoCartPage">
                    <v-list-item-title>
                      <v-icon class="text-h5 mr-3">mdi-cart</v-icon>
                      <span class="text-h5">Cart</span>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="logout">
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
                          <v-list-item title="Category 1"></v-list-item>
                          <v-list-item title="Category 2"></v-list-item>
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
                  />
                </v-col>

                <v-col cols="2">
                  <div class="search-icon-container">
                    <v-icon>mdi-magnify</v-icon>
                  </div>
                </v-col>
              </v-row>

              <!--  Suggested Searches -->
              <h2>Suggested searches</h2>
            </v-navigation-drawer>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "appNavbar",
  data() {
    return {
      drawer: false as boolean,
      searchDrawer: true as boolean,
    };
  },

  methods: {
    gotoAuthSelectionPage() {
      this.$router.push({ name: "authSelection" });
    },
    logout() {
      this.$store.dispatch("logoutUser");
    },
    gotoCartPage() {
      this.$router.push({ name: "cartPage" });
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
  font-size: 30px;
  color: black;
}

.home,
.about,
.category:hover {
  cursor: pointer;
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

.drawer-icon {
  font-size: 40px;
  margin-left: 25px;
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
  font-size: 25px;
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
  color: #283618;
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
</style>
