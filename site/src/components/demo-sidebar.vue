<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div class="p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-[#171717]">Боковая панель</h2>
      <button
        class="text-[#bbb] hover:text-[#666] transition-colors text-xl cursor-pointer"
        @click="emit('close')"
      >
        ×
      </button>
    </div>
    <p class="text-[#888] text-sm mb-4">Это сайдбар, открытый через useSidebarPanel().openSidebar()</p>
    <div class="space-y-2">
      <div class="h-10 bg-black/[0.04] rounded-lg animate-pulse" />
      <div class="h-10 bg-black/[0.04] rounded-lg animate-pulse" />
      <div class="h-10 bg-black/[0.04] rounded-lg animate-pulse" />
    </div>
  </div>
</template>
