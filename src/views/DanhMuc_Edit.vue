<template>
  <div v-if="danhMuc" class="page container">
    <div class="row">
      <div class="col-9">
        <Admin_Header />
      </div>
    </div>
    <div class="alert alert-danger mt-3" role="alert" style="font-weight: bold; text-align: center;">
      <div class="row">
        <div class="col-1">
          <a href="/danhmuc/"
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
        <Admin_Form_DanhMuc
      :danhMuc="danhMuc"
      @submit:danhMuc="updateDanhMuc"
      @delete:danhMuc="deleteDanhMuc"
    />
    <p>{{ message }}</p>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>
<script>
import Admin_Form_DanhMuc from "@/components/Admin_Form_DanhMuc.vue";
import DanhMucService from "@/services/danhMuc.service";
import Admin_Header from "@/components/Admin_Header.vue";
export default {
  components: {
    Admin_Form_DanhMuc,
    Admin_Header,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      danhMuc: null,
      message: "",
    };
  },
  methods: {
    async getDanhMuc(id) {
      try {
        this.danhMuc = await DanhMucService.get(id);
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
    async updateDanhMuc(data) {
      try {
        await DanhMucService.update(this.danhMuc._id, data);
        this.message = "Liên hệ được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDanhMuc() {
      if (confirm("Bạn muốn xóa Liên hệ này?")) {
        try {
          await DanhMucService.delete(this.danhMuc._id);
          this.$router.push({ name: "danhmuc" });
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
    this.getDanhMuc(this.id);
    this.message = "";
  },
  // mounted() {
  //   this.refreshDanhMucList();
  // },
};
</script>
