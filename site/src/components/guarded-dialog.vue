<script setup lang="ts">
import { ref } from 'vue'
import type { ModalRecord } from '@vue-modality/core'

const props = defineProps<{ modal?: ModalRecord }>()

const pendingResolve = ref<((v: boolean) => void) | null>(null)

props.modal?.on<(v: boolean) => void>('guard:confirm', (resolve) => {
  pendingResolve.value = resolve
})

function confirm() {
  pendingResolve.value?.(true)
  pendingResolve.value = null
}

function cancel() {
  pendingResolve.value?.(false)
  pendingResolve.value = null
}
</script>

<template>
  <div class="bg-[#0d0d1a]/90 backdrop-blur-xl rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 border border-white/10">
    <h2 class="text-xl font-semibold text-white mb-3">Диалог с гардом</h2>
    <p class="text-slate-300 mb-4">Backdrop, кнопка — любое закрытие заблокировано гардом.</p>

    <div v-if="pendingResolve" class="bg-yellow-900/30 border border-yellow-600/30 rounded-xl p-4 mb-4">
      <p class="text-yellow-300 text-sm mb-3">Гард перехватил закрытие. Продолжить?</p>
      <div class="flex gap-2">
        <button
          class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm transition-colors cursor-pointer"
          @click="confirm"
        >
          Да, закрыть
        </button>
        <button
          class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors cursor-pointer"
          @click="cancel"
        >
          Отмена
        </button>
      </div>
    </div>

    <button
      v-else
      class="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 rounded-full transition-colors cursor-pointer"
      @click="modal?.close().catch(() => {})"
    >
      Попробовать закрыть
    </button>
  </div>
</template>
