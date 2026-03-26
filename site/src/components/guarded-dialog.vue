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
    <div class="dialog-header">
      <span class="font-mono text-xs text-accent tracking-wider">/// GUARD</span>
      <span class="font-mono text-xs text-[#555]">LOCK: <span class="text-accent">ACTIVE</span></span>
    </div>
    <div class="dialog-body">
      <h2 class="font-display text-xl font-bold text-[#EAEAEA] mb-3 uppercase tracking-tight">Диалог с гардом</h2>
      <p class="text-[#888] text-sm leading-relaxed mb-6 font-mono">Backdrop, кнопка — любое закрытие заблокировано гардом.</p>

      <div v-if="pendingResolve" class="p-4 border border-accent/40 bg-accent/[0.06] mb-4">
        <p class="text-accent text-xs font-mono uppercase tracking-wider mb-3">/// GUARD INTERCEPTED — CONFIRM?</p>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            @click="confirm"
          >
            [ ЗАКРЫТЬ ]
          </button>
          <button
            class="px-4 py-2 border border-border hover:bg-white/[0.04] text-[#888] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            @click="cancel"
          >
            [ ОТМЕНА ]
          </button>
        </div>
      </div>

      <button
        v-else
        class="px-5 py-2.5 border border-accent/40 hover:bg-accent/[0.08] text-accent text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
        @click="modal?.close().catch(() => {})"
      >
        [ ПОПРОБОВАТЬ ЗАКРЫТЬ ]
      </button>
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
