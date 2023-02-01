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
            const { data } = await axiosClient.post("/login", credentials);

            commit("setUser", data.user);
            commit("setToken", data.token);

            return data;
        },

        async logout({ commit }) {
            const { data } = await axiosClient.post("/logout");

            commit("setToken", null);

            return data;
        },

        async getUser({ commit }) {
            const { data } = await axiosClient.get("/user");

            commit("setUser", data);
        },
    },
};

export default auth;
