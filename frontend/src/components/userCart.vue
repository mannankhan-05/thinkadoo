<template>
  <div>
    user cart
    <div v-for="item in cart" :key="item.id">
      {{ item.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "userCart",

  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    };
  },
});
</script>

<style></style>
