import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isMenuVisible: true,
      user: {
        name: "Usuário",
        email: "mock@gmail.com",
      },
    };
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible;
      } else {
        state.isMenuVisible = isVisible;
      }
      console.log("toggleMenu = " + state.isMenuVisible);
    },
  },
});

export default store;
