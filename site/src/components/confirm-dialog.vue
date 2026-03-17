<script setup lang="ts">
import { MODAL_EVENT_PROMPT, type ModalRecord } from '@vue-modality/core'

const props = defineProps<{ modal?: ModalRecord }>()

function select(value: string) {
  props.modal?.emit(MODAL_EVENT_PROMPT, value)
}
</script>

<template>
  <div class="dialog">
    <h2 class="font-display text-2xl font-bold text-[#171717] mb-3 tracking-tight">Ваш выбор</h2>
    <p class="text-[#666] text-sm leading-relaxed mb-2">Какой фреймворк вы предпочитаете?</p>
    <p class="text-[#999] text-xs leading-relaxed mb-6">
      Результат вернётся как <code class="text-[#171717] font-mono bg-black/[0.04] px-1 rounded">Promise&lt;T&gt;</code>.
      Компонент отправляет ответ через <code class="text-[#171717] font-mono bg-black/[0.04] px-1 rounded">emit(MODAL_EVENT_PROMPT, value)</code>.
      Закрытие без выбора → <code class="text-[#171717] font-mono bg-black/[0.04] px-1 rounded">null</code>.
    </p>
    <div class="flex gap-3">
      <button
        class="flex-1 py-3 border border-black/[0.08] hover:bg-black/[0.03] text-emerald-600 text-sm font-medium rounded-xl transition-colors cursor-pointer"
        @click="select('Vue 3')"
      >
        Vue 3
      </button>
      <button
        class="flex-1 py-3 border border-black/[0.08] hover:bg-black/[0.03] text-blue-600 text-sm font-medium rounded-xl transition-colors cursor-pointer"
        @click="select('React')"
      >
        React
      </button>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  width: 100%;
  max-width: 400px;
  margin: 0 1rem;
  padding: 28px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
}
</style>
