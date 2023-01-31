<template>
    <div class="flex min-h-full min-w-full w-full justify-center items-center">
        <div class="flex">
            <div class="text-indigo-500 text-7xl px-6 font-bold border-r pb-10 self-start">404</div>
            <div class="px-8">
                <h1 class="text-5xl font-bold mb-2">Page Not Found</h1>
                <p class="text-gray-600 mb-8">Please check the URL in address bar and try again.</p>
                <div>
                    <router-link
                        :to="{ name: 'app.dashboard' }"
                        class="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Go
                        back home</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>
