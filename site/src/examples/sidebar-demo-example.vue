<script setup lang="ts">
import { useSidebarPanel } from '@vue-modality/core'
import DemoSidebar from '../components/demo-sidebar.vue'
import { useHighlight } from '../use-highlight'

const { openSidebar } = useSidebarPanel()

async function open() {
  await openSidebar(DemoSidebar)
}

const codeHtml = useHighlight(`const { openSidebar } = useSidebarPanel()

const sidebar = await openSidebar(MyPanel, {
  title: 'Настройки'
})

// Close via event from inside the component
sidebar.on('close', () => sidebar.close())`)
</script>

<template>
  <div class="border border-black/[0.06] rounded-xl p-4 sm:p-5 flex flex-col h-full hover:border-accent-border/60 transition-colors">
    <h3 class="text-[#171717] font-semibold text-sm mb-2">Sidebar</h3>
    <p class="text-[#999] text-xs mb-4">Slide-in панель через <code class="text-[#999] font-mono">useSidebarPanel()</code></p>

    <button
      class="px-4 py-2 bg-accent border border-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-all mb-4 cursor-pointer w-fit shadow-[0_2px_8px_rgba(249,115,22,0.25)]"
      @click="open"
    >
      Открыть панель
    </button>

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
