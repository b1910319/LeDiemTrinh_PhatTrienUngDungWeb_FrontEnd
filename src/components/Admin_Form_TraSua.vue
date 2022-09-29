<template>
  <Form @submit="submitTraSua" :validation-schema="traSuaFormSchema">
    <div class="form-group">
      <label for="name">Tên: </label>
      <Field
        name="tenTS"
        type="text"
        class="form-control"
        v-model="traSuaLocal.tenTS"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">Gía: </label>
      <Field
        name="giaTS"
        type="Number"
        class="form-control"
        v-model="traSuaLocal.giaTS"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Danh Mục: </label>
      <!-- <Field
        name="idDM"
        type="text"
        class="form-control"
        v-model="traSuaLocal.idDM"
      /> -->
      <select class="form-group" name="idDM">
        <option selected v-for="danhmuc in danhMuc" :key="danhmuc._id">
          {{ danhmuc.tenDM }}
        </option>
      </select>
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">
        <i class="fa-solid fa-floppy-disk"></i>
      </button>
      <button
        v-if="traSuaLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteTraSua"
      >
        <i class="fa-solid fa-trash"></i>
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
  emits: ["submit:traSua", "delete:traSua"],
  props: {
    traSua: { type: Object, required: true },
    danhMuc: { type: Object, required: true },
  },
  data() {
    const traSuaFormSchema = yup.object().shape({
      tenTS: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      giaTS: yup
        .string()
        .required("Giá phải có giá trị.")
        .min(2, "Gía phải ít nhất 2 ký tự.")
        .max(10, "Giá có nhiều nhất 10 ký tự."),
    });
    return {
      traSuaLocal: this.traSua,
      traSuaFormSchema,
    };
  },
  methods: {
    submitTraSua() {
      this.$emit("submit:traSua", this.traSuaLocal);
    },
    deleteTraSua() {
      this.$emit("delete:traSua", this.traSuaLocal.id);
    },
  },
};
</script>
