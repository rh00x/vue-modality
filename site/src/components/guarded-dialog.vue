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
  <div class="dialog">
    <h2 class="font-display text-2xl font-bold text-[#171717] mb-3 tracking-tight">Диалог с гардом</h2>
    <p class="text-[#666] text-sm leading-relaxed mb-6">Backdrop, кнопка — любое закрытие заблокировано гардом.</p>

    <div v-if="pendingResolve" class="p-4 rounded-xl bg-amber-50 border border-amber-200 mb-4">
      <p class="text-amber-700 text-sm mb-3">Гард перехватил закрытие. Продолжить?</p>
      <div class="flex gap-2">
        <button
          class="px-4 py-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 text-sm rounded-xl transition-colors cursor-pointer"
          @click="confirm"
        >
          Да, закрыть
        </button>
        <button
          class="px-4 py-2 border border-black/[0.08] hover:bg-black/[0.03] text-[#666] text-sm rounded-xl transition-colors cursor-pointer"
          @click="cancel"
        >
          Отмена
        </button>
      </div>
    </div>

    <button
      v-else
      class="px-5 py-2.5 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 text-sm font-medium rounded-xl transition-colors cursor-pointer"
      @click="modal?.close().catch(() => {})"
    >
      Попробовать закрыть
    </button>
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
