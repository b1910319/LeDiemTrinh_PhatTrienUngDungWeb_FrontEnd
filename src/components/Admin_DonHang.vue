<script>
export default {

  props: {
    gioHang: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  data() {
    return {
      gioHangLocal: this.gioHang,
    };
  },
  computed: {
    tong() {
      let total = 0;
      for (let i = 0; i < this.gioHang.length; i++) {
        const gia = new Number(this.gioHang[i].giaTS);
        total = total + gia;
      }
      return total;
    },
  },
};
</script>
<template>
  <div class="">
    <table class="table table-hover">
      <thead>
        <tr>
          <th colspan="3" style="text-align: center">Danh Sách Đơn Hàng</th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <button type="button" class="btn btn-primary" style="font-weight: bold;">
            Tổng:
            {{
              Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(tong)
            }}
          </button>
        </tr>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên</th>
          <th scope="col">Gía</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Thời gian đặt</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(giohang, index) in gioHang"
          :key="giohang._id"
          :class="{ active: index === activeIndex }"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ giohang.tenTS }}</td>
          <td>
            {{
              Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(giohang.giaTS)
            }}
          </td>
          <td>{{ giohang.soLuongTS }}</td>
          <td>{{ giohang.thoigian }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
