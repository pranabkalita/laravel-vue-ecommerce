<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
    <div class="flex min-h-full">
        <!-- Sidebar -->
        <Sidebar />

        <div class="flex-1">
            <!-- Header -->
            <header class="h-10 shadow bg-white">
                Header
            </header>

            <!-- Content -->
            <main>
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>
