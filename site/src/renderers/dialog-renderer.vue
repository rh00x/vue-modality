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
  background: rgba(0, 0, 0, 0.6);
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}
.dialog-enter-active .dialog-card {
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}
.dialog-leave-active .dialog-card {
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-from .dialog-card {
  opacity: 0;
  transform: translateY(16px);
}
.dialog-leave-to .dialog-card {
  opacity: 0;
  transform: translateY(8px);
}
</style>
