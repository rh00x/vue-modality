<script setup lang="ts">
import BasicDialogExample from '../examples/basic-dialog-example.vue'
import PromptDialogExample from '../examples/prompt-dialog-example.vue'
import GuardDialogExample from '../examples/guard-dialog-example.vue'
import ToastDemoExample from '../examples/toast-demo-example.vue'
import SidebarDemoExample from '../examples/sidebar-demo-example.vue'
import StackedModalsExample from '../examples/stacked-modals-example.vue'
</script>

<template>
  <section id="examples" aria-label="Интерактивные примеры" class="py-16 sm:py-24 px-4">
    <div class="max-w-5xl mx-auto">
      <p class="text-indigo-400 text-sm font-medium tracking-wide mb-3">Примеры</p>
      <h2 class="text-2xl sm:text-4xl font-bold text-white mb-10 sm:mb-16" style="line-height:1.2">Попробуйте сами —<br>всё работает прямо здесь</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <BasicDialogExample />
        <PromptDialogExample />
        <GuardDialogExample />
        <ToastDemoExample />
        <SidebarDemoExample />
        <StackedModalsExample />
      </div>
    </div>
  </section>
</template>
