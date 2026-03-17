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
  <div class="border border-black/[0.06] rounded-xl p-4 sm:p-5 flex flex-col h-full hover:border-accent-border/60 transition-colors">
    <h3 class="text-[#171717] font-semibold text-sm mb-2">Stacked Modals</h3>
    <p class="text-[#999] text-xs mb-4">Push 3 модалки → pop по одной (LIFO)</p>

    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-accent border border-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-all cursor-pointer w-fit shadow-[0_2px_8px_rgba(249,115,22,0.25)]"
        @click="startStack"
      >
        Стек модалок
      </button>
      <span class="text-[#999] text-xs">Активно: <span class="text-[#999] font-mono font-medium">{{ dialogs.length }}</span></span>
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
