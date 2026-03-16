<script setup lang="ts">
const features = [
  {
    title: 'Namespace-очереди',
    desc: 'Dialogs, toasts, sidebars — изолированные стеки. Каждый namespace управляется независимо, без конфликтов.',
    accent: '#6366f1'
  },
  {
    title: 'Guard-система',
    desc: 'Отклонение закрытия через sync/async guards. Идеально для подтверждения несохранённых изменений.',
    accent: '#f43f5e'
  },
  {
    title: 'Prompt-паттерн',
    desc: 'await результата прямо из модального окна. Никакого shared state — просто Promise с типами.',
    accent: '#a855f7'
  },
  {
    title: 'Event bus',
    desc: 'on/emit между модалкой и вызывающим кодом. Типизированные события без лишней связности.',
    accent: '#22d3ee'
  },
  {
    title: 'Type-safe пропсы',
    desc: 'ComponentProps<T> автоматически выводит типы пропсов компонента. Полная TypeScript поддержка.',
    accent: '#fbbf24'
  },
  {
    title: 'Zero dependencies',
    desc: 'Только Vue как peer dependency. Никаких транзитивных зависимостей.',
    accent: '#34d399'
  }
]
</script>

<template>
  <section aria-label="Возможности" class="section">
    <div class="glass-bg" />
    <div class="container">
      <p class="text-indigo-400 text-sm font-medium tracking-wide mb-3">Возможности</p>
      <h2 class="text-2xl sm:text-4xl font-bold text-white mb-10 sm:mb-16" style="line-height:1.2">Всё для профессиональной<br>работы с модальными окнами</h2>

      <div class="grid">
        <div
          v-for="f in features"
          :key="f.title"
          class="item"
        >
          <div class="item-accent" :style="{ background: f.accent }" />
          <h3 class="item-title">{{ f.title }}</h3>
          <p class="item-desc">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 6rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.glass-bg {
  position: absolute;
  inset: 2rem;
  border-radius: 2rem;
  background:
    radial-gradient(ellipse 60% 50% at 20% 30%, rgba(99, 102, 241, 0.06), transparent 70%),
    radial-gradient(ellipse 50% 60% at 80% 70%, rgba(168, 85, 247, 0.05), transparent 70%),
    rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
  pointer-events: none;
}

.container {
  max-width: 64rem;
  margin: 0 auto;
}


.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem 5rem;
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; gap: 2.5rem; }
}

.item {
  padding-left: 1rem;
  position: relative;
}

.item-accent {
  position: absolute;
  left: 0;
  top: 0.2rem;
  width: 3px;
  height: 1.2rem;
  border-radius: 2px;
}

.item-title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.item-desc {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.875rem;
  line-height: 1.7;
}
</style>
