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
    <div v-if="traSua" class="page">
      <div
        class="alert alert-danger mt-3"
        role="alert"
        style="font-weight: bold; text-align: center"
      >
        <div class="row">
          <div class="col-1">
            <a href="/traSua/"
              ><button type="button" class="btn btn-info">
                <i class="fa-solid fa-circle-chevron-left"></i></button
            ></a>
          </div>
          <div class="col-11">Thêm thông tin</div>
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <Admin_Form_TraSua
            :traSua="traSua"
            :danhMuc="filteredDanhMuc"
            @submit:traSua="createTraSua"
          />
          <p>{{ message }}</p>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Admin_Form_TraSua from "@/components/Admin_Form_TraSua.vue";
import TraSuaService from "@/services/traSua.service";
import Admin_Header from "@/components/Admin_Header.vue";
import Admin_InputSearch from "@/components/Admin_InputSearch.vue";
import DanhMucService from "@/services/danhMuc.service";
export default {
  components: {
    Admin_Form_TraSua,
    Admin_Header,
    Admin_InputSearch,
  },
  data() {
    return {
      traSua: {},
      danhMuc: [],
      message: "",
    };
  },
  methods: {
    async createTraSua(data) {
      try {
        await TraSuaService.create(data);
        this.message = "Sản phẩm được tạo thành công.";
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
