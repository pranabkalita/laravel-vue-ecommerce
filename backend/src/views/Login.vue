<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LockClosedIcon, XMarkIcon } from '@heroicons/vue/20/solid'

import store from '../store'
import GuestLayout from '../layouts/GuestLayout.vue';
import Spinner from '../components/core/Spinner.vue';

const loading = ref(false)
const errorMessage = ref(false)

const user = {
    email: '',
    password: '',
    remember: false
}

const router = useRouter()

const login = async () => {
    try {
        loading.value = true
        await store.dispatch('login', user)

        loading.value = false
        router.push({ name: 'app.dashboard' })
    } catch (error) {
        loading.value = false
        errorMessage.value = error.response.data.message
    }

}
</script>

<template>
    <guest-layout title="Sign in to your account">
        <form class="mt-8 space-y-6" @submit.prevent="login">

            <div
                v-if="errorMessage"
                class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
                {{ errorMessage }}

                <span
                    @click="errorMessage = ''"
                    class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-black/20">
                    <XMarkIcon />
                </span>
            </div>

            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required=""
                        class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Email address" v-model="user.email" />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password"
                        required=""
                        class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password" v-model="user.password" />
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        v-model="user.remember" />
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>

                <div class="text-sm">
                    <router-link :to="{ name: 'requestPassword' }"
                        class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your
                        password?</router-link>
                </div>
            </div>

            <div>
                <button type="submit"
                    class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    :disabled="loading"
                    :class="{
                        'cursor-not-allowed': loading,
                        'hover:bg-indigo-500': loading
                    }">
                    <Spinner v-if="loading" class="h-5 w-5" />

                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true" />
                    </span>
                    Sign in
                </button>
            </div>
        </form>
    </guest-layout>
</template>
