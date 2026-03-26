<script setup lang="ts">
import { useSidebarPanel } from '@vue-modality/core'

const { sidebar, closeSidebar } = useSidebarPanel()
</script>

<template>
  <Teleport to="body">
    <Transition name="sidebar">
      <div
        v-if="sidebar"
        class="fixed inset-0 z-50 flex justify-end"
      >
        <!-- backdrop -->
        <div
          class="absolute inset-0 bg-black/60"
          @click="closeSidebar"
        />
        <!-- panel -->
        <div class="relative z-10 h-full w-80 bg-[#111] border-l border-border overflow-y-auto">
          <component
            :is="sidebar.component"
            v-bind="sidebar.props.value"
            :modal="sidebar"
            @close="sidebar.close()"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.25s ease;
}
.sidebar-enter-active .relative,
.sidebar-leave-active .relative {
  transition: transform 0.25s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}
.sidebar-enter-from .relative {
  transform: translateX(100%);
}
.sidebar-leave-to .relative {
  transform: translateX(100%);
}
</style>
