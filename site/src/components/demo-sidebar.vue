<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div class="p-0 h-full flex flex-col">
    <div class="flex items-center justify-between px-5 py-4 border-b border-border">
      <span class="font-mono text-xs text-accent uppercase tracking-wider">/// SIDEBAR</span>
      <button
        class="text-[#555] hover:text-[#EAEAEA] transition-colors text-sm cursor-pointer font-mono"
        @click="emit('close')"
      >
        [X]
      </button>
    </div>
    <div class="px-5 py-4 flex-1">
      <h2 class="font-mono text-sm font-bold text-[#EAEAEA] uppercase tracking-wider mb-4">Боковая панель</h2>
      <p class="text-[#666] text-xs font-mono mb-6 uppercase">Открыта через useSidebarPanel().openSidebar()</p>
      <div class="space-y-2">
        <div class="h-8 bg-white/[0.03] border border-border" />
        <div class="h-8 bg-white/[0.03] border border-border" />
        <div class="h-8 bg-white/[0.03] border border-border" />
      </div>
    </div>
    <div class="px-5 py-3 border-t border-border">
      <span class="font-mono text-xs text-[#444]">+ END PANEL</span>
    </div>
  </div>
</template>
