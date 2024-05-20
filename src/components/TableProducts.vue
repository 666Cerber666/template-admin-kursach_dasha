<template>
    <div class="p-4 w-full">
      <div class="flex items-center mb-4 space-x-4">
        <div class="flex flex-col items-start w-1/3">
          <label for="search" class="mb-1 text-xs">Поиск</label>
          <div class="relative flex items-center w-full">
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Артикул товара, продавца или товар"
              class="border border-gray-300 p-2 pl-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <svg
              class="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"></path>
            </svg>
          </div>
        </div>
        <div class="flex flex-col items-start">
          <label for="stock" class="mb-1 text-xs">Остатки</label>
          <select
            id="stock"
            v-model="stockFilter"
            class="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Любые</option>
            <option value="inStock">В наличии</option>
          </select>
        </div>
      </div>
  
      <div class="overflow-x">
        <table class="min-w-full bg-white overflow-x-hidden shadow rounded-lg">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Товар и артикул</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Количество</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Скорость продаж</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Объёмный вес</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in filteredProducts" :key="product.id">
              <td class="px-6 py-4">
                <div @click="OpenProductInfo(product.id)" class="text-sm text-purple-600 font-bold text-center cursor-pointer">{{ product.name }}</div>
                <div class="text-sm text-gray-500">{{ product.sku }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.quantity }} шт.</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.price }} ₽</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.volumeWeight }} л</td>
            </tr>
          </tbody>
        </table>
      </div>
</div>
    <transition name="modal">
    <div v-if="selectedProduct !== null" class="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 rounded-lg w-3/4">
        <div class="flex justify-between items-start mb-4 gap-4">
            <div class="w-full">
            <h2 class="text-lg font-bold">{{ selectedProduct.name }}</h2>
            </div>
            <div class="mt-4 float-right">
            <button @click="closeModal" class="text-white bg-purple-500 flex items-center justify-center hover:text-white-700 focus:outline-none w-8 h-8">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div v-for="warehouse in selectedProduct.warehouses" :key="warehouse.id" class="bg-gray-100 p-4 rounded-md">
            <p class="font-bold">{{ warehouse.name }}</p>
            <p>{{ warehouse.quantity }} шт. (Скорость продаж: {{ warehouse.salesSpeed }})</p>
            </div>
        </div>
        </div>
    </div>
    </transition>
  </template>
  
  <script setup>
    import { ref, computed } from 'vue';

    const searchQuery = ref('');
    const selectedWarehouse = ref('');
    const stockFilter = ref('');
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

    const filteredProducts = computed(() => {
    return products.value.filter((product) => {
        const matchesQuery =
        searchQuery.value === '' ||
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesWarehouse =
        selectedWarehouse.value === '' || product.warehouse === selectedWarehouse.value;

        const matchesStock =
        stockFilter.value === '' || (stockFilter.value === 'inStock' && product.quantity > 0);

        return matchesQuery && matchesWarehouse && matchesStock;
    });
    });

    const OpenProductInfo = (productId) => {
        selectedProduct.value = products.value.find((product) => product.id === productId);
    };

    const closeModal = () => {
        selectedProduct.value = null;
    };
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>

  