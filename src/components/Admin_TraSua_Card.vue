<script>
export default {
  props: {
    traSua: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ traSua.tenTS }}
    </div>
    <div class="p-1">
      <strong>ID Trà sữa:</strong>
      {{ traSua._id }}
    </div>
    <div class="p-1">
      <strong>Gía trà sữa:</strong>
      {{
        Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(traSua.giaTS)
      }}
    </div>
    <div class="p-1">
      <strong>ID Danh Mục:</strong>
      {{ traSua.idDM }}
    </div>
    <div class="p-1">
      <strong>Thời gian:</strong>
      {{ traSua.thoigian }}
    </div>
  </div>
</template>
