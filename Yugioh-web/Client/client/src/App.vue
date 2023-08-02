<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },
};
</script>

<template>

  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <!-- Navbar -->
    <Navbar/>

    <RouterView/>
    
    <!-- Footer -->
    <Footer/>
    
  </main>
  
</template>
