<script>
export default {
  props: ["category"],
  emits: ["deleted"],
  emits: ["updatedRow"],
  data() {
    return {
      id: "",
    };
  },
  methods: {
    deleteRow(id) {
      // console.log(id);
      this.$emit("deleted", id);
    },
    doUpdatedRaw(){
      // console.log(this.product.id);
      this.$emit('updatedRaw', this.category.id)
    }
  },
};
</script>
<template>

</template>
