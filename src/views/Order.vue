<template>
  <div>
    <div class="row">
      <div class="col-6">
        <div class="row mb-1">
          <div class="col-5"></div>
          <div class="col-7">
            <InputSearch v-model="searchText" />
          </div>
        </div>
        <DanhMucList :danhMuc="filteredDanhMuc" />
        <TraSuaList :traSua="filteredTraSua" />
      </div>
      <div class="col-6">
        <GioHang :gioHang="filteredGioHang"/>
      </div>
    </div>
  </div>
</template>
<script>
import InputSearch from "@/components/InputSearch.vue";
import DanhMucList from "@/components/DanhMucList.vue";
import TraSuaList from "@/components/TraSuaList.vue";
import DanhMucService from "@/services/danhMuc.service";
import TraSuaService from "@/services/traSua.service";
import GioHang from "@/components/GioHang.vue"
import GioHangService from "@/services/gioHang.service";
export default {
  components: {
    TraSuaList,
    DanhMucList,
    InputSearch,
    GioHang,
  },
  data() {
    return {
      danhMuc: [],
      traSua: [],
      gioHang:[],
      activeIndex: -1,
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
    // Chuyển các đối tượng danh mục, trà sữa thành chuỗi để tiện cho tìm kiếm.
    contactStringsTraSua() {
      return this.traSua.map((trasua) => {
        const { tenTS, giaTS, idDM } = trasua;
        return [tenTS, giaTS, idDM].join("");
      });
    },

    contactStringsGioHang() {
      return this.gioHang.map((giohang) => {
        const { tenTS, giaTS, idDM, soLuongTS, tinhTrang } = giohang;
        return [tenTS, giaTS, idDM, soLuongTS, tinhTrang].join("");
      });
    },

    contactStrings() {
      return this.danhMuc.map((danhmuc) => {
        const { tenDM } = danhmuc;
        return [tenDM].join("");
      });
    },

    // Trả về các danh mục, trà sữa có chứa thông tin cần tìm kiếm.
    filteredTraSua() {
      if (!this.searchText) return this.traSua;
      return this.traSua.filter((_traSua, index) =>
        this.contactStringsTraSua[index].includes(this.searchText)
      );
    },
    // activeTraSua() {
    //   if (this.activeIndex < 0) return null;
    //   return this.filteredTraSua[this.activeIndex];
    // },
    // filteredTraSuaCount() {
    //   return this.filteredTraSua.length;
    // },

    filteredDanhMuc() {
      if (!this.searchText) return this.danhMuc;
      return this.danhMuc.filter((_danhMuc, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },
    filteredGioHang() {
      if (!this.searchText) return this.gioHang;
      return this.gioHang.filter((gioHang, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },
    // activeDanhMuc() {
    //   if (this.activeIndex < 0) return null;
    //   return this.filteredDanhMuc[this.activeIndex];
    // },
    // filteredDanhMucCount() {
    //   return this.filteredDanhMuc.length;
    // },
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
    // async removeAllDanhMuc() {
    //   if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
    //     try {
    //       await DanhMucService.deleteAll();
    //       this.refreshDanhMucList();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // },

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
    async retrieveGioHang() {
      try {
        this.gioHang = await GioHangService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshGioHangList() {
      this.retrieveGioHang();
      this.activeIndex = -1;
    },
    // async removeAllContacts() {
    //   if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
    //     try {
    //       await DanhMucService.deleteAll();
    //       this.refreshTraSuaList();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // },
  },
  mounted() {
    this.refreshDanhMucList();
    this.refreshTraSuaList();
    this.refreshGioHangList();
  },
};
</script>


