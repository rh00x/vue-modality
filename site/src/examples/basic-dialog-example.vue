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
  <div class="p-5 flex flex-col h-full bg-surface">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-white font-mono font-bold text-xs uppercase tracking-wider">Basic Dialog</h3>
      <span class="mono-label text-accent">EX-01</span>
    </div>
    <p class="text-[#666] text-xs font-mono mb-4 uppercase">Открытие через <code class="text-[#888]">useDialog().openDialog()</code></p>

    <button
      class="px-4 py-2 bg-accent border border-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-wider transition-all mb-4 cursor-pointer w-fit"
      @click="openExample"
    >
      [ ОТКРЫТЬ ДИАЛОГ ]
    </button>

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
