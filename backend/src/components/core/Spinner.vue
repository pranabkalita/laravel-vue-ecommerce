<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'small'
    }
})
</script>

<template>
    <template v-if="title">
        <div class="flex flex-col items-center">
            <svg class="animate-spin -ml-1 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                :class="{
                    'h-5 w-5': size === 'small',
                    'h-10 w-10': size === 'medium',
                    'h-16 w-16': size === 'large'
                }">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                </circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>

            <div class="mt-2">{{ title }}</div>
        </div>
    </template>

    <template v-else>
        <svg class="animate-spin -ml-1 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
            </circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
    </template>
</template>
