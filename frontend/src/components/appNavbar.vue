<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Above Navbar -->
        <div class="top-navbar"></div>

        <!-- Navbar -->
        <v-app-bar :elevation="0" height="80" class="mt-12">
          <template v-slot:prepend>
            <img
              class="thinkadoo-logo d-none d-sm-flex d-sm-none d-md-flex"
              :src="require('../assets/thinkadoo.png')"
              contain
              alt="Logo"
              @click="this.$router.push({ name: 'home' })"
            />
            <v-icon
              class="drawer-icon d-flex d-sm-none d-none d-sm-flex d-md-none"
              >mdi-format-list-bulleted</v-icon
            >

            <h2
              class="home d-none d-sm-flex d-sm-none d-md-flex"
              @click="this.$router.push({ name: 'home' })"
            >
              Home
            </h2>
            <h2 class="about d-none d-sm-flex d-sm-none d-md-flex">About</h2>
            <h2 class="category d-none d-sm-flex d-sm-none d-md-flex">
              Category
            </h2>
          </template>

          <template v-slot:append>
            <div class="navbar-icons">
              <v-icon>mdi-magnify</v-icon>
            </div>

            <div class="navbar-icons d-none d-sm-flex d-sm-none d-md-flex">
              <v-icon>mdi-cart</v-icon>
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
                      <div>{{ this.$store.state.userName }}</div>
                      <span>{{ this.$store.state.userEmail }}</span>
                      <v-divider class="mt-3"></v-divider>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    class="d-flex d-sm-none d-none d-sm-flex d-md-none"
                  >
                    <v-list-item-title>
                      <v-icon>mdi-cart</v-icon>
                      <span>Cart</span>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="logout">
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
        </v-app-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "appNavbar",

  methods: {
    gotoAuthSelectionPage() {
      this.$router.push({ name: "authSelection" });
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
@import url("https://fonts.googleapis.com/css2?family=Sigmar&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");

.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background-color: #283618;
  z-index: 1000; /* Ensures it stays above other content */
}

.thinkadoo-logo {
  font-size: 80px;
  height: 150px;
  width: 230px;
}
.thinkadoo-logo:hover {
  cursor: pointer;
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
  font-family: "Ubuntu", serif;
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
}

.menu-popover-list {
  width: 400px;
}

.drawer-icon {
  font-size: 40px;
  margin-left: 20px;
}
</style>
