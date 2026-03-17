<script setup lang="ts">
const props = defineProps<{
  level: number
  onPush?: () => void
  onPop?: () => void
}>()

const accents = ['indigo', 'purple', 'pink']
const accent = accents[(props.level - 1) % accents.length]
</script>

<template>
  <div class="dialog" :class="`accent-${accent}`">
    <h2 class="font-display text-xl font-bold text-[#171717] mb-1 tracking-tight">Слой {{ level }}</h2>
    <p class="text-[#999] text-sm mb-5">Активных диалогов: {{ level }}</p>
    <div class="flex gap-2">
      <button
        v-if="level < 3"
        class="px-4 py-2 border border-black/[0.08] hover:bg-black/[0.03] text-[#666] text-sm rounded-xl transition-colors cursor-pointer"
        @click="onPush?.()"
      >
        + Слой {{ level + 1 }}
      </button>
      <button
        class="px-4 py-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 text-sm rounded-xl transition-colors cursor-pointer"
        @click="onPop?.()"
      >
        Pop
      </button>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  width: 100%;
  max-width: 340px;
  margin: 0 1rem;
  padding: 24px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
}

.accent-indigo { border-color: rgba(99, 102, 241, 0.3); }
.accent-purple { border-color: rgba(168, 85, 247, 0.3); }
.accent-pink { border-color: rgba(236, 72, 153, 0.3); }
</style>
