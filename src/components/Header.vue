<template>
  <Disclosure as="nav" class="bg-gray-800 flex items-center justify-center">
      <div class="relative flex h-16 items-center justify-between">
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
          <a v-for="item in navigation" :key="item.name" @click="handleNavigation(item)" 
             :class="{'bg-gray-900 text-white': item.current, 'text-gray-300 hover:bg-gray-700 hover:text-white': !item.current, 'block rounded-md px-3 py-2 text-base font-medium cursor-pointer': true}"
             :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
        </div>
      </DisclosurePanel>
  </Disclosure>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router';

const router = useRouter();

const emits = defineEmits(['navigate']) // определяем событие для передачи в родительский компонент

const handleNavigation = (item) => {
  emits('navigate', item) // передаем объект item вместо его имени
}

const logout = () => {
  localStorage.clear();
  router.push('/');
}
</script>
