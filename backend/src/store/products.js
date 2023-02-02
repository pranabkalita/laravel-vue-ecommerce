import axiosClient from "../axios";

const products = {
    state: () => ({
        loading: false,
        data: [],
    }),

    mutations: {
        setProducts(state, [loading, data]) {
            state.loading = loading;

            if (data) {
                state.data = data.data;
            }
        },
    },

    actions: {
        async getProducts({ commit }) {
            commit("setProducts", [true]);

            try {
                const { data } = await axiosClient.get("/products");

                commit("setProducts", [false, data]);
            } catch (error) {
                commit("setProducts", [false]);
            }
        },
    },
};

export default products;
