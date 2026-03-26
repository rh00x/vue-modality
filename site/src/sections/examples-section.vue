<script setup lang="ts">
import BasicDialogExample from '../examples/basic-dialog-example.vue'
import PromptDialogExample from '../examples/prompt-dialog-example.vue'
import GuardDialogExample from '../examples/guard-dialog-example.vue'
import ToastDemoExample from '../examples/toast-demo-example.vue'
import SidebarDemoExample from '../examples/sidebar-demo-example.vue'
import StackedModalsExample from '../examples/stacked-modals-example.vue'
</script>

<template>
  <section id="examples" aria-label="Интерактивные примеры" class="py-20 sm:py-28 px-4 border-t border-border">
    <div class="max-w-[880px] mx-auto">
      <div class="mono-label mb-4 flex items-center gap-3">
        <span class="text-accent">///</span>
        <span>ПРИМЕРЫ</span>
      </div>
      <h2 class="macro-title text-[clamp(2rem,6vw,3.5rem)] mb-14">
        ВСЁ РАБОТАЕТ<br>ПРЯМО ЗДЕСЬ
      </h2>
    </div>

    <div class="max-w-[1200px] mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
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
