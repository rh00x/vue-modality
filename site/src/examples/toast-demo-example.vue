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
  <div class="border border-black/[0.06] rounded-xl p-4 sm:p-5 flex flex-col h-full hover:border-accent-border/60 transition-colors">
    <h3 class="text-[#171717] font-semibold text-sm mb-2">Toast</h3>
    <p class="text-[#999] text-xs mb-4">Auto-close через 5 сек, несколько независимых тостов</p>

    <div class="flex flex-wrap gap-2 mb-4 items-center">
      <button class="px-4 py-2 border border-black/[0.08] hover:bg-black/[0.03] text-emerald-600 rounded-lg text-sm font-medium transition-all cursor-pointer" @click="showToast('success', 'Операция выполнена успешно!')">Success</button>
      <button class="px-4 py-2 border border-black/[0.08] hover:bg-black/[0.03] text-red-600 rounded-lg text-sm font-medium transition-all cursor-pointer" @click="showToast('error', 'Произошла ошибка!')">Error</button>
      <button class="px-4 py-2 border border-black/[0.08] hover:bg-black/[0.03] text-blue-600 rounded-lg text-sm font-medium transition-all cursor-pointer" @click="showToast('info', 'Информация для пользователя')">Info</button>
      <button class="px-4 py-2 border border-black/[0.08] hover:bg-black/[0.03] text-amber-600 rounded-lg text-sm font-medium transition-all cursor-pointer" @click="showToast('warning', 'Внимание: проверьте данные')">Warning</button>
    </div>

    <div class="code-block rounded-xl overflow-x-auto flex-1" v-html="codeHtml" />
  </div>
</template>

<style scoped>
.code-block {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 0.75rem;
}
.code-block :deep(pre) {
  flex: 1;
  padding: 1rem;
  font-size: 0.8125rem;
  line-height: 1.6;
  background: transparent !important;
}
</style>
