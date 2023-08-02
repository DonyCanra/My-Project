<script>
import TableRowProduct from "./TableRowProduct.vue";

export default {
  emits: ['doChange'],
  emits: ['updatedTable'],
  props: ["products"],
  methods: {
    doChangeStatus(status, id){
      // console.log(status, "<<<<<");
      this.$emit('doChange', status, id)
      
    },
    doUpdatedTable(id) {
      this.$emit('updatedTable', id)
      // console.log(id);
    },
    fetchProduct() {
      // console.log('Terpanggil');
      this.$emit("fetchProduct");
    },
  },
  components: {
    TableRowProduct,
  },
  created() {
    this.fetchProduct();
  },
};
</script>
<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Products</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Product</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Stock</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                    <th class="text-secondary opacity-7">Action</th>
                  </tr>
                </thead>
                <tbody id="products-table">
                  <TableRowProduct @updatedRaw="doUpdatedTable" @changeStatus="doChangeStatus" @navigateRow="navigatePage" v-for="product in products" :key="product.id" :product="product" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
