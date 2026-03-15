<script setup lang="ts">
import { useDialog } from '@vue-modality/core'
import DemoDialog from '../components/demo-dialog.vue'
import { useHighlight } from '../use-highlight'

const { openDialog } = useDialog()

async function openExample() {
  await openDialog(DemoDialog, { title: 'Привет!', message: 'Диалог открыт через openDialog()' })
}

const codeHtml = useHighlight(`const { openDialog } = useDialog()

const dialog = await openDialog(MyDialog, {
  title: 'Привет!'
})

// Close programmatically
dialog.close()`)
</script>

<template>
  <div class="bg-white/4 border border-white/8 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex flex-col h-full">
    <h3 class="text-white font-semibold text-lg mb-2">Basic Dialog</h3>
    <p class="text-gray-400 text-sm mb-4">Открытие через <code class="text-indigo-300">useDialog().openDialog()</code></p>

    <button
      class="px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white rounded-full font-medium transition-all mb-4 cursor-pointer w-fit"
      @click="openExample"
    >
      Открыть диалог
    </button>

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
