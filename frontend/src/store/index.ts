import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    isUserLoggedIn: localStorage.getItem("isUserLoggedIn") == "true",
    userId: localStorage.getItem("userId"),
    userName: localStorage.getItem("userName"),
    userEmail: localStorage.getItem("userEmail"),
    isAdmin: localStorage.getItem("isAdmin"),
  },
  mutations: {
    setIsUserLoggedIn(state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn;
      localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
    },
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem("userId", userId);
    },
    setUserName(state, userName) {
      state.userName = userName;
      localStorage.setItem("userName", userName);
    },
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
      localStorage.setItem("userEmail", userEmail);
    },
    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
      localStorage.setItem("isAdmin", isAdmin);
    },
  },
  actions: {
    async registerUser(
      { state, commit },
      { name, email, password, promotions }
    ) {
      const response = await axios.post("http://localhost:5000/createUser", {
        name,
        email,
        password,
        promotions,
      });

      state.isUserLoggedIn = true;
      commit("setIsUserLoggedIn", true);

      const userId: number = response.data.id;
      commit("setUserId", userId);

      const userName: string = response.data.name;
      commit("setUserName", userName);

      const userEmail: string = response.data.email;
      commit("setUserEmail", userEmail);

      const isAdmin: boolean = response.data.isAdmin;
      commit("setIsAdmin", isAdmin);
    },
    async loginUser({ state, commit }, { email, password }) {
      const response = await axios.post("http://localhost:5000/loginUser", {
        email,
        password,
      });

      state.isUserLoggedIn = true;
      commit("setIsUserLoggedIn", true);

      const userId: number = response.data.id;
      commit("setUserId", userId);

      const userName: string = response.data.name;
      commit("setUserName", userName);

      const userEmail: string = response.data.email;
      commit("setUserEmail", userEmail);

      const isAdmin: boolean = response.data.isAdmin;
      commit("setIsAdmin", isAdmin);
    },
    async logoutUser({ state, commit }) {
      state.isUserLoggedIn = false;
      commit("setIsUserLoggedIn", false);

      commit("setUserId", null);
      commit("setUserName", null);
      commit("setUserEmail", null);
      commit("setIsAdmin", null);
    },
  },
  modules: {},
});
