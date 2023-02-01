<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import store from '../store';

const sidebarOpened = ref("true");

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
    <div class="flex min-h-full">
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
</template>
