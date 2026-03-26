<script setup lang="ts">
const props = defineProps<{
  level: number
  onPush?: () => void
  onPop?: () => void
}>()
</script>

<template>
  <div class="dialog">
    <div class="dialog-header">
      <span class="font-mono text-xs text-accent tracking-wider">/// LAYER {{ level }}</span>
      <span class="font-mono text-xs text-[#555]">STACK: {{ level }}/3</span>
    </div>
    <div class="dialog-body">
      <h2 class="font-mono text-lg font-bold text-[#EAEAEA] mb-1 uppercase tracking-tight">Слой {{ level }}</h2>
      <p class="text-[#666] text-xs font-mono mb-5 uppercase">Активных диалогов: {{ level }}</p>
      <div class="flex gap-2">
        <button
          v-if="level < 3"
          class="px-4 py-2 border border-border hover:bg-white/[0.04] text-[#888] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          @click="onPush?.()"
        >
          [ + СЛОЙ {{ level + 1 }} ]
        </button>
        <button
          class="px-4 py-2 border border-accent/40 hover:bg-accent/[0.08] text-accent text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          @click="onPop?.()"
        >
          [ POP ]
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  width: 100%;
  max-width: 340px;
  margin: 0 1rem;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #0E0E0E;
}

.dialog-body {
  padding: 20px 16px;
}
</style>
