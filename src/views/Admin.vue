<template>
  <div class="container">
    <div class="row">
      <div class="col-9">
        <Admin_Header/>
      </div>
      <div class="col-3">
        <Admin_InputSearch v-model="searchText" />
      </div>
    </div>
    <div class="row">
      <Admin_DanhMuc :danhMuc="filteredDanhMuc" />
      <Admin_TraSua :traSua="filteredTraSua" />
    </div>
  </div>
</template>

<script>
import Admin_InputSearch from "@/components/Admin_InputSearch.vue";
import Admin_DanhMuc from "@/components/Admin_DanhMuc.vue";
import DanhMucService from "@/services/danhMuc.service";
import Admin_TraSua from "@/components/Admin_TraSua.vue";
import TraSuaService from "@/services/traSua.service";
import Admin_Header from '@/components/Admin_Header.vue';
export default {
  components: {
    Admin_InputSearch,
    Admin_DanhMuc,
    Admin_TraSua,
    Admin_Header,
  },
  data() {
    return {
      danhMuc: [],
      traSua: [],
      searchText: "",
    };
  },
  // watch: {
  //   // Giám sát các thay đổi của biến searchText.
  //   // Bỏ chọn phần tử đang được chọn trong danh sách.
  //   searchText() {
  //     this.activeIndex = -1;
  //   },
  // },
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
    contactStringsTraSua() {
      return this.traSua.map((trasua) => {
        const { tenTS, giaTS, idDM } = trasua;
        return [tenTS, giaTS, idDM].join("");
      });
    },
    filteredTraSua() {
      if (!this.searchText) return this.traSua;
      return this.traSua.filter((_traSua, index) =>
        this.contactStringsTraSua[index].includes(this.searchText)
      );
    },
  },
  methods: {
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
    async retrieveTraSua() {
      try {
        this.traSua = await TraSuaService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshTraSuaList() {
      this.retrieveTraSua();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshDanhMucList();
    this.refreshTraSuaList();
  },
};
</script>
