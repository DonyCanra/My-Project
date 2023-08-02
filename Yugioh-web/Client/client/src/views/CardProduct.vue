<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../stores/customer";

import { RouterLink } from "vue-router";
export default {
  props: ["product"],
  data(){
    return{
      isDetail: false
    }
  },
  computed: {
    ...mapState(useCustomerStore, ["isProductLoading", "card", "isDetail"]),
  },
  methods: {
    ...mapActions(useCustomerStore, ["postTransaction", "fetchProductDetail"]),
    productDetail() {
      this.fetchProductDetail(this.product.id);
      this.isDetail = true
    },
  },
  components: { RouterLink },
  created() {
    this.fetchProductDetail(this.product.id);
  },
};
</script>
<template>
  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a @click.prevent="productDetail(product.id)">
      <img class="p-8 rounded-t-lg" :src="product.card_images[0].image_url" alt="product image" />
    </a>
  </div>

  <!-- Small Modal -->
  <div v-show="isDetail === true" tabindex="-1" class="fixed flex justify-center align-center m-auto z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="w-full max-w-md flex items-center">
      <!-- Modal content -->
      <div class="bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            {{ product.name }}
          </h3>
          <button @click="isDetail = false"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="small-modal"
          >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->

        <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="product.card_images[0].image_url" alt="" />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ product.desc}}</p>
          </div>
        </a>

        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <a :href="product.card_images[0].image_url"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unduh Card
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
