<template>
    <Header class="block lg:hidden"/>
    <div class="flex flex-row w-full mb-4 gap-4 h-4/5">
        <SubMenu />
        <div class="p-4 w-full">
            <div class="flex flex-col items-start mb-4 gap-4 pr-2">
                <h1 class="text-2xl font-bold">Добавить заявку на поставку</h1>
                <div class="flex flex-col rounded-xl items-start border-2 w-full p-2">
                <h2 class="text-xl font-bold mb-2">Склад</h2>
                <select class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-emerald-500">
                    <option>Склад 1</option>
                    <option>Склад 2</option>
                    <option>Склад 3</option>
                </select>
                </div>

                <div class="flex flex-col rounded-xl items-start border-2 w-full p-2">
                    <h2 class="text-xl font-bold mb-2">Дата и время поставки</h2>
                    <datepicker type="date" v-model="selectedDate" class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-emerald-500"></datepicker>
                </div>

                <div class="flex flex-col rounded-xl items-start border-2 w-full p-2">
                <h2 class="text-xl font-bold mb-2">Товары в поставке</h2>
                <!-- Здесь будут выбранные товары и их кол-во -->
                <div class="grid grid-cols-1 w-full">
                    <div class="grid grid-cols-4 w-full"><img src=".."><span>Товар</span><span>Количество</span><button type="submit" class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Удалить товар</button></div> 
                    <!-- Тут нужен массив -->
                </div>
                </div>
                <div class="flex justify-between w-full">
                    <button @click="OpenModalProducts()" type="submit" class="flex w-1/4 justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Добавить товары</button>
                    <button type="submit" class="flex w-1/4 justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Добавить поставку</button>
                </div>
            </div>
            </div>

        <!-- Модалка товаров -->
    <transition name="modal">
    <div v-if="ModalProducts !== false" class="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 rounded-lg w-3/4">
        <div class="flex justify-between items-start mb-4 gap-4">
            <div class="w-full">
            <h2 class="text-lg font-bold">Список товаров</h2>
            </div>
            <div class="mt-4 float-right">
            <button @click="closeModal" class="text-white bg-purple-500 flex items-center justify-center hover:text-white-700 focus:outline-none w-8 h-8">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-4 overflow-x-auto">
            <table class="min-w-full bg-white shadow rounded-lg">
                <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500">
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Товар</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Количество</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <!-- Сюда список товаров -->
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img src="" class="w-10 h-10 rounded-full mr-4">
                        <span class="text-lg font-semibold">НазваниеТовара</span>
                    </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                    <input type="number" class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
    </transition>
    </div>
  </template>
  
  <script setup>
    import Header from '../components/Header.vue';
    import SubMenu from '../components/SubMenu.vue';
    import Datepicker from 'vue3-datepicker';
    import { ref, computed } from 'vue';
    import { format } from 'date-fns';
    import ruLocale from 'date-fns/locale/ru';

    const searchQuery = ref('');
    const selectedWarehouse = ref('');
    const stockFilter = ref('');
    const ModalProducts = ref(false);
    let selectedDate = ref(new Date());


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

    const OpenModalProducts = () => {
        ModalProducts.value = true
    };

    const closeModal = () => {
        ModalProducts.value = false;
    };

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

</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>

  