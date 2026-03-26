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
  <div class="dialog">
    <div class="dialog-header">
      <span class="font-mono text-xs text-accent tracking-wider">/// DIALOG</span>
      <span class="font-mono text-xs text-[#555]">UNIT / D-01</span>
    </div>
    <div class="dialog-body">
      <h2 class="font-display text-xl font-bold text-[#EAEAEA] mb-3 uppercase tracking-tight">{{ title }}</h2>
      <p class="text-[#888] text-sm leading-relaxed mb-2 font-mono">{{ message }}</p>
      <p class="text-[#555] text-xs leading-relaxed mb-6 font-mono">
        Каждый вызов <code class="text-[#EAEAEA] bg-white/[0.06] px-1">openDialog()</code> возвращает
        <code class="text-[#EAEAEA] bg-white/[0.06] px-1">ModalRecord</code> с методами
        <code class="text-[#EAEAEA] bg-white/[0.06] px-1">close()</code>,
        <code class="text-[#EAEAEA] bg-white/[0.06] px-1">on()</code> и
        <code class="text-[#EAEAEA] bg-white/[0.06] px-1">addCloseGuard()</code>.
      </p>
      <div class="flex justify-end">
        <button
          class="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          @click="emit('close')"
        >
          [ ПОНЯТНО ]
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  width: 100%;
  max-width: 420px;
  margin: 0 1rem;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #0E0E0E;
}

.dialog-body {
  padding: 24px 20px;
}
</style>
