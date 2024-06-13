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
              placeholder="Артикул поставки, склада или дата"
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
          <label for="stock" class="mb-1 text-xs">Склад</label>
          <select
            id="stock"
            v-model="stockFilter"
            class="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Любые</option>
            <option value="inStock">Москва</option>
          </select>
        </div>
        <div class="w-full mt-4">
            <button @click="GoToAddSupplie()" type="submit" class="flex w-1/4 justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Добавить</button>
        </div>
      </div>
  
      <div class="overflow-x-auto">
        <table class="w-full bg-white overflow-x-hidden shadow rounded-lg">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Штрих-код</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Склад</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Количество</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Объёмный вес</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="supplie in filteredProducts" :key="supplie.id">
              <td class="px-6 py-4 text-left">
                <div class="text-sm text-gray-500 text-center cursor-pointer">{{ supplie.name }}</div>
              </td>
              <td class="px-6 py-4 text-left whitespace-nowrap text-sm font-bold text-purple-500">{{ supplie.warehouse }}</td>
              <td class="px-6 py-4 text-left whitespace-nowrap text-sm" :class="getStatusColorClass(supplie.status)">{{ supplie.status }}</td>
              <td class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">{{ supplie.quantity }} шт.</td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-600 font-bold text-center cursor-pointer">{{ formattedDate(supplie) }}</div>
                <div class="text-sm text-gray-500">{{ supplie.datetime }}</div>
              </td>
              <td class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">{{ supplie.place }} л</td>
            </tr>
          </tbody>
        </table>
      </div>
</div>
  </template>
  
  <script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { format } from 'date-fns';
    import ruLocale from 'date-fns/locale/ru';

    const searchQuery = ref('');
    const selectedWarehouse = ref('');
    const stockFilter = ref('');
    const router = useRouter();

    const supplies = ref([
    {
        id: 1,
        name: 'SHP00000000279266',
        sku: '8pin_1m',
        warehouse: 'Москва',
        status: 'Поставка Проверена и завершена с расхождениями',
        date: '03-05-2024',
        datetime: '19:00-20:00',
        quantity: 961,
        place: 81,
    },
    {
        id: 2,
        name: 'SHP00000000279266',
        sku: 'ledT10',
        warehouse: 'Москва',
        status: 'Поставка Проверена и завершена с расхождениями',
        date: '03-05-2024',
        datetime: '19:00-20:00',
        quantity: 961,
        place: 81,
    },
    {
        id: 3,
        name: 'SHP00000000279266',
        sku: 'adapterEUplug2',
        warehouse: 'Москва',
        status: 'Поставка Проверена и завершена с расхождениями',
        date: '03-05-2024',
        datetime: '19:00-20:00',
        quantity: 961,
        place: 81,
    },
    {
        id: 4,
        name: 'SHP00000000279266',
        sku: 'connectorRJ45',
        warehouse: 'Москва',
        status: 'Поставка Проверена и завершена с расхождениями',
        date: '03-05-2024',
        datetime: '19:00-20:00',
        quantity: 961,
        place: 81,
    },
    {
        id: 5,
        name: 'SHP00000000279266',
        sku: 'adapter180',
        warehouse: 'Москва',
        status: 'Поставка Проверена и завершена с расхождениями',
        date: '03-05-2024',
        datetime: '19:00-20:00',
        quantity: 961,
        place: 81,
    },
    {
        id: 6,
        name: 'SHP00000000279266',
        sku: 'thermopaste',
        warehouse: 'Москва',
        status: 'Поставка Проверена и завершена с расхождениями',
        date: '03-05-2024',
        datetime: '19:00-20:00',
        quantity: 961,
        place: 81,
    },
    ]);

    const filteredProducts = computed(() => {
    return supplies.value.filter((supplie) => {
        const matchesQuery =
        searchQuery.value === '' ||
        supplie.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        supplie.sku.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesWarehouse =
        selectedWarehouse.value === '' || supplie.warehouse === selectedWarehouse.value;

        const matchesStock =
        stockFilter.value === '' || (stockFilter.value === 'inStock' && product.quantity > 0);

        return matchesQuery && matchesWarehouse && matchesStock;
    });
    });

    const formattedDate = (supplie) => {
    const dateParts = supplie.date.split('-');
    const formatted = `${dateParts[0]} ${getRussianMonth(dateParts[1])} ${dateParts[2]}`;
    return formatted;
};

const getRussianMonth = (month) => {
    const months = {
        '01': 'января',
        '02': 'февраля',
        '03': 'марта',
        '04': 'апреля',
        '05': 'мая',
        '06': 'июня',
        '07': 'июля',
        '08': 'августа',
        '09': 'сентября',
        '10': 'октября',
        '11': 'ноября',
        '12': 'декабря',
    };
    return months[month];
};

const getStatusColorClass = (status) => {
    if (status === 'Поставка Проверена и завершена с расхождениями') {
      return {
        'bg-green-200': true,
        'rounded-md': true
      }; // Установите желаемый цвет для этого статуса
    } else if (status === 'Другой статус') {
        return {
        'bg-blue-200': true,
        'rounded-md': true
      }; // Установите желаемый цвет для этого статуса
    } else {
        return {
        'bg-red-200': true,
        'rounded-md': true
      }; // Установите желаемый цвет для этого статуса
    }
  };

const GoToAddSupplie = () => {
    router.push({ name: 'AddSupplie' });
}

</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>

  