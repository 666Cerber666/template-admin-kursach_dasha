<template>
    <Header class="block lg:hidden"/>
    <div class="flex flex-row w-full mb-4 h-4/5">
        <SubMenu />
        <TableSupplies class="mt-4"/>
    </div>
  </template>
  
  <script setup>
  import Header from '../components/Header.vue';
  import SubMenu from '../components/SubMenu.vue';
  import TableSupplies from '../components/TableSupplies.vue';
  
  </script>
  
  <style scoped>

  </style>
  