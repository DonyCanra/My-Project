<script>
import { mapActions } from "pinia";
import { useCustomerStore } from "../stores/customer";

export default {
  props: ["transaction"],
  computed: {
    getDate() {
      let options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(this.transaction.createdAt).toLocaleDateString("id-ID", options);
    },
  },
  methods: {
    ...mapActions(useCustomerStore, ["cancelTransaction", "payment"]),
  },
};
</script>
<template>
  <tr class="bg-white dark:bg-gray-800">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">#{{ Math.ceil(transaction.id * Math.random()) + "121" }}</th>
    <td class="px-6 py-4">{{ transaction.Card.name }} ~ EUR {{ transaction.Card.price }}</td>
    <td class="px-6 py-4">{{ transaction.Player.email }}</td>
    <td class="px-6 py-4">{{ getDate }}</td>
    <td class="px-6 py-4">{{ transaction.status }}</td>
    <td class="px-6 py-4">
      <div v-if="transaction.status === 'Pending'">
        <button
          @click.prevent="payment(transaction.id)"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
            <path
              d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"
            />
          </svg>
          Pay now
        </button>
        <button
          @click.prevent="cancelTransaction(transaction.id)"
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
      </div>
    </td>
  </tr>
</template>
