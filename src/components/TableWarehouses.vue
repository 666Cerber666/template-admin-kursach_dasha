<template>
    <div class="p-4 w-full">
        <div class="grid grid-cols-2 gap-4">
            <div v-for="product in products" :key="product.id" class="bg-gray-100 p-4 rounded-md">
            <p class="font-bold">{{ product.warehouse }}</p>
            <p>{{ product.quantity }} шт. (Скорость продаж: {{ product.price }})</p>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
    import { ref, computed } from 'vue';

    const selectedWarehouse = ref('');
    const selectedProduct = ref(null);

    const products = ref([
    {
        id: 1,
        name: 'Кабель для зарядки iPhone iPad Lightning кабель 1м, 2.4A, зарядка для iphone, зарядка для iphone, айфон, провод, шнур, лайтнинг',
        sku: '8pin_1m',
        warehouse: 'Москва',
        quantity: 1056,
        price: 1584000,
        volumeWeight: 32,
    },
    {
        id: 2,
        name: 'Лампа w5w светодиодная t10, в габариты led, 8 панель / белый свет, 2 шт.',
        sku: 'ledT10',
        warehouse: 'Москва',
        quantity: 378,
        price: 63882,
        volumeWeight: 38,
    },
    {
        id: 3,
        name: 'Переходник сетевой Krutoff с любой вилки на российскую с заземлением',
        sku: 'adapterEUplug2',
        warehouse: 'Москва',
        quantity: 262,
        price: 25414,
        volumeWeight: 16,
    },
    {
        id: 4,
        name: 'Коннектор cat.5e UTP RJ45 штекер 8P8C, неэкранированный, быстросжимной, 10 шт.',
        sku: 'connectorRJ45',
        warehouse: 'Москва',
        quantity: 233,
        price: 29125,
        volumeWeight: 5,
    },
    {
        id: 5,
        name: 'Адаптер переходник с поворотной вилкой Европейского стандарта, Quivira',
        sku: 'adapter180',
        warehouse: 'Москва',
        quantity: 232,
        price: 67280,
        volumeWeight: 24,
    },
    {
        id: 6,
        name: 'Термопаста GD900 8A1, теплопроводящий герметик, термоинтерфейс, 7 гр, 4.8W/m-K',
        sku: 'thermopaste',
        warehouse: 'Москва',
        quantity: 222,
        price: 66600,
        volumeWeight: 6,
    },
    ]);
</script>

<style scoped>

</style>

  