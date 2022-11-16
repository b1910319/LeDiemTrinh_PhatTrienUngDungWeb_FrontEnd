<script>
  export default {
    props: {
      danhMuc: { type: Array, default: [] },
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
        <tr v-for="(danhmuc, index) in danhMuc"
        :key="danhmuc._id"
        :class="{ active: index === activeIndex }"
        @click="updateActiveIndex(index)">
          <th scope="row">{{index+1}}</th>
          <td>{{ danhmuc.tenDM }}</td>
          <td>
            <button type="button" class="btn  btn-outline-success" style="font-weight:bold ;"><i class="fa-sharp fa-solid fa-circle-info"></i> Chi tiết</button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  