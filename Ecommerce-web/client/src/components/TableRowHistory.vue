<script>
export default {
  props: ["history"],
};
</script>
<template>
  <tr>
    <td>
      <div class="d-flex px-2 py-1">
        <div>
          <p class="text-xs font-weight-bold" >{{ history.description }}</p>
        </div>
      </div>
    </td>
    <td>
      <p class="text-xs font-weight-bold mb-0">{{ history.title }}</p>
    </td>
    <td class="align-middle text-center">
      <span class="text-secondary text-xs font-weight-bold">{{ history.updatedBy }}</span>
    </td>
    <td class="align-middle text-center text-sm">
      <span class="badge badge-sm bg-gradient-danger">{{ history.createdAt }}</span>
    </td>
  </tr>
</template>
