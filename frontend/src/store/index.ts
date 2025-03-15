import { createStore } from "vuex";
import axiosInstance from "../api/axiosInstance";

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
