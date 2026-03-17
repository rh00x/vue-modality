<script setup lang="ts">
import { useDialog, useToast } from '@vue-modality/core'
import DemoDialog from '../components/demo-dialog.vue'
import ConfirmDialog from '../components/confirm-dialog.vue'
import ToastMessage from '../components/toast-message.vue'
import { useHighlight } from '../use-highlight'
import { ref } from 'vue'

const { openDialog, promptDialog } = useDialog()
const { openToast } = useToast()
const promptResult = ref<string | null>(null)

async function demoDialog() {
  await openDialog(DemoDialog, { title: 'Привет!', message: 'Диалог открыт через openDialog()' })
}

async function demoPrompt() {
  promptResult.value = null
  const result = await promptDialog<string>(ConfirmDialog)
  promptResult.value = result
}

function demoToast() {
  openToast(ToastMessage, { type: 'success', message: 'Готово! Тост закроется через 5 сек' })
}

const codeHtml = useHighlight(`const { openDialog, promptDialog } = useDialog()
const { openToast } = useToast()

// Открыть диалог
const dialog = await openDialog(MyDialog, {
  title: 'Привет!'
})

// Получить результат из модалки
const answer = await promptDialog<string>(ChoiceDialog)
// answer: 'Vue 3' | 'React' | null

// Тост
openToast(MyToast, { message: 'Готово!' })`)
</script>

<template>
  <section
    aria-label="Главная"
    class="relative min-h-screen flex flex-col justify-center px-4 pt-20 pb-16 overflow-hidden"
  >
    <!-- Декоративный градиент -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.06)_0%,transparent_70%)] pointer-events-none" />
    <div class="max-w-[680px] mx-auto w-full text-center">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-border bg-accent-light text-accent text-xs tracking-wide font-medium mb-8">
        <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        Vue 3 · TypeScript · Zero dependencies
      </div>

      <!-- Title -->
      <h1 class="font-display font-bold tracking-[-0.02em] leading-[1.1] text-[2.5rem] sm:text-5xl lg:text-6xl text-[#171717] mb-5">
        Модальные окна,<br>которые просто работают
      </h1>

      <!-- Subtitle -->
      <p class="text-base sm:text-lg text-[#777] max-w-lg mx-auto mb-10 leading-relaxed">
        Никакого навязанного UI — только ваши компоненты. Очереди, гарды и промисы библиотека берёт на себя.
      </p>

      <!-- Metrics -->
      <div class="flex justify-center gap-8 mb-10 text-sm">
        <div class="text-center">
          <div class="text-accent font-bold text-lg">~3kb</div>
          <div class="text-[#999] text-xs mt-0.5">gzip</div>
        </div>
        <div class="w-px bg-accent-border" />
        <div class="text-center">
          <div class="text-accent font-bold text-lg">0</div>
          <div class="text-[#999] text-xs mt-0.5">зависимостей</div>
        </div>
        <div class="w-px bg-accent-border" />
        <div class="text-center">
          <div class="text-accent font-bold text-lg">100%</div>
          <div class="text-[#999] text-xs mt-0.5">TypeScript</div>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex flex-wrap justify-center gap-3 mb-16">
        <a
          href="#examples"
          class="inline-flex items-center px-6 h-10 bg-accent text-white hover:bg-accent-hover rounded-full text-sm font-medium transition-colors shadow-[0_2px_12px_rgba(249,115,22,0.3)]"
        >
          Начать
        </a>
        <a
          href="https://github.com/rh00x/vue-modality"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-6 h-10 border border-black/[0.1] text-[#666] hover:text-[#171717] rounded-full text-sm font-medium transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>
      </div>

      <!-- Code + Live demo block -->
      <div class="code-demo-block text-left">
        <div class="code-header">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-accent/30" />
            <span class="w-2.5 h-2.5 rounded-full bg-accent/20" />
            <span class="w-2.5 h-2.5 rounded-full bg-accent/10" />
          </div>
          <span class="text-[#bbb] text-xs font-mono">example.ts</span>
        </div>
        <div class="code-body" v-html="codeHtml" />
        <div class="code-footer">
          <span class="text-accent text-xs font-medium">Попробуйте →</span>
          <div class="flex gap-2">
            <button class="demo-chip" @click="demoDialog">
              openDialog()
            </button>
            <button class="demo-chip" @click="demoPrompt">
              promptDialog()
            </button>
            <button class="demo-chip" @click="demoToast">
              openToast()
            </button>
          </div>
        </div>
        <div v-if="promptResult !== null" class="px-4 py-2 border-t border-black/[0.06] text-xs">
          <span class="text-[#999]">Результат:</span>
          <span class="text-emerald-600 ml-2 font-mono">{{ promptResult }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.code-demo-block {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.code-body {
  padding: 0;
}

.code-body :deep(pre) {
  margin: 0;
  padding: 20px;
  font-size: 14px;
  line-height: 1.7;
  background: transparent !important;
  overflow-x: auto;
}

.code-body :deep(code) {
  font-family: 'JetBrains Mono', monospace;
}

.code-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  gap: 12px;
}

.demo-chip {
  padding: 5px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #666;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.demo-chip:hover {
  background: var(--color-accent-light);
  color: var(--color-accent);
  border-color: var(--color-accent-border);
}
</style>
