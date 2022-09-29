<script>
  export default {
    props: {
      traSua: { type: Array, default: [] },
      activeIndex: { type: Number, default: -1 },
    },
  };
  </script>
  <template>
    <div class="col-6">
      <table class="table table-hover">
        <thead>
          <tr>
            <th colspan="2" style="text-align: center">Danh Sách Thức Uống</th>
          </tr>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên</th>
            <!-- <th scope="col">Quản lý</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(trasua, index) in traSua"
            :key="trasua._id"
            :class="{ active: index === activeIndex }"
          >
            <th scope="row">{{index+1}}</th>
            <td>{{ trasua.tenTS }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  