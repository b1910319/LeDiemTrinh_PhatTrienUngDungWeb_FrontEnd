<!-- <template>
  <div class="container">
    <div class="row">
      <div class="col-9">
        <Admin_Header/>
      </div>
      <div class="col-3">
        <Admin_InputSearch v-model="searchText" />
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="alert alert-danger" role="alert" style="width: 100%; font-size: 20px; font-weight: bold; text-align: center;">
          Thêm Danh Mục
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <Admin_Form_DanhMuc :danhMuc="danhMuc" @submit:danhMuc="createDanhMuc" />
        </div>
        <Admin_DanhMuc :danhMuc="filteredDanhMuc"/>
        
      </div>
    </div>
  </div>
</template>

<script>
import Admin_InputSearch from "@/components/Admin_InputSearch.vue";
import Admin_Form_DanhMuc from "@/components/Admin_Form_DanhMuc.vue";
import Admin_DanhMuc from "@/components/Admin_DanhMuc.vue";
import DanhMucService from "@/services/danhMuc.service";
import Admin_Header from '@/components/Admin_Header.vue';
export default {
  components: {
    Admin_InputSearch,
    Admin_Form_DanhMuc,
    Admin_DanhMuc,
    Admin_Header,
  },
  data() {
    return {
      danhMuc: {},
      activeIndex: -1,
      searchText: "",
    };
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
  methods: {
    async createDanhMuc(data) {
      try {
        await DanhMucService.create(data);
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
  mounted() {
    this.refreshDanhMucList();
  },
};
</script> -->

<template>
  <div class="container">
    <div class="row">
      <div class="col-9">
        <Admin_Header />
      </div>
      <div class="col-3">
        <Admin_InputSearch v-model="searchText" />
      </div>
      <div class="mt-3 col-md-6">
        <div
          class="alert alert-info"
          role="alert"
          style="font-weight: bold; text-align: center"
        >
          <i class="fa-solid fa-list-check"></i> Danh Sách Danh Mục
        </div>
        <div class="mt-2 mb-2">
          <div class="row">
            <div class="col-6">
              <button
                class="btn btn-sm btn-warning"
                style="color: white; font-weight: bold"
                @click="goToAddDanhMuc"
              >
                <i class="fas fa-plus"></i> Thêm mới
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-sm btn-danger"
                style="font-weight: bold"
                @click="removeAllDanhMucs"
              >
                <i class="fas fa-trash"></i> Xóa tất cả
              </button>
            </div>
          </div>
        </div>
        <Admin_DanhMucList
          v-if="filteredDanhMucsCount > 0"
          :danhMuc="filteredDanhMucs"
          v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có trà sữa nào.</p>
      </div>
      <div class="mt-3 col-md-6">
        <div v-if="activeDanhMuc">
          <div
            class="alert alert-danger"
            role="alert"
            style="font-weight: bold; text-align: center"
          >
            <i class="fa-sharp fa-solid fa-circle-info"></i> Chi tiết
          </div>
          <Admin_DanhMuc_Card :danhMuc="activeDanhMuc" />
          <router-link
            :to="{
              name: 'danhMuc.edit',
              params: { id: activeDanhMuc._id },
            }"
          >
            <button type="button" class="btn btn-warning" style="color: white">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Admin_Header from "@/components/Admin_Header.vue";
import Admin_InputSearch from "@/components/Admin_InputSearch.vue";
import Admin_DanhMucList from "@/components/Admin_DanhMucList.vue";
import DanhMucService from "@/services/danhMuc.service";
import Admin_DanhMuc_Card from "@/components/Admin_DanhMuc_Card.vue";
export default {
  components: {
    Admin_InputSearch,
    Admin_DanhMucList,
    Admin_DanhMuc_Card,
    Admin_Header,
  },
  data() {
    return {
      danhMucs: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    danhMucStrings() {
      return this.danhMucs.map((danhMuc) => {
        const { tenDM, thoigian } = danhMuc;
        return [tenDM, thoigian].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredDanhMucs() {
      if (!this.searchText) return this.danhMucs;
      return this.danhMucs.filter((_danhMuc, index) =>
        this.danhMucStrings[index].includes(this.searchText)
      );
    },
    activeDanhMuc() {
      if (this.activeIndex < 0) return null;
      return this.filteredDanhMucs[this.activeIndex];
    },
    filteredDanhMucsCount() {
      return this.filteredDanhMucs.length;
    },
  },
  methods: {
    async retrieveDanhMucs() {
      try {
        this.danhMucs = await DanhMucService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveDanhMucs();
      this.activeIndex = -1;
    },
    async removeAllDanhMucs() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await DanhMucService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddDanhMuc() {
      this.$router.push({ name: "danhMuc.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
