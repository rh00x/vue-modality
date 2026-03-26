<script setup lang="ts">
import { useToast } from '@vue-modality/core'
import ToastMessage from '../components/toast-message.vue'
import { useHighlight } from '../use-highlight'

const { openToast } = useToast()

function showToast(type: string, message: string) {
  openToast(ToastMessage, { type, message })
}

const codeHtml = useHighlight(`const { openToast } = useToast()

// Open toast with custom component
openToast(MyToast, { message: 'Done!', type: 'success' })

// Auto-close after 5 seconds (built into useToast)
// Multiple toasts — independent timers`)
</script>

<template>
  <div class="p-5 flex flex-col h-full bg-surface">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-white font-mono font-bold text-xs uppercase tracking-wider">Toast</h3>
      <span class="mono-label text-accent">EX-04</span>
    </div>
    <p class="text-[#666] text-xs font-mono mb-4 uppercase">Auto-close через 5 сек, несколько независимых тостов</p>

    <div class="flex flex-wrap gap-2 mb-4 items-center">
      <button class="px-3 py-2 border border-border hover:bg-white/[0.03] text-[#4AF626] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer" @click="showToast('success', 'Операция выполнена успешно!')">[ SUCCESS ]</button>
      <button class="px-3 py-2 border border-border hover:bg-white/[0.03] text-accent text-xs font-mono uppercase tracking-wider transition-all cursor-pointer" @click="showToast('error', 'Произошла ошибка!')">[ ERROR ]</button>
      <button class="px-3 py-2 border border-border hover:bg-white/[0.03] text-[#EAEAEA] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer" @click="showToast('info', 'Информация для пользователя')">[ INFO ]</button>
      <button class="px-3 py-2 border border-border hover:bg-white/[0.03] text-[#d29922] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer" @click="showToast('warning', 'Внимание: проверьте данные')">[ WARNING ]</button>
    </div>

    <div class="code-block overflow-x-auto flex-1" v-html="codeHtml" />
  </div>
</template>

<style scoped>
.code-block {
  display: flex;
  flex-direction: column;
  background: #0A0A0A;
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.code-block :deep(pre) {
  flex: 1;
  padding: 1rem;
  font-size: 0.8125rem;
  line-height: 1.6;
  background: transparent !important;
}
</style>
