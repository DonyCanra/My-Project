<script>
export default {
  props: ["history"],
  computed: {
    getDate() {
      let options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(this.history.createdAt).toLocaleDateString("id-ID", options);
    },
  },
};
</script>
<template>
  <tr class="bg-white dark:bg-gray-800">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ history.description }}</th>
    <td class="px-6 py-4">{{ history.updatedBy }}</td>
    <td class="px-6 py-4">{{ getDate }}</td>
  </tr>
</template>
