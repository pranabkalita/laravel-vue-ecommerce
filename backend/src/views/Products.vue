<script setup>
import { ref, computed, onMounted } from 'vue'
import Spinner from '../components/core/Spinner.vue';

import { PRODUCTS_PER_PAGE } from './../constants'
import store from './../store'

// Constants
const perPage = ref(PRODUCTS_PER_PAGE)
const search = ref('')
const products = computed(() => store.state.products)

// Hooks
onMounted(() => {
    getProducts()
})

// Functions
const getProducts = async (url = null) => {
    await store.dispatch('getProducts', { url, search: search.value, perPage: perPage.value })
}

const getForPage = async (event, link) => {
    if (!link.url || link.active) { return }

    await getProducts(link.url)
}
</script>

<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Products</h1>
        <button type="submit"
            class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            @click="showProductModal">Add
            new Product</button>
    </div>

    <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex justify-between border-b-2 pb-3">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-3">Per Page</span>
                <select @change="getProducts(null)" v-model="perPage"
                    class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div>
                <input type="text" v-model="search" @change="getProducts(null)" placeholder="Type to search products"
                    class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
            </div>
        </div>

        <Spinner v-if="products.loading" title="Please Wait ..." />

        <template v-else>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="border-b-2 p-2 text-left">ID</th>
                        <th class="border-b-2 p-2 text-left">Image</th>
                        <th class="border-b-2 p-2 text-left">Title</th>
                        <th class="border-b-2 p-2 text-left">Price</th>
                        <th class="border-b-2 p-2 text-left">Last Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product of products.data">
                        <td class="border-b p-2">{{ product.id }}</td>
                        <td class="border-b p-2">
                            <img class="w-16" :alt="product.title" :src="product.image">
                        </td>
                        <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {{ product.title }}
                        </td>
                        <td class="border-b p-2">{{ product.price }}</td>
                        <td class="border-b p-2">{{ product.updated_at }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="flex justify-between items-center mt-5">
                <span>
                    Showing from {{ products.from }} to {{ products.to }}
                </span>

                <nav v-if="products.total > products.limit"
                    class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination">
                    <a v-for="(link, i) of products.links" :key="i"
                        href="#"
                        aria-current="page"
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                        v-html="link.label"
                        @click.prevent="getForPage($event, link)"
                        :disabled="!link.url"
                        :class="[
                            link.active ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                            i === 0 ? 'rounded-l-md' : '',
                            i === products.links.length - 1 ? 'rounded-r-md' : '',
                            !link.url ? 'bg-gray-100 text-gray-700' : ''
                        ]"></a>
                </nav>
            </div>
        </template>
    </div>
</template>
