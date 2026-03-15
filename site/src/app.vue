<script setup lang="ts">
import DialogRenderer from "./renderers/dialog-renderer.vue";
import ToastRenderer from "./renderers/toast-renderer.vue";
import SidebarRenderer from "./renderers/sidebar-renderer.vue";
import HeroSection from "./sections/hero-section.vue";
import FeaturesSection from "./sections/features-section.vue";
import ExamplesSection from "./sections/examples-section.vue";
import ApiSection from "./sections/api-section.vue";
</script>

<template>
  <!-- Background teleported to body for position:fixed on iOS Safari -->
  <Teleport to="body">
    <div aria-hidden="true" class="bg-gradient-overlay" />
  </Teleport>

  <div class="min-h-screen text-slate-100 font-sans relative">
    <main>
      <HeroSection />
      <FeaturesSection />
      <ExamplesSection />
      <ApiSection />
    </main>

    <footer
      class="border-t border-white/6 py-8 text-center text-slate-500 text-sm"
    >
      <p>Vue-modality — MIT License — {{ new Date().getFullYear() }}</p>
    </footer>

    <!-- Global renderers -->
    <DialogRenderer />
    <ToastRenderer />
    <SidebarRenderer />
  </div>
</template>

<style>
.bg-gradient-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 80% 50% at 20% 10%, rgba(99, 102, 241, 0.2) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168, 85, 247, 0.18) 0%, transparent 60%),
    radial-gradient(ellipse 50% 60% at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 70%);
}
</style>
