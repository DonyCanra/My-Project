<script>
import TableRowCategory from "./TableRowCategory.vue";
export default {
  emits: ['deleteCategory'],
  emits: ['updatedTable'],
  props: ["categories"],
  data(){
    return{
      id: '',
    }
  },
  methods: {
    doUpdatedTable(id) {
      this.$emit('updatedTable', id)
      // console.log(id);
    },
    fetchCategory() {
      // console.log("Terpanggil");
      this.$emit("fetchCategory");
    },
    deleteCategory(id){
      this.$emit('deleteCategory', id)
    },
  },
  components: {
    TableRowCategory,
  },
  created() {
    this.fetchCategory();
  },
};
</script>
<template>
  <!-- <button type="button" v-on:click="deleteC">ads</button> -->
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">Categories</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Category</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total Product</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <TableRowCategory @updatedRaw="doUpdatedTable" @navigateRow="navigatePage" @deleted="deleteCategory" v-for="category in categories" :key="category.id" :category="category" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
