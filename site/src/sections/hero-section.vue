<script setup lang="ts">
import HeroVisual from "../components/hero-visual.vue";
</script>

<template>
  <section
    aria-label="Главная"
    class="min-h-screen flex items-center px-4 py-20 overflow-hidden"
  >
    <div
      class="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      <!-- Left: text -->
      <div
        class="text-center lg:text-left flex flex-col items-center lg:items-start"
      >
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/4 border border-white/8 text-indigo-400 text-xs sm:text-sm mb-6 sm:mb-8"
        >
          <span class="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
          Vue 3 · TypeScript · Zero dependencies
        </div>
        <h1
          class="text-4xl sm:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent hero-title"
        >
          Vue-modality
        </h1>
        <p class="text-sm sm:text-xl text-slate-400 max-w-md lg:max-w-xl mb-10">
          Система модальных окон для Vue 3 с namespace-очередями, guard-системой
          и prompt-паттерном. Только Vue как peer dependency.
        </p>
        <nav
          aria-label="Навигация"
          class="flex flex-row flex-wrap gap-4 items-center"
        >
          <a
            href="https://github.com/rh00x/vue-modality"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 px-6 py-3 bg-white/4 border border-white/8 hover:bg-white/8 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] text-slate-300 rounded-full font-medium transition-all"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            GitHub
          </a>
          <a
            href="#examples"
            class="px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-600 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] text-white rounded-full font-medium transition-all"
          >
            Попробовать →
          </a>
        </nav>
      </div>

      <!-- Right: visual (desktop only) -->
      <HeroVisual class="hidden lg:block" />
    </div>
  </section>
</template>

<style scoped>
.hero-title {
  background-image: linear-gradient(90deg, #818cf8, #a78bfa, #22d3ee, #818cf8);
  background-size: 300% 100%;
  animation: gradient-shift 6s ease infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
