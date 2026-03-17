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

  // Guard intercepts ANY close (backdrop, button, programmatic)
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
  <div class="border border-black/[0.06] rounded-xl p-4 sm:p-5 flex flex-col h-full hover:border-accent-border/60 transition-colors">
    <h3 class="text-[#171717] font-semibold text-sm mb-2">Guard Dialog</h3>
    <p class="text-[#999] text-xs mb-4">Отклонение закрытия через <code class="text-[#999] font-mono">addCloseGuard()</code></p>

    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-accent border border-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-all cursor-pointer w-fit shadow-[0_2px_8px_rgba(249,115,22,0.25)]"
        @click="openGuarded"
      >
        С гардом
      </button>
      <span v-if="status" class="text-sm text-gray-400">Статус: <span class="text-[#999] font-mono">{{ status }}</span></span>
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
