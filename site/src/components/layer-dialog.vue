<script setup lang="ts">
const props = defineProps<{
  level: number
  onPush?: () => void
  onPop?: () => void
}>()

const colors = ['bg-indigo-900', 'bg-purple-900', 'bg-pink-900']
const borders = ['border-indigo-600', 'border-purple-600', 'border-pink-600']
const bg = colors[(props.level - 1) % colors.length]
const border = borders[(props.level - 1) % borders.length]
</script>

<template>
  <div :class="`${bg} border ${border} rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4`">
    <h2 class="text-xl font-semibold text-white mb-2">Слой {{ level }}</h2>
    <p class="text-gray-300 text-sm mb-4">Активных диалогов: {{ level }}</p>
    <div class="flex gap-2">
      <button
        v-if="level < 3"
        class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors cursor-pointer"
        @click="onPush?.()"
      >
        Добавить слой {{ level + 1 }}
      </button>
      <button
        class="px-3 py-1.5 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded-full text-sm transition-colors cursor-pointer"
        @click="onPop?.()"
      >
        Pop
      </button>
    </div>
  </div>
</template>
