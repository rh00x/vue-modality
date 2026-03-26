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
  success: { border: 'border-[#4AF626]/30', text: 'text-[#4AF626]', icon: '>>>' },
  error: { border: 'border-accent/30', text: 'text-accent', icon: '!!! ' },
  info: { border: 'border-[#EAEAEA]/20', text: 'text-[#EAEAEA]', icon: '---' },
  warning: { border: 'border-[#d29922]/30', text: 'text-[#d29922]', icon: '///' }
}

const s = styles[props.type] || styles.info
</script>

<template>
  <div :class="`toast ${s.border}`">
    <span :class="`font-mono text-xs font-bold ${s.text}`">{{ s.icon }}</span>
    <span class="flex-1 text-xs text-[#EAEAEA] font-mono">{{ props.message }}</span>
    <button class="text-[#555] hover:text-[#EAEAEA] transition-colors cursor-pointer text-sm leading-none font-mono" @click="emit('close')">[X]</button>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid;
  min-width: 300px;
  background: #111;
}
</style>
