<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import store from '../store';
import Spinner from '../components/core/Spinner.vue';

// Constants
const sidebarOpened = ref("true");

const currentUser = computed(() => store.state.auth.user.data)

onMounted(async () => {
    store.dispatch('getUser')
    handleSidebarOpened();
    window.addEventListener("resize", handleSidebarOpened);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleSidebarOpened);
});

function handleSidebarOpened () {
    sidebarOpened.value = window.outerWidth > 768;
}

function toggleSidebar () {
    sidebarOpened.value = !sidebarOpened.value;
}
</script>

<template>
    <div v-if="currentUser.id" class="flex min-h-full">
        <!-- Sidebar -->
        <Sidebar :class="{ '-ml-[200px]': !sidebarOpened }" />

        <div class="flex-1">
            <!-- Header -->
            <Navbar @toggle-sidebar="toggleSidebar" />

            <!-- Content -->
            <main>
                <router-view></router-view>
            </main>
        </div>
    </div>

    <div v-else class="min-h-full bg-gray-200 flex items-center justify-center">
        <Spinner title="Please wait ..." />
    </div>
</template>
