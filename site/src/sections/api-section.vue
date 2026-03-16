<script setup lang="ts">
import { ref, onMounted } from "vue";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

interface ApiItem {
  name: string;
  signature: string;
  description: string;
  highlightedSignature?: string;
}

interface ApiGroup {
  icon: string;
  title: string;
  items: ApiItem[];
}

const apiGroups = ref<ApiGroup[]>([
  {
    icon: "⚡",
    title: "Методы ядра",
    items: [
      {
        name: "openModal",
        signature: "(component, props?, options?) => Promise<ModalRecord>",
        description: "Закрывает текущие и открывает новое модальное окно",
      },
      {
        name: "pushModal",
        signature: "(component, props?, options?) => ModalRecord",
        description: "Добавляет модальное окно поверх текущих",
      },
      {
        name: "popModal",
        signature: "(options?) => Promise<void>",
        description: "Закрывает последнее модальное окно в namespace",
      },
      {
        name: "closeModal",
        signature: "(options?) => Promise<void>",
        description: "Закрывает все модальные окна в namespace",
      },
      {
        name: "closeById",
        signature: "(id: number) => Promise<void>",
        description: "Закрывает модальное окно по ID",
      },
      {
        name: "promptModal",
        signature: "<T>(component, props?, options?) => Promise<T | null>",
        description: "Открывает и ждёт результата через MODAL_EVENT_PROMPT",
      },
      {
        name: "getCurrentModal",
        signature: "(namespace?) => ModalRecord | undefined",
        description: "Возвращает последнее активное модальное окно",
      },
      {
        name: "getQueueByNamespace",
        signature: "(namespace?) => ModalRecord[]",
        description: "Реактивный список модальных окон в namespace",
      },
    ],
  },
  {
    icon: "🪝",
    title: "Хуки",
    items: [
      {
        name: "useDialog()",
        signature: "() => { dialogs, openDialog, closeDialog, promptDialog }",
        description: "Хук для работы с диалоговыми окнами",
      },
      {
        name: "useToast()",
        signature: "() => { toasts, openToast, closeToast, closeAllToasts }",
        description: "Хук для работы с тостами (5 сек auto-close)",
      },
      {
        name: "useSidebarPanel()",
        signature: "() => { sidebars, sidebar, openSidebar, closeSidebar }",
        description: "Хук для управления боковыми панелями",
      },
    ],
  },
  {
    icon: "🔷",
    title: "Типы",
    items: [
      {
        name: "ModalRecord",
        signature:
          "{ id, component, namespace, isRoute, props, closed, close(), on(), addCloseGuard(), addDestroyGuard() }",
        description: "Экземпляр модального окна",
      },
      {
        name: "GuardFunction",
        signature: "() => void | boolean | Promise<boolean>",
        description: "Функция-гард. false = отменить закрытие",
      },
      {
        name: "ComponentProps<T>",
        signature: "T extends new(...) => { $props: P } ? Partial<P> : never",
        description: "Автовывод типов пропсов компонента",
      },
      {
        name: "ModalOptions",
        signature: "{ isRoute: boolean, namespace: NamespaceKey }",
        description: "Опции модального окна",
      },
      {
        name: "MODAL_EVENT_PROMPT",
        signature: "'modal:prompt'",
        description: "Константа события для promptModal",
      },
    ],
  },
]);

onMounted(async () => {
  const highlighter = await createHighlighterCore({
    themes: [import("shiki/themes/github-dark-default.mjs")],
    langs: [import("shiki/langs/typescript.mjs")],
    engine: createOnigurumaEngine(import("shiki/wasm")),
  });

  for (const group of apiGroups.value) {
    for (const item of group.items) {
      item.highlightedSignature = highlighter.codeToHtml(item.signature, {
        lang: "typescript",
        theme: "github-dark-default",
      });
    }
  }
});
</script>

<template>
  <section aria-label="API Reference" class="py-16 sm:py-24 px-4">
    <div class="max-w-5xl mx-auto">
      <p class="text-indigo-400 text-sm font-medium tracking-wide mb-3">API</p>
      <h2
        class="text-2xl sm:text-4xl font-bold text-white mb-10 sm:mb-16"
        style="line-height: 1.2"
      >
        Список методов и типов
      </h2>

      <div class="space-y-12">
        <div v-for="group in apiGroups" :key="group.title">
          <div class="flex items-center gap-3 mb-6">
            <span class="text-2xl">{{ group.icon }}</span>
            <h3 class="text-xl font-semibold text-white">{{ group.title }}</h3>
            <div
              class="flex-1 h-px bg-linear-to-r from-white/8 to-transparent"
            ></div>
          </div>

          <div class="grid gap-3">
            <div
              v-for="item in group.items"
              :key="item.name"
              class="group bg-white/2 border border-white/6 rounded-xl px-3 sm:px-5 py-3 sm:py-4 hover:bg-white/5 hover:border-indigo-500/20 transition-all overflow-hidden"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4"
              >
                <code
                  class="shrink-0 w-fit text-indigo-300 font-mono text-xs sm:text-sm font-medium bg-indigo-500/8 px-2 sm:px-2.5 py-1 rounded-lg"
                  >{{ item.name }}</code
                >
                <p class="text-slate-400 text-sm leading-relaxed sm:pt-1">
                  {{ item.description }}
                </p>
              </div>
              <div class="mt-3 api-signature" v-if="item.highlightedSignature">
                <div
                  class="overflow-x-auto"
                  v-html="item.highlightedSignature"
                ></div>
              </div>
              <div class="mt-3 api-signature-fallback" v-else>
                <div class="overflow-x-auto">
                  <code
                    class="text-xs font-mono text-slate-500 whitespace-nowrap"
                    >{{ item.signature }}</code
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.api-signature,
.api-signature-fallback {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.api-signature :deep(pre) {
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  background: transparent !important;
}

.api-signature :deep(code) {
  font-family: "JetBrains Mono", ui-monospace, monospace;
}
</style>
