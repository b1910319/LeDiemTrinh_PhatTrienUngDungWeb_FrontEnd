<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import GioHangService from "@/services/gioHang.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    gioHang: { type: Array, required: true },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["submit:thanhToan", "delete:lamMoi"],
  methods: {
    thanhToan() {
      this.$emit("submit:thanhToan", this.gioHangLocal);
    },
    async thanhToan() {
      try {
        await GioHangService.updateMany();
      } catch (error) {
        console.log(error);
      }
    },
    async lamMoi() {
      if (confirm("Bạn muốn xóa tất cả sản phẩm trong giỏ hàng?")) {
        try {
          await GioHangService.deleteAll();
        } catch (error) {
          console.log(error);
        }
      }
    },
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
        // total += this.gioHang.giaTS[i];
        const gia = new Number(this.gioHang[i].giaTS);
        total = total + gia;
      }
      return total;
    },
  },
};
</script>
<template>
  <div>
    <div
      class="alert alert-danger"
      role="alert"
      style="font-weight: bold; text-align: center; font-size: 20px"
    >
      Giỏ Hàng
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Gía</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(gioHangLocal, index) in gioHang"
          :key="gioHangLocal._id"
          :class="{ active: index === activeIndex }"
        >
          <th style="width: 10%">{{ index + 1 }}</th>
          <td style="width: 30%" scope="row">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                v-model="gioHangLocal.tenTS"
                readonly
              />
            </div>
          </td>
          <td style="width: 30%">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                v-model="gioHangLocal.soLuongTS"
                readonly
              />
            </div>
          </td>
          <td style="width: 30%">
            {{
              Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(gioHangLocal.soLuongTS * gioHangLocal.giaTS)
            }}
          </td>
          <td></td>
        </tr>
        <td></td>
        <td>
          <button
            style="width: 100%; font-weight: bold"
            class="btn btn-success"
            @click="lamMoi"
          >
            Làm mới
          </button>
        </td>
        <td>
          <button
            style="width: 100%; font-weight: bold"
            class="btn btn-warning"
            @click="thanhToan"
          >
            Thanh Toán
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger" style="font-weight: bold;">
            Tổng:
            {{
              Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(tong)
            }}
          </button>
        </td>
      </tbody>
    </table>
  </div>
</template>
