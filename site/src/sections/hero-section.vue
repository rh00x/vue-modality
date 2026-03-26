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
    <!-- Перекрестие в углу -->
    <div class="absolute top-8 left-8 text-muted font-mono text-xs tracking-widest select-none hidden sm:block">
      + SYS.INIT<br>
      REV 3.0 /// VUE-MODALITY
    </div>
    <div class="absolute top-8 right-8 text-muted font-mono text-xs tracking-widest text-right select-none hidden sm:block">
      UNIT / MOD-01<br>
      STATUS: <span class="text-accent">ACTIVE</span>
    </div>

    <div class="max-w-[780px] mx-auto w-full relative z-10">
      <!-- Лейбл -->
      <div class="mono-label mb-6 flex items-center gap-3">
        <span class="text-accent">///</span>
        <span>VUE 3 · TYPESCRIPT · ZERO DEPENDENCIES</span>
      </div>

      <!-- Заголовок -->
      <h1 class="macro-title text-[clamp(3rem,10vw,7rem)] mb-6">
        МОДАЛЬНЫЕ<br>ОКНА
      </h1>

      <!-- Подзаголовок -->
      <div class="border-l-2 border-accent pl-4 mb-10">
        <p class="text-base text-[#999] leading-relaxed max-w-lg font-mono text-sm">
          Никакого навязанного UI — только ваши компоненты.<br>
          Очереди, гарды и промисы библиотека берёт на себя.
        </p>
      </div>

      <!-- Метрики -->
      <div class="flex gap-0 mb-10 brutalist-border w-fit">
        <div class="px-6 py-3 text-center border-r border-border">
          <div class="font-display text-2xl text-white font-bold tracking-tight">~3KB</div>
          <div class="mono-label mt-1">GZIP</div>
        </div>
        <div class="px-6 py-3 text-center border-r border-border">
          <div class="font-display text-2xl text-white font-bold tracking-tight">0</div>
          <div class="mono-label mt-1">DEPS</div>
        </div>
        <div class="px-6 py-3 text-center">
          <div class="font-display text-2xl text-white font-bold tracking-tight">100%</div>
          <div class="mono-label mt-1">TS</div>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex flex-wrap gap-3 mb-16">
        <a
          href="#examples"
          class="inline-flex items-center px-6 h-11 bg-accent text-white text-sm font-mono uppercase tracking-wider hover:bg-accent-hover transition-colors"
        >
          [ НАЧАТЬ ]
        </a>
        <a
          href="https://github.com/rh00x/vue-modality"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-6 h-11 border border-border text-[#999] hover:text-white hover:border-[#555] text-sm font-mono uppercase tracking-wider transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GITHUB
        </a>
      </div>

      <!-- Code block -->
      <div class="code-demo-block text-left">
        <div class="code-header">
          <span class="mono-label">/// EXAMPLE.TS</span>
          <span class="text-accent text-xs font-mono">LIVE</span>
        </div>
        <div class="code-body" v-html="codeHtml" />
        <div class="code-footer">
          <span class="mono-label shrink-0">EXECUTE &gt;&gt;&gt;</span>
          <div class="flex flex-wrap gap-2">
            <button class="demo-chip" @click="demoDialog">
              [ openDialog() ]
            </button>
            <button class="demo-chip" @click="demoPrompt">
              [ promptDialog() ]
            </button>
            <button class="demo-chip" @click="demoToast">
              [ openToast() ]
            </button>
          </div>
        </div>
        <div v-if="promptResult !== null" class="px-4 py-2 border-t border-border text-xs font-mono">
          <span class="text-muted">RESULT:</span>
          <span class="text-accent ml-2">{{ promptResult }}</span>
        </div>
      </div>
    </div>

    <!-- Нижняя линия -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-border" />
  </section>
</template>

<style scoped>
.code-demo-block {
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  background: #111111;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  background: #0E0E0E;
}

.code-body {
  padding: 0;
}

.code-body :deep(pre) {
  margin: 0;
  padding: 20px;
  font-size: 13px;
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
  flex-wrap: wrap;
  padding: 10px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  gap: 8px 12px;
}

.demo-chip {
  padding: 5px 12px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #999;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: all 0.15s ease;
}

.demo-chip:hover {
  background: rgba(230, 25, 25, 0.1);
  color: var(--color-accent);
  border-color: rgba(230, 25, 25, 0.4);
}
</style>
