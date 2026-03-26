<script setup lang="ts">
import { useDialog } from '@vue-modality/core'
import { ref } from 'vue'
import GuardedDialog from '../components/guarded-dialog.vue'
import { useHighlight } from '../use-highlight'

const { openDialog } = useDialog()
const status = ref('')

async function openGuarded() {
  status.value = 'открыт'
  const dialog = await openDialog(GuardedDialog)

  dialog.addCloseGuard(() => {
    return new Promise<boolean>((resolve) => {
      dialog.emit('guard:confirm', resolve)
    })
  })

  dialog.addDestroyGuard(() => {
    status.value = 'закрыт'
  })
}

const codeHtml = useHighlight(`const dialog = await openDialog(MyDialog)

// Add close guard
dialog.addCloseGuard(async () => {
  const confirmed = await askUser('Close?')
  return confirmed // false = prevent close
})

// Guard function:
// - true / void → allow close
// - false → prevent close`)
</script>

<template>
  <div class="p-5 flex flex-col h-full bg-surface">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-white font-mono font-bold text-xs uppercase tracking-wider">Guard Dialog</h3>
      <span class="mono-label text-accent">EX-03</span>
    </div>
    <p class="text-[#666] text-xs font-mono mb-4 uppercase">Отклонение закрытия через <code class="text-[#888]">addCloseGuard()</code></p>

    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-accent border border-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer w-fit"
        @click="openGuarded"
      >
        [ С ГАРДОМ ]
      </button>
      <span v-if="status" class="text-xs font-mono text-[#666]">STATUS: <span class="text-[#888]">{{ status }}</span></span>
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
