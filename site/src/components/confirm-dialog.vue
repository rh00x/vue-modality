<script setup lang="ts">
import { MODAL_EVENT_PROMPT, type ModalRecord } from '@vue-modality/core'

const props = defineProps<{ modal?: ModalRecord }>()

function select(value: string) {
  props.modal?.emit(MODAL_EVENT_PROMPT, value)
}
</script>

<template>
  <div class="bg-[#0d0d1a]/90 backdrop-blur-xl rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 border border-white/10">
    <h2 class="text-xl font-semibold text-white mb-3">Выбор</h2>
    <p class="text-gray-300 mb-6">Какой фреймворк вы предпочитаете?</p>
    <div class="flex gap-3">
      <button
        class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors cursor-pointer"
        @click="select('Vue 3')"
      >
        Vue 3
      </button>
      <button
        class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors cursor-pointer"
        @click="select('React')"
      >
        React
      </button>
    </div>
  </div>
</template>
