<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div class="p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-white">Боковая панель</h2>
      <button
        class="text-gray-400 hover:text-white transition-colors text-xl cursor-pointer"
        @click="emit('close')"
      >
        ×
      </button>
    </div>
    <p class="text-gray-400 text-sm mb-4">Это сайдбар, открытый через useSidebarPanel().openSidebar()</p>
    <div class="space-y-2">
      <div class="h-10 bg-gray-800 rounded-lg animate-pulse" />
      <div class="h-10 bg-gray-800 rounded-lg animate-pulse" />
      <div class="h-10 bg-gray-800 rounded-lg animate-pulse" />
    </div>
  </div>
</template>
