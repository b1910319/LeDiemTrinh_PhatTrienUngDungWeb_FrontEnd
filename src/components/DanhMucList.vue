<script>
export default {
  props: {
    danhMuc: { type: Array, default: [] },
  },
};
</script>
<template>
  <div>
    <ul class="row">
      <li
        style="list-style: none"
        class="col-3"
        v-for="(danhmuc) in danhMuc"
        :key="danhmuc._id"
      >
        <button type="button" class="btn btn-info" style="width: 100% ;">
          {{ danhmuc.tenDM }}
        </button>
      </li>
    </ul>
  </div>
</template>
