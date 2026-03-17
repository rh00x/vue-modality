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
  <div class="min-h-screen font-sans">
    <main>
      <HeroSection />
      <FeaturesSection />
      <ExamplesSection />
      <ApiSection />
    </main>

    <footer class="relative py-10 text-center text-[#999] text-sm">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <p>Vue-modality — MIT License — {{ new Date().getFullYear() }}</p>
    </footer>

    <DialogRenderer />
    <ToastRenderer />
    <SidebarRenderer />
  </div>
</template>
