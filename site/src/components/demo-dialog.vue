<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  message?: string
}>(), {
  title: 'Базовый диалог',
  message: 'Это простой диалог, открытый через useDialog().openDialog()'
})

const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div class="bg-[#0d0d1a]/90 backdrop-blur-xl rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 border border-white/10">
    <h2 class="text-xl font-semibold text-white mb-3">{{ title }}</h2>
    <p class="text-gray-300 mb-6">{{ message }}</p>
    <div class="flex justify-end">
      <button
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors cursor-pointer"
        @click="emit('close')"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>
