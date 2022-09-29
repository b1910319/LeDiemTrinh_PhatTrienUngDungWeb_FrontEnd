<script>
  import DanhMucService from "@/services/danhMuc.service";
export default {
  props: {
    danhMuc: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    id: { type: String, required: true },
  },
  emits: ["delete:xoaDanhMuc"],
  data() {
    return {
      danhMucLocal: this.danhMuc,
    };
  },
  methods: {
    async get(id) {
      this.danhMuc = await DanhMucService.get(id);
    },
    xoaDanhMuc() {
      this.$emit("delete:xoaDanhMuc", this.danhMucLocal.id);
    },
    async xoaDanhMuc() {
      if (confirm("Bạn muốn xóa Liên hệ này?")) {
        try {
          await DanhMucService.delete(this.danhMucLocal._id);
          // this.$router.push({ name: "contactbook" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.get(this.id);
  },
};
</script>
<template>
  <div class="col-6">
    <table class="table table-hover">
      <thead>
        <tr>
          <th colspan="3" style="text-align: center">Danh Sách Danh Mục</th>
        </tr>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên Danh Mục</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(danhmuc, index) in danhMuc"
          :key="danhmuc._id"
          :class="{ active: index === activeIndex }"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ danhmuc.tenDM }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  