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
      <!-- <div class="p-1">
        <strong>ID Trà sữa:</strong>
        {{ danhMuc._id }}
      </div>
      <div class="p-1">
        <strong>Gía trà sữa:</strong>
        {{ danhMuc.giaTS }}
      </div>
      <div class="p-1">
        <strong>ID Danh Mục:</strong>
        {{ danhMuc.idDM }}
      </div> -->
      <div class="p-1">
        <strong>Thời gian:</strong>
        {{ danhMuc.thoigian }}
      </div>
    </div>
  </template>
  