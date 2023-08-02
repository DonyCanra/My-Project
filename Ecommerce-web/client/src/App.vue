<script>
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Setting from "./components/Setting.vue";
import Navbar from "./components/NavbarItem.vue";
import Sidebar from "./components/Sidebar.vue";
import Dashboard from "./components/Dashboard.vue";
import Products from "./components/TablesProduct.vue";
import Categories from "./components/TablesCategory.vue";
import Profile from "./components/Profile.vue";
import History from "./components/History.vue";
import TableRowProduct from "./components/TableRowProduct.vue";
import TableRowCategory from "./components/TableRowCategory.vue";
import FormProduct from "./components/FormProduct.vue";
import FormCategory from "./components/FormCategory.vue";

const BASE_URL = "https://challenge-two.donycanra.online"
export default {
  components: {
    Login,
    Register,
    Setting,
    Navbar,
    Sidebar,
    Dashboard,
    Products,
    Categories,
    Products,
    Profile,
    History,
    TableRowProduct,
    TableRowCategory,
    FormProduct,
    FormCategory,
  },
  data() {
    return {
      page: "",
      users: [],
      dashboard: [],
      products: [],
      categories: [],
      histories: [],
      profile: [],
      productById: [],
      categoryById: [],
    };
  },
  methods: {
    navigatePage(page) {
      this.page = page;
    },
    // Function Login
    async handleCredentialResponse(response) {
      try {
        console.log("Encoded JWT ID token: " + response.credential);
        const { data } = await axios({
          method: "POST",
          url: BASE_URL + "/auth/googleLogin",
          data: response,
          headers: {
            google_token: response.credential,
          },
        });
        localStorage.setItem("access_token", data.access_token);

        this.navigatePage("Dashboard");
      } catch (error) {
        console.log(error);
      }
    },
    async login(dataInput) {
      try {
        // console.log(data, "login");
        const { data } = await axios({
          method: "POST",
          url: BASE_URL + "/auth/login",
          data: dataInput,
        });
        localStorage.setItem("access_token", data.access_token);
        // console.log(this.isLogin);

        this.fetchProfile();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });

        this.navigatePage("Dashboard");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: `${error.response.data.message}`,
        });

        console.log(error);
      }
    },
    logout() {
      localStorage.clear();
      this.navigatePage("Login");
    },

    async register(dataInput) {
      try {
        await axios.post(BASE_URL + "/auth/register", dataInput, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register Success",
          showConfirmButton: false,
          timer: 1500,
        });

        this.navigatePage("Login");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: `${error.response.data.message}`,
        });

        console.log(error);
      }
    },

    // Function Profile
    async fetchProfile() {
      try {
        const { data } = await axios({
          method: "GET",
          url: BASE_URL + "/users/profile",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.profile = data;
        // console.log(data, "<<<<<<user");
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUser() {
      try {
        const { data } = await axios({
          method: "GET",
          url: BASE_URL + "/users",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(data);
        this.users = data;
      } catch (error) {
        console.log(error);
      }
    },

    // Function Category Start
    async fetchCategory() {
      try {
        const { data } = await axios({
          url: BASE_URL + "/categories",
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(data);
        this.categories = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addCategory(newCategory) {
      try {
        await axios.post(BASE_URL + "/categories", newCategory, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Category has been created",
          showConfirmButton: false,
          timer: 1500,
        });

        this.fetchCategory();
        this.navigatePage("Category");
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCategoryById(id) {
      try {
        const { data } = await axios({
          method: "GET",
          url: BASE_URL + "/categories/" + id,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.categoryById = data;
        // console.log(data, "<<<<<<user");

        this.navigatePage("EditCategory");
      } catch (error) {
        console.log(error);
      }
    },
    async updatedCategory(data, id) {
      try {
        // console.log(data, id);
        await axios.put(BASE_URL + "/categories/" + id, data, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Category has been updated",
          showConfirmButton: false,
          timer: 1500,
        });

        this.fetchCategory();
        this.navigatePage("Category");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(BASE_URL + "/categories/" + id, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.fetchCategory();
        this.navigatePage("Category");
      } catch (error) {
        console.log(error);
      }
    },

    // Function Product
    async fetchProduct() {
      try {
        const { data } = await axios({
          url: BASE_URL + "/products",
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(data);
        this.products = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addProduct(form) {
      try {
        await axios.post(BASE_URL + "/products", form, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New product has been created",
          showConfirmButton: false,
          timer: 1500,
        });

        this.fetchProduct();
        this.navigatePage("Product");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Add Product Failed",
          text: `${error.response.data.message}`,
        });

        console.log(error);
      }
    },
    async fetchProductById(id) {
      try {
        const { data } = await axios({
          url: BASE_URL + "/products/" + id,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.productById = data;
        // console.log(data, "<<<<<<user");

        this.navigatePage("EditProduct");
      } catch (error) {
        console.log(error);
      }
    },
    async updatedProduct(data, id) {
      try {
        // console.log(data, id);
        await axios.put(BASE_URL + "/products/" + id, data, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product has been updated",
          showConfirmButton: false,
          timer: 1500,
        });

        this.fetchProduct();
        this.navigatePage("Product");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Updated Failed",
          text: `${error.response.data.message}`,
        });
        console.log(error);
      }
    },
    async changeStatus(status, id) {
      try {
        console.log(status, id);
        await axios.patch(
          BASE_URL + "/products/" + id,
          { status },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.fetchProduct();
        this.navigatePage("Product");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Modify Failed",
          text: `${error.response.data.message}`,
        });
        console.log(error);
      }
    },

    // Function History
    async fetchHistory() {
      try {
        const { data } = await axios({
          url: BASE_URL + "/histories",
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(data);
        this.histories = data;
      } catch (error) {
        console.log(error);
      }
    },

    // Function Dashboard
    async fetchDashboard() {
      try {
        const { data } = await axios({
          url: BASE_URL + "/dashboard",
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(data);
        this.dashboard = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (localStorage.access_token) {
      this.fetchProduct();
      this.fetchCategory();
      this.fetchUser();
      this.fetchHistory();
      this.fetchDashboard();
      this.fetchProfile();
      this.fetchProductById();
      this.navigatePage("Dashboard");
    } else {
      this.navigatePage("Login");
    }
  },
};
</script>

<template>
  <!-- Login Start-->
  <Login @googleLogin="handleCredentialResponse" @login="login" v-if="page === 'Login'" @navigatePage="navigatePage" />
  <!-- Login End-->

  <!-- Register Start -->
  <Register @register="register" v-if="page === 'Register'" @navigatePage="navigatePage" />
  <!-- Register End -->
  <!-- Sidebar Start -->
  <Sidebar @logout="logout" v-if="page !== 'Login' && page !== 'Register'" @navigatePage="navigatePage" :page="page" />
  <!-- Sidebar End -->

  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <!-- Navbar -->
    <Navbar v-if="page !== 'Login' && page !== 'Register'" :profile="profile" />
    <!-- End Navbar -->

    <!-- Dasboard Start -->
    <Dashboard v-if="page === 'Dashboard'" @fetchDashboard="fetchDashboard" :dashboard="dashboard" />
    <!-- Dasboard End -->

    <!-- Products Start -->
    <Products v-if="page === 'Product'" @fetchProduct="fetchProduct" :products="products" @navigatePage="navigatePage" @doChange="changeStatus" @updatedTable="fetchProductById" />
    <!-- Products End -->

    <!-- Categories Start -->
    <Categories @deleteCategory="deleteCategory" v-if="page === 'Category'" @fetchCategory="fetchCategory" :categories="categories" @updatedTable="fetchCategoryById" />
    <!-- Categories End -->

    <!-- AddProduct Start -->
    <FormProduct v-if="page === 'AddProduct' || page === 'EditProduct'" @addProduct="addProduct" :categories="categories" :productById="productById" :page="page" @editProduct="updatedProduct" />
    <!-- AddProduct End -->

    <!-- AddCategory Start -->
    <FormCategory v-if="page === 'AddCategory' || page === 'EditCategory'" @addCategory="addCategory" :categoryById="categoryById" :page="page" @editCategory="updatedCategory" />
    <!-- AddCategory End -->

    <!-- History Start -->
    <History v-if="page === 'History'" @fetchHistory="fetchHistory" :histories="histories" />
    <!-- History End -->

    <!-- Profile Start -->
    <Profile v-if="page === 'Profile'" :profile="profile" />
    <!-- Profile Start -->
  </main>

  <!-- Setting Start -->

  <!-- Setting End -->
</template>

<style scoped></style>
