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
  <div class="bg-white/4 border border-white/8 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex flex-col h-full">
    <h3 class="text-white font-semibold text-lg mb-2">Prompt Dialog</h3>
    <p class="text-gray-400 text-sm mb-4">await результата через <code class="text-indigo-300">promptDialog()</code></p>

    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white rounded-full font-medium transition-all cursor-pointer w-fit"
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
