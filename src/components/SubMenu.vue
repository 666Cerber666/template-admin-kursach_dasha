<template>
    <div>
      <div :class="['h-screen', 'w-64', 'fixed', 'bg-gray-800', 'text-white', 'z-50', 'transition-transform', 'transform', sidebarOpen ? 'translate-x-0' : '-translate-x-full', 'lg:translate-x-0']">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-700 lg:justify-center">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <router-link to="/">
                <div class="flex flex-shrink-0 items-center">
                <img class="h-8 w-auto" src="./../assets/logo.png" alt="Your Company" />
                </div>
            </router-link>
            </div>
            <button @click="toggleSidebar" class="text-gray-400 hover:text-white focus:outline-none lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav class="flex-1 px-2 py-4">
            <ul>
              <li class="py-2">
                <router-link to="/" class="flex items-center px-4 py-2 text-sm text-white hover:bg-purple-700 hover:text-white rounded-md">
                  Мои Товары
                </router-link>
              </li>
              <li class="py-2">
                <router-link to="/WareHouses" class="flex items-center px-4 py-2 text-sm text-white hover:bg-purple-700 hover:text-white rounded-md">
                  Склады
                </router-link>
              </li>
              <li class="py-2">
                <router-link to="/Supplies" class="flex items-center px-4 py-2 text-sm text-white hover:bg-purple-700 hover:text-white rounded-md">
                  Поставки
                </router-link>
              </li>
              <!-- Добавьте дополнительные ссылки по мере необходимости -->
            </ul>
          </nav>
        </div>
      </div>
      <button @click="toggleSidebar" class="fixed top-4 left-4 z-50 text-gray-500 hover:text-white focus:outline-none lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div :class="['lg:ml-64', 'transition-transform', 'duration-300', sidebarOpen ? 'transform-none' : 'transform']">
        <!-- Основное содержание страницы -->
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sidebarOpen: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Дополнительные стили (если необходимо) */
  </style>
  