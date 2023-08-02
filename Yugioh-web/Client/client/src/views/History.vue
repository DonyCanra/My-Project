<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../stores/customer";
import HistoryRow from "./HistoryRow.vue";

export default {
  components: { HistoryRow },
  computed: {
    ...mapState(useCustomerStore, ["histories"])
  },
  methods: {
    ...mapActions(useCustomerStore, ["fetchHistory"]),
  },
  created() {
    this.fetchHistory();
  },
};
</script>
<template>
  <div class="relative overflow-x-auto" style="margin: 20px;">
    <!-- <div>
      <h1 style="font-size: 40px; margin-bottom: 10px; font-weight: bold; text-align: ">My Activity</h1>
    </div> -->
    <h1 style="font-size: 40px; margin-bottom: 10px; font-weight: bold">My History</h1>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 rounded-l-lg">Description</th>
          <th scope="col" class="px-6 py-3">Updated By</th>
          <th scope="col" class="px-6 py-3 rounded-r-lg">Created</th>
        </tr>
      </thead>
      <tbody>
        <HistoryRow v-for="history in histories" :key="history.id" :history="history" />
      </tbody>
    </table>
  </div>
</template>
