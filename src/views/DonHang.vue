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
    <div class="row mb-2">
      <div class="col-3"></div>
      <div class="col-3"></div>
      <div class="col-4"></div>
      <div class="col-2">
        <button class="btn btn-sm btn-danger" @click="removeAllDonHang">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <Admin_DonHang :gioHang="filteredGioHang" />
  </div>
</template>

<script>
import Admin_InputSearch from "@/components/Admin_InputSearch.vue";
import GioHangService from "@/services/gioHang.service";
import Admin_Header from "@/components/Admin_Header.vue";
import Admin_DonHang from "@/components/Admin_DonHang.vue";
export default {
  components: {
    Admin_InputSearch,
    Admin_Header,
    Admin_DonHang,
  },
  data() {
    return {
      gioHang: [],
      searchText: "",
    };
  },
  computed: {
    contactStrings() {
      return this.gioHang.map((giohang) => {
        const { giaTS, idTS, soLuongTS, tenTS, thoigian } = giohang;
        return [giaTS, idTS, soLuongTS, tenTS, thoigian].join("");
      });
    },
    filteredGioHang() {
      if (!this.searchText) return this.gioHang;
      return this.gioHang.filter((_gioHang, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },
  },
  methods: {
    async retrieveGioHang() {
      try {
        this.gioHang = await GioHangService.getAll1();
      } catch (error) {
        console.log(error);
      }
    },
    refreshGioHangList() {
      this.retrieveGioHang();
      this.activeIndex = -1;
    },
    async removeAllDonHang() {
      if (confirm("Bạn muốn xóa tất cả Đơn hàng?")) {
        try {
          await GioHangService.deleteAll1();
          this.refreshGioHangList();
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  mounted() {
    this.refreshGioHangList();
  },
};
</script>
