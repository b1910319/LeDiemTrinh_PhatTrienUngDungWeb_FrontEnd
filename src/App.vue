<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>
<template>
  <div id="app" class="container-fluid">
    <AppHeader />
    <div class="container-fluid mt-3">
      <router-view />
    </div>
  </div>
</template>
