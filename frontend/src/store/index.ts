import { createStore } from "vuex";
import axiosInstance from "../api/axiosInstance";

declare global {
  interface Window {
    google: any;
  }
}

export default createStore({
  state: {
    isUserLoggedIn: localStorage.getItem("isUserLoggedIn") == "true",
    userId: localStorage.getItem("userId") || null,
    userName: localStorage.getItem("userName") || null,
    userEmail: localStorage.getItem("userEmail") || null,
    isAdmin: localStorage.getItem("isAdmin"),
    nickname: localStorage.getItem("nickname") || null,
  },
  mutations: {
    setIsUserLoggedIn(state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
    },
    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    setNickname(state, nickname) {
      state.nickname = nickname;
    },
  },
  actions: {
    async registerUser(
      { state, commit },
      { name, email, password, promotions }
    ) {
      const response = await axiosInstance.post("/createUser", {
        name,
        email,
        password,
        promotions,
      });

      state.isUserLoggedIn = true;
      commit("setIsUserLoggedIn", true);

      const userId: number = response.data.id;
      const userName: string = response.data.name;
      const userEmail: string = response.data.email;
      const isAdmin: boolean = response.data.isAdmin;
      const nickname = userName.charAt(0) + userName.charAt(1);

      commit("setUserId", userId);
      commit("setUserName", userName);
      commit("setUserEmail", userEmail);
      commit("setIsAdmin", isAdmin);
      commit("setNickname", nickname);

      // generating a user coupon
      await axiosInstance.post("/generateCoupon", {
        userId: state.userId,
        email: state.userEmail,
      });
    },
    async loginUser({ state, commit }, { email, password, rememberMe }) {
      const response = await axiosInstance.post("/loginUser", {
        email,
        password,
      });

      state.isUserLoggedIn = true;
      const userId: number = response.data.id;
      const userName: string = response.data.name;
      const userEmail: string = response.data.email;
      const isAdmin: boolean = response.data.isAdmin;
      const nickname = userName.charAt(0) + userName.charAt(1);

      commit("setIsUserLoggedIn", true);
      commit("setUserId", userId);
      commit("setUserName", userName);
      commit("setUserEmail", userEmail);
      commit("setIsAdmin", isAdmin);
      commit("setNickname", nickname);

      // Store in localStorage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("isUserLoggedIn", "true");
        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("isAdmin", isAdmin.toString());
        localStorage.setItem("nickname", nickname);
      } else {
        localStorage.removeItem("isUserLoggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("nickname");
      }
    },
    async googleAuth({ state, commit }) {
      let googleInitialized = false;
      try {
        if (!window.google || !window.google.accounts) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => reject("Failed to load Google script");
            document.head.appendChild(script);
          });
        }

        if (!googleInitialized) {
          window.google.accounts.id.initialize({
            client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,

            callback: async (response: any) => {
              const idToken = response.credential; // JWT from Google

              try {
                // Send the token to your backend for verification
                const res = await fetch("http://localhost:5000/google/auth", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ token: idToken }),
                });

                const data = await res.json();

                if (data.status === "login" || data.status === "signup") {
                  commit("setIsUserLoggedIn", true);
                  commit("setUserId", data.user.id);
                  commit("setUserName", data.user.name);
                  commit("setUserEmail", data.user.email);
                  commit("setIsAdmin", data.user.isAdmin);
                  commit(
                    "setNickname",
                    data.user.name.charAt(0) + data.user.name.charAt(1)
                  );
                } else {
                  alert("Unexpected response from server.");
                }

                // generating a user coupon
                if (data.status === "signup") {
                  await axiosInstance.post("/generateCoupon", {
                    userId: state.userId,
                    email: state.userEmail,
                  });
                }
              } catch (err) {
                console.error("Error sending token to backend:", err);
              }
            },

            use_fedcm_for_prompt: false,
          });
          googleInitialized = true;
        }

        window.google.accounts.id.prompt();
      } catch (err) {
        console.error("Google Sign-In Error:", err);
      }
    },
    async editUser({ state, commit }, { userName, userEmail, promotions }) {
      await axiosInstance.put(`/editUser/${state.userId}`, {
        name: userName,
        email: userEmail,
        promotions: promotions,
      });

      commit("setUserName", userName);
      commit("setUserEmail", userEmail);
    },
    async logoutUser({ state, commit }) {
      // Clear Vuex state
      commit("setIsUserLoggedIn", false);
      commit("setUserId", null);
      commit("setUserName", null);
      commit("setUserEmail", null);
      commit("setIsAdmin", null);
      commit("setNickname", null);

      // Clear localStorage
      localStorage.removeItem("isUserLoggedIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("nickname");
    },
  },
  modules: {},
});
