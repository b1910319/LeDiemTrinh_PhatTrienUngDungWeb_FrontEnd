<script>
export default {
  props: {
    traSua: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>
<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên</th>
        <th scope="col">Quản lý</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(trasua, index) in traSua"
      :key="trasua._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)">
        <th scope="row">{{index+1}}</th>
        <td>{{ trasua.tenTS }}</td>
        <td>
          <button type="button" class="btn  btn-outline-success"><i class="fa-sharp fa-solid fa-circle-info"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(trasua, index) in traSua"
      :key="trasua._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ trasua.tenTS }}
    </li>
  </ul> -->
</template>
