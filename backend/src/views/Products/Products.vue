<script setup>
import { ref } from 'vue';
import ProductModal from './ProductModal.vue';
import ProductsTable from './ProductsTable.vue';

const showModal = ref(false)

const showProductModal = () => {
    showModal.value = true
}
</script>

<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Products</h1>
        <button type="submit"
            class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            @click="showProductModal">
            Add new Product
        </button>
    </div>

    <ProductModal v-model="showModal" />
    <ProductsTable />
</template>
