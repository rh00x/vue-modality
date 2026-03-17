<script setup lang="ts">
const props = withDefaults(defineProps<{
  message?: string
  type?: string
}>(), {
  message: 'Уведомление',
  type: 'info'
})

const emit = defineEmits<{ close: [] }>()

const styles: Record<string, { border: string; text: string; icon: string }> = {
  success: { border: 'border-emerald-200', text: 'text-emerald-600', icon: '✓' },
  error: { border: 'border-red-200', text: 'text-red-600', icon: '✕' },
  info: { border: 'border-indigo-200', text: 'text-indigo-600', icon: 'ℹ' },
  warning: { border: 'border-amber-200', text: 'text-amber-600', icon: '⚠' }
}

const s = styles[props.type] || styles.info
</script>

<template>
  <div :class="`toast ${s.border}`">
    <span :class="`text-base ${s.text}`">{{ s.icon }}</span>
    <span class="flex-1 text-sm text-[#444]">{{ props.message }}</span>
    <button class="text-[#bbb] hover:text-[#666] transition-colors cursor-pointer text-lg leading-none" @click="emit('close')">×</button>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid;
  min-width: 300px;
  background: #fff;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}
</style>
