import axiosClient from "../axios";

const products = {
    state: () => ({
        loading: false,
        data: [],
        links: [],
        from: null,
        to: null,
        page: 1,
        limit: null,
    }),

    mutations: {
        setProducts(state, [loading, data = null]) {
            state.loading = loading;

            if (data) {
                state.data = data.data;
                state.links = data.meta.links;
                state.from = data.meta.from;
                state.to = data.meta.to;
                state.page = data.meta.current_page;
                state.limit = data.meta.per_page;
                state.total = data.meta.total;
            }
        },
    },

    actions: {
        async getProducts(
            { commit },
            { url = null, search = "", perPage = 10, sortField, sortDirection }
        ) {
            commit("setProducts", [true]);

            try {
                url = url || "/products";
                const { data } = await axiosClient.get(url, {
                    params: {
                        search,
                        per_page: perPage,
                        sort_field: sortField,
                        sort_direction: sortDirection,
                    },
                });

                commit("setProducts", [false, data]);
            } catch (error) {
                commit("setProducts", [false]);
            }
        },
    },
};

export default products;
