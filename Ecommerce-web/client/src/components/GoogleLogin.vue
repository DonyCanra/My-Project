<script>
export default {
  emits: ["google"],
  name: "LoginPage",
  data() {
    return {
      log: "",
    };
  },
  methods: {
    callback(response) {
      this.log = response;
      this.$emit("google", this.log);
    },
  },
};
</script>

<template>
  <GoogleLogin :callback="callback" />
</template>

