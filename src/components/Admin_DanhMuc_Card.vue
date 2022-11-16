<script>
  export default {
    props: {
      danhMuc: { type: Object, required: true },
    },
  };
  </script>
  <template>
    <div>
      <div class="p-1">
        <strong>Tên:</strong>
        {{ danhMuc.tenDM }}
      </div>
      <div class="p-1">
        <strong>Thời gian:</strong>
        {{ danhMuc.thoigian }}
      </div>
    </div>
  </template>
  