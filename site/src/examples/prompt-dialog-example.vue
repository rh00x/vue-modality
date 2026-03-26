<script setup lang="ts">
import { useDialog, useToast } from '@vue-modality/core'
import { ref } from 'vue'
import ToastMessage from '../components/toast-message.vue'
import ConfirmDialog from '../components/confirm-dialog.vue'
import { useHighlight } from '../use-highlight'

const { promptDialog } = useDialog()
const { openToast } = useToast()
const result = ref<string | null>(null)

async function runPrompt() {
  result.value = null
  const value = await promptDialog<string>(ConfirmDialog)
  result.value = value
  if (value) {
    openToast(ToastMessage, { message: `Вы выбрали: ${value}` })
  }
}

const codeHtml = useHighlight(`const { promptDialog } = useDialog()

const answer = await promptDialog<string>(MyDialog)
// answer: 'Vue 3' | 'React' | null

// Inside component (via modal prop from renderer):
const props = defineProps<{ modal?: ModalRecord }>()
props.modal?.emit(MODAL_EVENT_PROMPT, 'Vue 3')`)
</script>

<template>
  <div class="p-5 flex flex-col h-full bg-surface">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-white font-mono font-bold text-xs uppercase tracking-wider">Prompt Dialog</h3>
      <span class="mono-label text-accent">EX-02</span>
    </div>
    <p class="text-[#666] text-xs font-mono mb-4 uppercase">await результата через <code class="text-[#888]">promptDialog()</code></p>

    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-accent border border-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer w-fit"
        @click="runPrompt"
      >
        [ ЗАДАТЬ ВОПРОС ]
      </button>
      <span v-if="result !== null" class="text-xs font-mono text-[#666]">
        RESULT: <span class="text-accent font-medium">{{ result }}</span>
      </span>
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
