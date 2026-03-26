<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getHighlighter } from "../use-highlight";

interface ApiItem {
  name: string;
  signature: string;
  description: string;
  highlightedSignature?: string;
}

interface ApiGroup {
  id: string;
  title: string;
  items: ApiItem[];
}

const apiGroups = ref<ApiGroup[]>([
  {
    id: "CORE",
    title: "МЕТОДЫ ЯДРА",
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
    id: "HOOKS",
    title: "ХУКИ",
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
    id: "TYPES",
    title: "ТИПЫ",
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
  const highlighter = await getHighlighter();

  for (const group of apiGroups.value) {
    for (const item of group.items) {
      item.highlightedSignature = highlighter.codeToHtml(item.signature, {
        lang: "typescript",
        theme: "github-dark",
      });
    }
  }
});
</script>

<template>
  <section aria-label="API Reference" class="py-20 sm:py-28 px-4 border-t border-border">
    <div class="max-w-[880px] mx-auto">
      <div class="mono-label mb-4 flex items-center gap-3">
        <span class="text-accent">///</span>
        <span>API</span>
      </div>
      <h2 class="macro-title text-[clamp(2rem,6vw,3.5rem)] mb-14">
        МЕТОДЫ И ТИПЫ
      </h2>

      <div class="space-y-10">
        <div v-for="group in apiGroups" :key="group.title">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-accent font-mono text-xs font-bold">[ {{ group.id }} ]</span>
            <h3 class="text-xs font-mono font-bold text-white tracking-wider">{{ group.title }}</h3>
            <div class="flex-1 h-px bg-border"></div>
          </div>

          <div class="border border-border">
            <div
              v-for="(item, i) in group.items"
              :key="item.name"
              class="px-4 py-3 hover:bg-white/[0.02] transition-colors"
              :class="{ 'border-t border-border': i > 0 }"
            >
              <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                <code class="shrink-0 w-fit text-white font-mono text-xs font-bold bg-white/[0.04] px-2 py-0.5">{{ item.name }}</code>
                <p class="text-[#666] text-xs leading-relaxed sm:pt-0.5 font-mono">
                  {{ item.description }}
                </p>
              </div>
              <div class="mt-2 api-signature" v-if="item.highlightedSignature">
                <div class="overflow-x-auto" v-html="item.highlightedSignature"></div>
              </div>
              <div class="mt-2 api-signature" v-else>
                <div class="overflow-x-auto">
                  <code class="text-xs font-mono text-[#666] whitespace-nowrap">{{ item.signature }}</code>
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
.api-signature {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.375rem 0.625rem;
}

.api-signature :deep(pre) {
  margin: 0;
  padding: 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  background: transparent !important;
}

.api-signature :deep(code) {
  font-family: "JetBrains Mono", ui-monospace, monospace;
}
</style>
