<script>
import { mapActions, mapState } from "pinia";
import TransactionRow from "./TransactionRow.vue";
import { useCustomerStore } from "../stores/customer";

export default {
  components: { 
    TransactionRow 
  },
  computed: {
    ...mapState(useCustomerStore, ["transactions"])
  },
  methods: {
    ...mapActions(useCustomerStore, ["fetchTransaction"]),
  },
  created() {
    this.fetchTransaction();
  },
};
</script>
<template>
  <div class="relative overflow-x-auto" style="margin: 20px">
    <!-- <div>
      <h1 style="font-size: 40px; margin-bottom: 10px; font-weight: bold; text-align: ">My Activity</h1>
    </div> -->
    <h1 style="font-size: 40px; margin-bottom: 10px; font-weight: bold">Transactions</h1>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 rounded-l-lg">CODE</th>
          <th scope="col" class="px-6 py-3 rounded-l-lg">Card/Price</th>
          <th scope="col" class="px-6 py-3">Updated By</th>
          <th scope="col" class="px-6 py-3 rounded-r-lg">Date</th>
          <th scope="col" class="px-6 py-3 rounded-r-lg">Status</th>
          <th scope="col" class="px-6 py-3 rounded-r-lg">Action</th>
        </tr>
      </thead>
      <tbody>
        <TransactionRow v-for="transaction in transactions" :key="transaction.id" :transaction="transaction"/>
      </tbody>
    </table>
  </div>
</template>
