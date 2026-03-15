<script setup lang="ts">
const props = withDefaults(defineProps<{
  message?: string
  type?: string
}>(), {
  message: 'Уведомление',
  type: 'info'
})

const emit = defineEmits<{ close: [] }>()

const colors: Record<string, string> = {
  success: 'bg-green-800 border-green-600 text-green-100',
  error: 'bg-red-800 border-red-600 text-red-100',
  info: 'bg-gray-800 border-gray-600 text-gray-100',
  warning: 'bg-yellow-800 border-yellow-600 text-yellow-100'
}

const icons: Record<string, string> = {
  success: '✓', error: '✕', info: 'ℹ', warning: '⚠'
}
</script>

<template>
  <div :class="`flex items-center gap-3 px-4 py-3 rounded-full border shadow-lg min-w-[280px] ${colors[props.type]}`">
    <span class="text-lg">{{ icons[props.type] }}</span>
    <span class="flex-1 text-sm">{{ props.message }}</span>
    <button class="opacity-60 hover:opacity-100 transition-opacity cursor-pointer" @click="emit('close')">×</button>
  </div>
</template>
