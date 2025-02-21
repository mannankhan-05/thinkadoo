import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    isUserLoggedIn: localStorage.getItem("isUserLoggedIn") == "true",
    userId: localStorage.getItem("userId"),
    userName: localStorage.getItem("userName"),
    userEmail: localStorage.getItem("userEmail"),
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
  },
  actions: {
    async registerUser({ state, commit }, { name, email, password }) {
      const response = await axios.post("http://localhost:5000/createUser", {
        name,
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
    },
    async logoutUser({ state, commit }) {
      state.isUserLoggedIn = false;
      commit("setIsUserLoggedIn", false);

      commit("setUserId", null);
      commit("setUserName", null);
      commit("setUserEmail", null);
    },
  },
  modules: {},
});
