<template>
  <Form @submit="themDanhMuc" :validation-schema="danhMucFormSchema">
    <div class="form-group">
      <label for="tenDM" style="font-weight:bold ;">Tên Danh Mục</label>
      <Field
        name="tenDM"
        type="text"
        class="form-control"
        v-model="danhMucLocal.tenDM"
      />
      <ErrorMessage name="tenDM" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary" style="font-weight:bold ;">
        <i class="fa-solid fa-floppy-disk"></i> Lưu
      </button>
      <button
        v-if="danhMucLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteDanhMuc"
        style="font-weight:bold ;"
      >
        <i class="fa-solid fa-trash"></i> Xoá
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:danhMuc", "delete:danhMuc"],
  props: {
    danhMuc: { type: Object, required: true },
  },
  data() {
    const danhMucFormSchema = yup.object().shape({
      tenDM: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      danhMucLocal: this.danhMuc,
      danhMucFormSchema,
    };
  },
  methods: {
    themDanhMuc() {
      this.$emit("submit:danhMuc", this.danhMucLocal);
    },
    deleteDanhMuc() {
      this.$emit("delete:danhMuc", this.danhMucLocal.id);
    },
  },
};
</script>
