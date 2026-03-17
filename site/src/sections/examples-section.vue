<script setup lang="ts">
import BasicDialogExample from '../examples/basic-dialog-example.vue'
import PromptDialogExample from '../examples/prompt-dialog-example.vue'
import GuardDialogExample from '../examples/guard-dialog-example.vue'
import ToastDemoExample from '../examples/toast-demo-example.vue'
import SidebarDemoExample from '../examples/sidebar-demo-example.vue'
import StackedModalsExample from '../examples/stacked-modals-example.vue'
</script>

<template>
  <section id="examples" aria-label="Интерактивные примеры" class="py-20 sm:py-28 px-4 border-t border-black/[0.06]">
    <div class="max-w-[880px] mx-auto">
      <p class="text-accent text-xs uppercase tracking-widest mb-3 font-medium">Примеры</p>
      <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#171717] mb-14 tracking-[-0.03em] leading-tight">
        Всё работает<br>прямо здесь
      </h2>
    </div>

    <div class="max-w-[1200px] mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
