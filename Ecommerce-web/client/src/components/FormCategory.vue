<script>
import ButtonSubmit from "./ButtonSubmit.vue";

export default {
  components: {
    ButtonSubmit,
  },
  props: ["page", "categoryById"],
  emits: ["addCategory", "editCategory"],
  data() {
    return {
      form: {
        name: "",
        imgUrl: "",
      },
    };
  },
  methods: {
    async addCategory() {
      try {
        // const data = { name: this.name, imgUrl: this.imgUrl };
        this.$emit("addCategory", this.form);
      } catch (error) {
        console.log(error);
      }
    },
    async editCategory() {
      try {
        // const data = { name: this.name, imgUrl: this.imgUrl };
        this.$emit("editCategory", this.form, this.categoryById.id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.page === "EditCategory") {
      // console.log(this.categoryById, this.page, "<<<<<add");
      this.form.name = this.categoryById.name;
      this.form.imgUrl = this.categoryById.imgUrl;
    } else {
      this.form.name = "";
      this.form.imgUrl = "";
    }
  },
};
</script>
<template>
  <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-category-section">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="display-6">{{ page === "EditCategory" ? "Edit Category" : "Add Category" }}</h1>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <form v-on:submit.prevent="page === 'EditCategory' ? editCategory() : addCategory()" id="category-form">
          <div class="mb-3">
            <label for="category-name">Name <span class="text-danger fw-bold">*</span></label>
            <input v-model="form.name" type="text" class="form-control" id="category-name" placeholder="Enter category name" autocomplete="off" required />
          </div>
          <div class="mb-3">
            <label for="category-name">imgUrl <span class="text-danger fw-bold">*</span></label>
            <input v-model="form.imgUrl" type="text" class="form-control" id="category-name" placeholder="Enter category image" autocomplete="off" required />
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
