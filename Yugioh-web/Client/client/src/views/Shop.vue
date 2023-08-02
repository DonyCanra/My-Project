<script>
import CardShop from "./CardShop.vue";
import { useCustomerStore } from "../stores/customer";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    CardShop,
  },
  computed: {
    ...mapState(useCustomerStore, ["cards"]),
  },
  methods: {
    ...mapActions(useCustomerStore, ["fetchCard"]),
  },
  created() {
    this.fetchCard();
  },
};
</script>
<template>
  <section class="card" style="margin: 50px">
    <h1 style="font-size: 40px; margin-bottom: 10px; font-weight: bold">SHOP</h1>
    <div class="grid grid-cols-4 gap-2">
      <CardShop v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </section>
</template>
