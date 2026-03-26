<script setup lang="ts">
import { pushModal, DIALOG_NAMESPACE, getQueueByNamespace } from '@vue-modality/core'
import LayerDialog from '../components/layer-dialog.vue'
import { useHighlight } from '../use-highlight'

const dialogs = getQueueByNamespace(DIALOG_NAMESPACE)

function pushDialog(props?: Record<string, unknown>) {
  return pushModal(LayerDialog, props, { namespace: DIALOG_NAMESPACE })
}

function startStack() {
  const dialog1 = pushDialog({
    level: 1,
    onPush: () => {
      const dialog2 = pushDialog({
        level: 2,
        onPush: () => {
          const dialog3 = pushDialog({
            level: 3,
            onPop: () => dialog3.close()
          })
        },
        onPop: () => dialog2.close()
      })
    },
    onPop: () => dialog1.close()
  })
}

const codeHtml = useHighlight(`// push нескольких модалок
const d1 = await openDialog(Layer1)
d1.on('push', async () => {
  const d2 = await openDialog(Layer2)
  // ...
})

// pop по одной — LIFO
d1.on('pop', () => d1.close())

// Or close all at once
closeDialog()`)
</script>

<template>
  <div class="p-5 flex flex-col h-full bg-surface">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-white font-mono font-bold text-xs uppercase tracking-wider">Stacked Modals</h3>
      <span class="mono-label text-accent">EX-06</span>
    </div>
    <p class="text-[#666] text-xs font-mono mb-4 uppercase">Push 3 модалки → pop по одной (LIFO)</p>

    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-accent border border-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer w-fit"
        @click="startStack"
      >
        [ СТЕК МОДАЛОК ]
      </button>
      <span class="text-xs font-mono text-[#666]">ACTIVE: <span class="text-[#888] font-medium">{{ dialogs.length }}</span></span>
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
