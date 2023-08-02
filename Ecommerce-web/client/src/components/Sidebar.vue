<script>
export default {
  props: ['page'],
  emits: ['logout'],
  methods: {
    logout(){
      this.$emits('logout')
    }
  }
  
};
</script>
<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href="# " target="_blank">
        <img src="/img/logo-ct.png" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-1 font-weight-bold text-white">Challenge-Part-Two</span>
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2" />
    <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a @click.prevent="$emit('navigatePage', 'Dashboard')" class="nav-link text-white" :class="page === 'Dashboard' ? 'active bg-gradient-primary' : ''" href="#">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">dashboard</i>
            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </a>
        </li>
        <li class="nav-item">
          <a @click.prevent="$emit('navigatePage', 'Product')" class="nav-link text-white" :class="page === 'Product' ? 'active bg-gradient-primary' : ''">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">table_view</i>
            </div>
            <span class="nav-link-text ms-1">Products</span>
          </a>
        </li>
        <li class="nav-item">
          <a @click.prevent="$emit('navigatePage', 'Category')" class="nav-link text-white" :class="page === 'Category' ? 'active bg-gradient-primary' : ''" href="#">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">receipt_long</i>
            </div>
            <span class="nav-link-text ms-1">Categories</span>
          </a>
        </li>
        <li class="nav-item">
          <a @click.prevent="$emit('navigatePage', 'AddProduct')" class="nav-link text-white" :class="page === 'AddProduct' ? 'active bg-gradient-primary' : ''" href="#">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">view_in_ar</i>
            </div>
            <span class="nav-link-text ms-1">Add Product</span>
          </a>
        </li>
        <li class="nav-item">
          <a @click="$emit('navigatePage', 'AddCategory')" class="nav-link text-white" :class="page === 'AddCategory' ? 'active bg-gradient-primary' : ''" href="#">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">format_textdirection_r_to_l</i>
            </div>
            <span class="nav-link-text ms-1">Add Category</span>
          </a>
        </li>
        <li class="nav-item">
          <a @click.prevent="$emit('navigatePage', 'History')" class="nav-link text-white" :class="page === 'History' ? 'active bg-gradient-primary' : ''" href="#">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">notifications</i>
            </div>
            <span class="nav-link-text ms-1">Notifications</span>
          </a>
        </li>
        <li class="nav-item mt-3">
          <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
        </li>
        <li class="nav-item">
          <a @click.prevent="$emit('navigatePage', 'Profile')" class="nav-link text-white" :class="page === 'Profile' ? 'active bg-gradient-primary' : ''" href="#">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">person</i>
            </div>
            <span class="nav-link-text ms-1">Profile</span>
          </a>
        </li>
        <li class="nav-item">
          <a @click.prevent="$emit('logout')" class="nav-link text-white" href="#">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">login</i>
            </div>
            <span class="nav-link-text ms-1">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
