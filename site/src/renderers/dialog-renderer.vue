<script setup lang="ts">
import { useDialog } from '@vue-modality/core'

const { dialogs } = useDialog()
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="dialogs.length > 0" class="fixed inset-0 z-50">
        <!-- Backdrop -->
        <div class="absolute inset-0 backdrop" />
        <!-- Dialog cards -->
        <div
          v-for="(dialog, index) in dialogs"
          :key="dialog.id"
          class="absolute inset-0 flex items-end sm:items-center justify-center"
          :style="{ zIndex: index + 1 }"
          @click.self="dialog.close().catch(() => {})"
        >
          <div class="dialog-card w-full sm:w-auto">
            <component
              :is="dialog.component"
              v-bind="dialog.props.value"
              :modal="dialog"
              @close="dialog.close()"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop {
  background: rgba(0, 0, 0, 0.3);
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.25s ease;
}
.dialog-enter-active .dialog-card {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
}
.dialog-leave-active .dialog-card {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-from .dialog-card {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
.dialog-leave-to .dialog-card {
  opacity: 0;
  transform: scale(0.97) translateY(10px);
}
</style>
