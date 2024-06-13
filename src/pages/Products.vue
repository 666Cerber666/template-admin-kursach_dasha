<template>
  <Header class="block lg:hidden"/>
  <div class="flex flex-row w-full mb-4 h-4/5">
      <SubMenu />
      <TableProducts class="mt-4"/>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import SubMenu from '../components/SubMenu.vue';
import TableProducts from '../components/TableProducts.vue';

</script>

<style scoped>
</style>
