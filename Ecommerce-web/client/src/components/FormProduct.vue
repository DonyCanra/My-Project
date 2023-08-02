<script>
import ButtonSubmit from "./ButtonSubmit.vue"
export default {
  components: {
    ButtonSubmit
  },
  props: ["page", "categories", "productById"],
  emits: ["addProduct", "editProduct"],
  data() {
    return {
      form: {
        name: "",
        description: "",
        stock: "",
        price: "",
        imgUrl: "",
        categoryId: "",
      }
    };
  },
  methods: {
    async addProduct() {
      try {
        this.$emit("addProduct", this.form);
      } catch (error) {
        console.log(error);
      }
    },
    async editProduct() {
      try {
        this.$emit("editProduct", this.form, this.productById.id);
        // console.log(this.form);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.page === "EditProduct") {
      // console.log(this.productById, this.page, "<<<<<add");
      this.form.name = this.productById.name;
      this.form.description = this.productById.description;
      this.form.stock = this.productById.stock;
      this.form.price = this.productById.price;
      this.form.imgUrl = this.productById.imgUrl;
      this.form.categoryId = this.productById.categoryId;
    } else {
      this.form.name = "";
      this.form.description = "";
      this.form.stock = "";
      this.form.price = "";
      this.form.imgUrl = "";
      this.form.categoryId = "";
    }
  },
};
</script>
<template>
  <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-product-section">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="display-6">{{ page === "EditProduct" ? "Edit Product" : "Add Product" }} 
      <img :src="form.imgUrl" alt="" style="height: 20%; width: 20%; mix-blend-mode:color-burn;">
      </h1>
    </div>

    <!-- Add From -->
    <div class="row">
      <div class="col-12 col-md-6">
        <form v-on:submit.prevent="page === 'EditProduct' ? editProduct() : addProduct()" id="product-form">
          <div class="mb-3">
            <label for="product-name">Name <span class="text-danger fw-bold">*</span></label>
            <input v-model="form.name" type="text" class="form-control" id="product-name" autocomplete="off" name="name" />
          </div>
          <div class="mb-3">
            <label for="product-category">Category <span class="text-danger fw-bold">*</span></label>
            <select v-model="form.categoryId" id="product-category" class="form-select" name="categoryId">
              <option selected disabled>-- Select Category --</option>
              <option v-for="category in categories" :key="category.id" :category="category" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="product-desc">Description <span class="text-danger fw-bold">*</span></label>
            <input v-model="form.description" type="text" class="form-control" id="product-desc" autocomplete="off" name="description" />
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <label for="product-stock">Stock <span class="text-danger fw-bold">*</span></label>
                <input v-model="form.stock" type="number" min="0" class="form-control" id="product-stock" autocomplete="off" name="stock" />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <label for="product-price">Price <span class="text-danger fw-bold">*</span></label>
                <input v-model="form.price" type="number" min="0" class="form-control" id="product-price" autocomplete="off" name="price" />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="product-image">Image <span class="text-danger fw-bold">*</span></label>
            <input v-model="form.imgUrl" type="text" class="form-control" id="product-image" autocomplete="off" name="imgUrl" />
          </div>
          <div class="row mt-5 mb-3">
            <div class="col-6">
              <a class="btn btn-lg btn-outline-dark rounded-pill w-100 p-2" href="">Cancel</a>
            </div>
            <div class="col-6">
              <ButtonSubmit />
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
