<script setup lang="ts">
import { useDialog } from '@vue-modality/core'

const { dialogs } = useDialog()
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="dialogs.length > 0" class="fixed inset-0 z-50">
        <!-- backdrop фейдится вместе с контейнером -->
        <div class="absolute inset-0 bg-black/70" />
        <!-- dialog cards -->
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
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}
.dialog-enter-active .dialog-card,
.dialog-leave-active .dialog-card {
  transition: transform 0.3s ease;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-from .dialog-card {
  transform: translateY(40px);
}
.dialog-leave-to .dialog-card {
  transform: translateY(40px);
}
</style>
