import { createWebHistory, createRouter } from "vue-router";
import Order from "@/views/Order.vue";
import Admin from "@/views/Admin.vue";
import DanhMuc from "@/views/DanhMuc.vue";
import TraSua from "@/views/TraSua.vue";
const routes = [
  {
    path: "/",
    name: "order",
    component: Order,
  },
  {
    path: "/admin/",
    name: "admin",
    component: Admin,
  },
  {
    path: "/danhMuc/",
    name: "danhmuc",
    component: DanhMuc,
  },
  {
    path: "/traSua/",
    name: "trasua",
    component: TraSua,
  },
  {
    path: "/traSua/:id",
    name: "traSua.edit",
    component: () => import("@/views/TraSua_Edit.vue"),
    props: true,
  },
  {
    path: "/addTraSua",
    name: "traSua.add",
    component: () => import("@/views/TraSua_Add.vue"),
  },
  {
    path: "/danhMuc/:id",
    name: "danhMuc.edit",
    component: () => import("@/views/DanhMuc_Edit.vue"),
    props: true,
  },
  {
    path: "/addDanhMuc",
    name: "danhMuc.add",
    component: () => import("@/views/DanhMuc_Add.vue"),
  },
  {
    path: "/donHang/all/1",
    name: "donhang",
    component: () => import("@/views/DonHang.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
