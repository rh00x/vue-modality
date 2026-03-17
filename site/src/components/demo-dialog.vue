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
    <h2 class="font-display text-2xl font-bold text-[#171717] mb-3 tracking-tight">{{ title }}</h2>
    <p class="text-[#666] text-sm leading-relaxed mb-2">{{ message }}</p>
    <p class="text-[#999] text-xs leading-relaxed mb-6">
      Каждый вызов <code class="text-[#171717] font-mono bg-black/[0.04] px-1 rounded">openDialog()</code> возвращает
      <code class="text-[#171717] font-mono bg-black/[0.04] px-1 rounded">ModalRecord</code> с методами
      <code class="text-[#171717] font-mono bg-black/[0.04] px-1 rounded">close()</code>,
      <code class="text-[#171717] font-mono bg-black/[0.04] px-1 rounded">on()</code> и
      <code class="text-[#171717] font-mono bg-black/[0.04] px-1 rounded">addCloseGuard()</code>.
    </p>
    <div class="flex justify-end">
      <button
        class="px-5 py-2.5 bg-[#171717] hover:bg-[#333] text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
        @click="emit('close')"
      >
        Понятно
      </button>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  width: 100%;
  max-width: 420px;
  margin: 0 1rem;
  padding: 28px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
}
</style>
