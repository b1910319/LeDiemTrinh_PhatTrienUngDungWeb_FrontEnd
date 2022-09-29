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
    traSua: { type: Object, required: true },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex", "submit:submitTraSua"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    submitTraSua() {
      this.$emit("submit:submitTraSua", this.trasuaLocal);
    },
    async submitTraSua(data) {
      try {
        await GioHangService.create(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      trasuaLocal: this.traSua,
    };
  },
};
</script>
<template>
  <div>
    <ul class="row">
      <li
        style="list-style: none"
        class="col-4"
        v-for="(trasuaLocal, index) in traSua"
        :key="trasuaLocal._id"
        :class="{ active: index === activeIndex }"
        @click="updateActiveIndex(index)"
      >
        <Form @submit="submitTraSua">
          <button
            type="submit"
            class="btn btn-outline-secondary"
            style="width: 100%; border: none;"
          >
          
            <Field
              name="tenTS"
              type="text"
              class="form-control"
              v-model="trasuaLocal.tenTS" readonly
              style="color: blue; font-weight: bold"
            />
            <Field
              name="giaTS"
              type="text"
              class="form-control mt-2"
              v-model="trasuaLocal.giaTS" readonly
              style="color: black; font-weight: bold"
            />
            <Field
              name="idTS"
              type="hidden"
              class="form-control mt-2"
              v-model="trasuaLocal._id" readonly
              style="color: black; font-weight: bold"
            />
            <Field
              name="idTS"
              type="hidden"
              class="form-control mt-2"
              v-model="trasuaLocal.giaTS" readonly
              style="color: black; font-weight: bold"
            />
          </button>
        </Form>
      </li>
    </ul>
  </div>
</template>
