<script>
export default {
  props: {
    modelValue: { type: String, default: "" },
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>
<template>
  <nav class="navbar">
    <div style="width: 100%">
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
          :value="modelValue"
          @input="updateModelValue"
          @keyup.enter="submit"
        />
        <button class="btn btn-outline-success" type="button" @click="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>
