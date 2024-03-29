<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import {
    Bars3Icon,
    ChevronDownIcon,
    ArrowLeftOnRectangleIcon,
    UserIcon,
} from "@heroicons/vue/20/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

import store from "../store";

// Constants
const emit = defineEmits(["toggle-sidebar"]);

const router = useRouter()

const currentUser = computed(() => store.state.auth.user.data)


// Functions
const logout = async () => {
    await store.dispatch('logout')

    router.push({ name: 'login' })
}
</script>


<template>
    <header class="flex justify-between items-center p-4 h-14 shadow bg-white">
        <button
            class="flex items-center justify-center rounded transition-colors w-8 h-8 text-gray-700 hover:bg-black/10"
            @click="emit('toggle-sidebar')">
            <Bars3Icon class="w-6" />
        </button>

        <Menu
            as="div"
            class="relative inline-block text-left">
            <div>
                <MenuButton class="flex items-center">
                    <img
                        src="https://i.pravatar.cc/150?img=15"
                        alt=""
                        class="rounded-full w-8 mr-2">
                    <small>{{ currentUser.name }}</small>
                    <ChevronDownIcon
                        class="h-5 w-5 text-indigo-200 hover:text-indigo-100"
                        aria-hidden="true" />
                </MenuButton>
            </div>

            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                        <button :class="[
                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]">
                            <UserIcon
                                :active="active"
                                class="mr-2 h-5 w-5 text-indigo-400"
                                aria-hidden="true" />
                            Profile
                        </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                            @click.prevent="logout">
                            <ArrowLeftOnRectangleIcon
                                :active="active"
                                class="mr-2 h-5 w-5 text-indigo-400"
                                aria-hidden="true" />
                            Logout
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </header>
</template>
