<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../stores/customer";

export default {
  computed: {
    ...mapState(useCustomerStore, ["random"]),
  },
  methods: {
    ...mapActions(useCustomerStore, ["fetchCardRandom"]),
  },
  async created() {
    await this.fetchCardRandom();
    console.log(this.random, "<<<");
  },
};
</script>
<template>
  <section class="p-5">
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div>
      <img class="h-auto max-w-full rounded-lg" :src="random?.card_images[0]?.image_url" alt="" style="object-fit: cover;" />
    </div>
    <div>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ random.name }}</h5>
      <button
        type="button"
        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        ATK: {{ random?.atk }}
      </button>
      <button
        type="button"
        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        DEF: {{ random?.def }}
      </button>
      <button
        type="button"
        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Type: {{ random?.type }}
      </button>
      <button
        type="button"
        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Typing: {{ random?.race }}
      </button>
      <button
        type="button"
        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Level: {{ random?.level }}
      </button>
      <button
        type="button"
        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Attribute: {{ random?.attribute }}
      </button>
      <p style="text-align: justify;" class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ random.desc }}</p>

    </div>
  </div>
</section>
</template>
