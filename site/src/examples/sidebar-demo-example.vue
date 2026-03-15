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
  <div class="bg-white/4 border border-white/8 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex flex-col h-full">
    <h3 class="text-white font-semibold text-lg mb-2">Sidebar</h3>
    <p class="text-gray-400 text-sm mb-4">Slide-in панель через <code class="text-indigo-300">useSidebarPanel()</code></p>

    <button
      class="px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white rounded-full font-medium transition-all mb-4 cursor-pointer w-fit"
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
