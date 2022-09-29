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
          <i class="fa-solid fa-list-check"></i> Danh Sách Trà Sữa
        </div>
        <div class="mt-2 mb-2">
          <div class="row">
            <div class="col-6">
              <button
                class="btn btn-sm btn-warning"
                style="color: white; font-weight: bold"
                @click="goToAddTraSua"
              >
                <i class="fas fa-plus"></i> Thêm mới
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-sm btn-danger"
                style="font-weight: bold"
                @click="removeAllTraSuas"
              >
                <i class="fas fa-trash"></i> Xóa tất cả
              </button>
            </div>
          </div>
        </div>
        <Admin_TraSuaList
          v-if="filteredTraSuasCount > 0"
          :traSua="filteredTraSuas"
          v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có trà sữa nào.</p>
      </div>
      <div class="mt-3 col-md-6">
        <div v-if="activeTraSua">
          <div
            class="alert alert-danger"
            role="alert"
            style="font-weight: bold; text-align: center"
          >
            <i class="fa-sharp fa-solid fa-circle-info"></i> Chi tiết
          </div>
          <Admin_TraSua_Card :traSua="activeTraSua" />
          <router-link
            :to="{
              name: 'traSua.edit',
              params: { id: activeTraSua._id },
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
import Admin_TraSuaList from "@/components/Admin_TraSuaList.vue";
import TraSuaService from "@/services/traSua.service";
import Admin_TraSua_Card from "@/components/Admin_TraSua_Card.vue";
export default {
  components: {
    Admin_InputSearch,
    Admin_TraSuaList,
    Admin_TraSua_Card,
    Admin_Header,
  },
  data() {
    return {
      traSuas: [],
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
    trasuaStrings() {
      return this.traSuas.map((traSua) => {
        const { tenTS, giaTS, idDM, thoigian } = traSua;
        return [tenTS, giaTS, idDM, thoigian].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredTraSuas() {
      if (!this.searchText) return this.traSuas;
      return this.traSuas.filter((_traSua, index) =>
        this.trasuaStrings[index].includes(this.searchText)
      );
    },
    activeTraSua() {
      if (this.activeIndex < 0) return null;
      return this.filteredTraSuas[this.activeIndex];
    },
    filteredTraSuasCount() {
      return this.filteredTraSuas.length;
    },
  },
  methods: {
    async retrieveTraSuas() {
      try {
        this.traSuas = await TraSuaService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveTraSuas();
      this.activeIndex = -1;
    },
    async removeAllTraSuas() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await TraSuaService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddTraSua() {
      this.$router.push({ name: "traSua.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
