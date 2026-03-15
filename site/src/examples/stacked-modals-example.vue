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
  <div class="bg-white/4 border border-white/8 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex flex-col h-full">
    <h3 class="text-white font-semibold text-lg mb-2">Stacked Modals</h3>
    <p class="text-gray-400 text-sm mb-4">Push 3 модалки → pop по одной (LIFO)</p>

    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white rounded-full font-medium transition-all cursor-pointer w-fit"
        @click="startStack"
      >
        Стек модалок
      </button>
      <span class="text-gray-400 text-sm">Активно: <span class="text-indigo-300 font-medium">{{ dialogs.length }}</span></span>
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
