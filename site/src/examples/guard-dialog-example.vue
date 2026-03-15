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
  <div class="bg-white/4 border border-white/8 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex flex-col h-full">
    <h3 class="text-white font-semibold text-lg mb-2">Guard Dialog</h3>
    <p class="text-gray-400 text-sm mb-4">Отклонение закрытия через <code class="text-indigo-300">addCloseGuard()</code></p>

    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white rounded-full font-medium transition-all cursor-pointer w-fit"
        @click="openGuarded"
      >
        С гардом
      </button>
      <span v-if="status" class="text-sm text-gray-400">Статус: <span class="text-indigo-300">{{ status }}</span></span>
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
