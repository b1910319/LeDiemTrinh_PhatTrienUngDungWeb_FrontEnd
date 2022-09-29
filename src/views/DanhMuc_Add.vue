<template>
  <div class="container">
    <div class="row">
      <div class="col-9">
        <Admin_Header />
      </div>
      <div class="col-3">
        <Admin_InputSearch v-model="searchText" />
      </div>
    </div>
    <div v-if="danhMuc" class="page">
      <div
        class="alert alert-danger"
        role="alert"
        style="
          width: 100%;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
        "
      >
        Thêm thông tin danh mục
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <Admin_Form_DanhMuc :danhMuc="danhMuc"  @submit:danhMuc="createDanhMuc" />
          <p>{{ message }}</p>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Admin_Form_DanhMuc from "@/components/Admin_Form_DanhMuc.vue";
import Admin_Header from "@/components/Admin_Header.vue";
import Admin_InputSearch from "@/components/Admin_InputSearch.vue";
import DanhMucService from "@/services/danhMuc.service";
export default {
  components: {
    Admin_Form_DanhMuc,
    Admin_Header,
    Admin_InputSearch,
  },
  data() {
    return {
      danhMuc: {},
      message: "",
    };
  },
  methods: {
    async createDanhMuc(data) {
      try {
        await DanhMucService.create(data);
        this.message = "Danh Mục được tạo thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async retrieveDanhMuc() {
      try {
        this.danhMuc = await DanhMucService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshDanhMucList() {
      this.retrieveDanhMuc();
      this.activeIndex = -1;
    },
  },
  computed: {
    contactStrings() {
      return this.danhMuc.map((danhmuc) => {
        const { tenDM } = danhmuc;
        return [tenDM].join("");
      });
    },
    filteredDanhMuc() {
      if (!this.searchText) return this.danhMuc;
      return this.danhMuc.filter((_danhMuc, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },
  },
  mounted() {
    this.refreshDanhMucList();
  },
  created() {
    this.message = "";
  },
};
</script>
