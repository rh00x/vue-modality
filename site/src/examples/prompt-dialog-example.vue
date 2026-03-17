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
  <div class="border border-black/[0.06] rounded-xl p-4 sm:p-5 flex flex-col h-full hover:border-accent-border/60 transition-colors">
    <h3 class="text-[#171717] font-semibold text-sm mb-2">Prompt Dialog</h3>
    <p class="text-[#999] text-xs mb-4">await результата через <code class="text-[#999] font-mono">promptDialog()</code></p>

    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-accent border border-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-all cursor-pointer w-fit shadow-[0_2px_8px_rgba(249,115,22,0.25)]"
        @click="runPrompt"
      >
        Задать вопрос
      </button>
      <span v-if="result !== null" class="text-sm">
        Ответ: <span class="text-green-400 font-medium">{{ result }}</span>
      </span>
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
