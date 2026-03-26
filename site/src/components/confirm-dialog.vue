<script setup lang="ts">
import { MODAL_EVENT_PROMPT, type ModalRecord } from '@vue-modality/core'

const props = defineProps<{ modal?: ModalRecord }>()

function select(value: string) {
  props.modal?.emit(MODAL_EVENT_PROMPT, value)
}
</script>

<template>
  <div class="dialog">
    <div class="dialog-header">
      <span class="font-mono text-xs text-accent tracking-wider">/// PROMPT</span>
      <span class="font-mono text-xs text-[#555]">AWAITING INPUT</span>
    </div>
    <div class="dialog-body">
      <h2 class="font-display text-xl font-bold text-[#EAEAEA] mb-3 uppercase tracking-tight">Ваш выбор</h2>
      <p class="text-[#888] text-sm leading-relaxed mb-2 font-mono">Какой фреймворк вы предпочитаете?</p>
      <p class="text-[#555] text-xs leading-relaxed mb-6 font-mono">
        Результат вернётся как <code class="text-[#EAEAEA] bg-white/[0.06] px-1">Promise&lt;T&gt;</code>.
        Закрытие без выбора >>> <code class="text-[#EAEAEA] bg-white/[0.06] px-1">null</code>.
      </p>
      <div class="flex gap-2">
        <button
          class="flex-1 py-3 border border-border hover:bg-white/[0.04] text-[#4AF626] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          @click="select('Vue 3')"
        >
          [ VUE 3 ]
        </button>
        <button
          class="flex-1 py-3 border border-border hover:bg-white/[0.04] text-[#58a6ff] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          @click="select('React')"
        >
          [ REACT ]
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  width: 100%;
  max-width: 400px;
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
