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

    <footer class="relative py-8 border-t border-border">
      <div class="max-w-[880px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="font-mono text-xs text-[#666] uppercase tracking-wider">
          VUE-MODALITY /// MIT LICENSE /// {{ new Date().getFullYear() }}
        </p>
        <p class="font-mono text-xs text-[#444]">
          + END TRANSMISSION
        </p>
      </div>
    </footer>

    <DialogRenderer />
    <ToastRenderer />
    <SidebarRenderer />
  </div>
</template>
