<script>
export default {
  props: ["product"],
  emits: ["changeStatus"],
  emits: ["updatedRow"],
  data() {
    return {
      status: "",
    };
  },
  methods: {
    doStatus(event) {
      const data = event.target.value;
      // console.log(this.product.id, data);
      this.$emit("changeStatus", data, this.product.id);
    },
    doUpdatedRaw() {
      // console.log(this.product.id);
      this.$emit("updatedRaw", this.product.id);
    },
  },
  created() {
    // console.log(this.product);
    if (this.product) {
      this.status = this.product.status;
    }
  },
};
</script>
<template>
  <tr>
    <td>
      <div class="d-flex px-2 py-1">
        <div>
          <img :src="product.User.imgUrl" class="avatar avatar-sm me-3 border-radius-lg" alt="user6" />
        </div>
        <div class="d-flex flex-column justify-content-center">
          <h6 class="mb-0 text-sm">{{ product.User.username }}</h6>
          <p class="text-xs text-secondary mb-0">{{ product.User.email }}</p>
        </div>
      </div>
    </td>
    <td style="display: flex; gap: 20px">
      <img :src="product.imgUrl" alt="" style="height: 10%; width: 10%" />
      <div>
        <p class="text-xs font-weight-bold mb-0">{{ product.name }}</p>
        <p class="text-xs text-secondary mb-0">{{ product.price }}</p>
      </div>
    </td>
    <td class="align-middle text-center">
      <span class="text-secondary text-xs font-weight-bold">{{ product.stock }}</span>
    </td>
    <td class="align-middle text-center text-sm">
      <select @change="doStatus" v-model="product.status" name="categoryId" class="badge badge-sm bg-gradient-primary" :class="product.status === 'Active' ? 'bg-gradient-success' : 'bg-gradient-secondary'">
        <option value="Active">Active</option>
        <option value="InActive">InActive</option>
        <option value="Archive">Archive</option>
      </select>
    </td>
    <td class="align-middle">
      <a @click.prevent="doUpdatedRaw" href="#" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user" v-if="product.canEdit">Edit</a>
    </td>
  </tr>
</template>
