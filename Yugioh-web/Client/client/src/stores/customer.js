import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    products: [],
    cards: [],
    transactions: [],
    histories: [],
    card: "",
    random: "",
    QRCode: "",
    isLogin: false,
    doingLogin: false,
    doingRegister: false,
    isProductLoading: false,
  }),
  getters: {},
  actions: {
    async postLogin(dataInput) {
      try {
        const { data } = await axios({
          method: "post",
          url: BASE_URL + "/login",
          data: dataInput,
        });

        localStorage.access_token = data.access_token;
        this.doingLogin = false;
        this.isLogin = true;
        this.router.push("/");

        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        await Toast.fire({
          icon: "success",
          title: "Login Success",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Wrong Guys",
          text: `${error.response.data.message}`,
        });
      }
    },

    async postRegister(dataInput) {
      try {
        await axios({
          method: "post",
          url: BASE_URL + "/register",
          data: dataInput,
        });
        this.router.push("/");
      } catch (error) {
        console.log(error);
      }
    },

    async fetchProduct(page) {
      try {
        // console.log(page, "<<<< pn");
        this.isProductLoading = true;
        const { data } = await axios({
          method: "get",
          url: `${BASE_URL}/?page=${page}`,
        });

        this.isProductLoading = false;

        this.products.push(...data.data);
        // console.log(this.products, "<<<< products");
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProductSearch(name) {
      try {
        console.log(name, "<<<< pn");
        const { data } = await axios({
          method: "get",
          url: `${BASE_URL}/?name=${name}`,
        });

        this.products = data.data;
        // console.log(this.products, "<<<< products");
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProductDetail(id) {
      try {
        console.log(id, "<<< id");
        const { data } = await axios({
          method: "get",
          url: `${BASE_URL}/cards/detail?id=${id}`,
        });

        this.card = data.data;
        console.log(this.card, "<<<<");
      } catch (error) {
        console.log(error);
      }
    },

    async fetchCardRandom() {
      try {
        const { data } = await axios({
          method: "get",
          url: `${BASE_URL}/cards/random`,
        });

        this.random = data;
        console.log(this.random, "<<<< random");
      } catch (error) {
        console.log(error);
      }
    },

    async fetchCard() {
      try {
        const { data } = await axios({
          method: "get",
          url: `${BASE_URL}/cards`,
        });

        this.cards = data;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchTransaction() {
      try {
        const { data } = await axios({
          method: "get",
          url: BASE_URL + "/orders",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        console.log(data, "<<< data");
        this.transactions = data;
      } catch (error) {
        console.log(error);
      }
    },

    async postTransaction(id) {
      try {
        await axios({
          method: "post",
          url: `${BASE_URL}/orders/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchTransaction();
        this.router.push("/shop");

        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        await Toast.fire({
          icon: "success",
          title: "New Transaction created",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Wrong Guys",
          text: `${error.response.data.message}`,
        });
      }
    },

    async cancelTransaction(id) {
      try {
        await axios({
          method: "delete",
          url: `${BASE_URL}/orders/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchTransaction();
        this.router.push("/transaction");

        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        await Toast.fire({
          icon: "success",
          title: "Transaction has been canceled",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Wrong Guys",
          text: `${error.response.data.message}`,
        });
      }
    },

    async fetchHistory() {
      try {
        const { data } = await axios({
          method: "get",
          url: BASE_URL + "/histories",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        // console.log(data, "<<< data histories");
        this.histories = data;
      } catch (error) {
        console.log(error);
      }
    },

    async changePaymentStatus(id) {
      try {
        await axios({
          method: "patch",
          url: `${BASE_URL}/orders/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.fetchTransaction();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        await Toast.fire({
          icon: "success",
          title: "Payment Success",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Wrong Guys",
          text: `${error.response.data.message}`,
        });
      }
    },

    async payment(id) {
      try {
        const { data } = await axios({
          method: "post",
          url: `${BASE_URL}/midtrans-payment/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        // console.log(data, "<<<< opayment");

        const cb = this.changePaymentStatus;

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            cb(id);
          },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      try {
        localStorage.clear();
        this.isLogin = false;
        this.router.push("/");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        await Toast.fire({
          icon: "success",
          title: "Logout Success",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
