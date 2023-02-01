import axiosClient from "./../axios";

const auth = {
    state: () => ({
        user: {
            token: sessionStorage.getItem("TOKEN"),
            data: {},
        },
    }),

    mutations: {
        setUser(state, user) {
            state.user.data = user;
        },

        setToken(state, token) {
            state.user.token = token;

            if (token) {
                sessionStorage.setItem("TOKEN", token);
            } else {
                sessionStorage.removeItem("TOKEN");
            }
        },
    },

    actions: {
        async login({ commit }, credentials) {
            const response = await axiosClient.post("/login", credentials);

            commit("setUser", response.data.user);
            commit("setToken", response.data.token);

            return response.data;
        },

        async logout({ commit }) {
            const response = await axiosClient.post("/logout");

            commit("setToken", null);

            return response.data;
        },

        async getUser({ commit }) {
            const response = await axiosClient.get("/user");

            commit("setUser", response.data);

            return response.data;
        },
    },
};

export default auth;
