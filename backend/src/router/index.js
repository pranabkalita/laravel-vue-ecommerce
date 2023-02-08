import { createRouter, createWebHistory } from "vue-router";

import AppLayout from "../layouts/AppLayout.vue";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import NotFound from "../views/NotFound.vue";
import Products from "../views/Products/Products.vue";

import store from "../store";

const routes = [
    {
        path: "/login",
        name: "login",
        meta: {
            requiresGuest: true,
        },
        component: Login,
    },
    {
        path: "/request-password",
        name: "requestPassword",
        meta: {
            requiresGuest: true,
        },
        component: RequestPassword,
    },
    {
        path: "/reset-password/:token",
        name: "resetPassword",
        meta: {
            requiresGuest: true,
        },
        component: ResetPassword,
    },
    {
        path: "/app",
        name: "app",
        component: AppLayout,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "dashboard",
                name: "app.dashboard",
                component: Dashboard,
            },
            {
                path: "products",
                name: "app.products",
                component: Products,
            },
        ],
    },
    {
        path: "/:pathMatch(.*)",
        name: "notFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.auth.user.token) {
        next({ name: "login" });
    } else if (to.meta.requiresGuest && store.state.auth.user.token) {
        next({ name: "app.dashboard" });
    } else {
        next();
    }
});

export default router;
