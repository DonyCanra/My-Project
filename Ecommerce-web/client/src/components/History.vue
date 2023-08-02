<script>
import TableRowHistory from "./TableRowHistory.vue";
export default {
  props: ["histories"],
  methods: {
    fetchHistory() {
      // console.log("Terpanggil");
      this.$emit("fetchHistory");
    },
  },
  components: {
    TableRowHistory,
  },
  created() {
    this.fetchHistory();
  },
};
</script>
<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="card mt-4">
          <div class="card-body p-3 pb-0">
            <div class="container-fluid py-4">
              <div class="row">
                <div class="col-12">
                  <div class="card my-4">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                        <h6 class="text-white text-capitalize ps-3">Histories</h6>
                      </div>
                    </div>
                    <div class="card-body px-0 pb-2">
                      <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Title</th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Updated By</th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created</th>
                              <th class="text-secondary opacity-7"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <TableRowHistory v-for="history in histories" :key="history.id" :history="history" />
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
