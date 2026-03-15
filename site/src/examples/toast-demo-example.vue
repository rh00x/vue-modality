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
  <div class="bg-white/4 border border-white/8 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex flex-col h-full">
    <h3 class="text-white font-semibold text-lg mb-2">Toast</h3>
    <p class="text-gray-400 text-sm mb-4">Auto-close через 5 сек, несколько независимых тостов</p>

    <div class="flex flex-wrap gap-2 mb-4 items-center">
      <button
        class="px-4 h-10 bg-linear-to-r from-emerald-700 to-teal-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] text-white rounded-full text-sm font-medium transition-all cursor-pointer"
        @click="showToast('success', 'Операция выполнена успешно!')"
      >
        Success
      </button>
      <button
        class="px-4 h-10 bg-linear-to-r from-red-700 to-rose-700 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] text-white rounded-full text-sm font-medium transition-all cursor-pointer"
        @click="showToast('error', 'Произошла ошибка!')"
      >
        Error
      </button>
      <button
        class="px-4 h-10 bg-linear-to-r from-blue-700 to-cyan-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] text-white rounded-full text-sm font-medium transition-all cursor-pointer"
        @click="showToast('info', 'Информация для пользователя')"
      >
        Info
      </button>
      <button
        class="px-4 h-10 bg-linear-to-r from-amber-700 to-orange-700 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] text-white rounded-full text-sm font-medium transition-all cursor-pointer"
        @click="showToast('warning', 'Внимание: проверьте данные')"
      >
        Warning
      </button>
    </div>

    <div class="code-block rounded-xl overflow-x-auto flex-1" v-html="codeHtml" />
  </div>
</template>

<style scoped>
.code-block {
  display: flex;
  flex-direction: column;
  background: #0d1117;
  border: 1px solid rgb(255 255 255 / 0.08);
}
.code-block :deep(pre) {
  flex: 1;
  padding: 1rem;
  font-size: 0.75rem;
  line-height: 1.6;
  background: #0d1117 !important;
}
</style>
