<template>
  <div v-if="traSua" class="page container">
    <div class="row">
      <div class="col-9">
        <Admin_Header />
      </div>
    </div>
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
        <div class="col-11">Hiệu chỉnh thông tin</div>
      </div>
    </div>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <Admin_Form_TraSua
          :traSua="traSua"
          :danhMuc="filteredDanhMuc"
          @submit:traSua="updateTraSua"
          @delete:traSua="deleteTraSua"
        />
        <p>{{ message }}</p>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>
<script>
import Admin_Form_TraSua from "@/components/Admin_Form_TraSua.vue";
import TraSuaService from "@/services/traSua.service";
import Admin_Header from "@/components/Admin_Header.vue";
import DanhMucService from "@/services/danhMuc.service";
export default {
  components: {
    Admin_Form_TraSua,
    Admin_Header,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      traSua: null,
      danhMuc: [],
      message: "",
    };
  },
  methods: {
    async getTraSua(id) {
      try {
        this.traSua = await TraSuaService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateTraSua(data) {
      try {
        await TraSuaService.update(this.traSua._id, data);
        this.message = "Liên hệ được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTraSua() {
      if (confirm("Bạn muốn xóa Liên hệ này?")) {
        try {
          await TraSuaService.delete(this.traSua._id);
          this.$router.push({ name: "trasua" });
        } catch (error) {
          console.log(error);
        }
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
  created() {
    this.getTraSua(this.id);
    this.message = "";
  },
  mounted() {
    this.refreshDanhMucList();
  },
};
</script>
