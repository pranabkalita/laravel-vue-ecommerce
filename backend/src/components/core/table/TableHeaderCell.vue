<script setup>
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/outline';

defineProps({
    field: String,
    sortField: String,
    sortDirection: String
})

const emits = defineEmits(['click'])
</script>


<template>
    <th
        class="border-b-2 p-2 text-left cursor-pointer bg-gray-100"
        @click="emits('click', field)"
        :class="field === sortField ? 'bg-blue-50' : ''">
        <div class="flex justify-between">
            <slot></slot>
            <div v-if="sortField === field" class="ml-2">
                <ArrowUpIcon v-if="sortDirection === 'asc'" class="text-gray-700 w-4" />
                <ArrowDownIcon v-else class="text-gray-700 w-4" />
            </div>
        </div>
    </th>
</template>
