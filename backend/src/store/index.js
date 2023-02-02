import { createStore } from "vuex";
import auth from "./auth";
import products from "./products";

const store = createStore({
    state: {},
    getters: {},
    actions: {},
    mutations: {},
    modules: {
        auth,
        products,
    },
});

export default store;
