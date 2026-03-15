<script setup lang="ts">
import { ref } from 'vue'

const features = [
  {
    icon: '🗂️',
    title: 'Namespace-очереди',
    description: 'Dialogs, toasts, sidebars — изолированные стеки. Каждый namespace управляется независимо, без конфликтов.',
    color: '#6366f1'
  },
  {
    icon: '🛡️',
    title: 'Guard-система',
    description: 'Отклонение закрытия через sync/async guards. Идеально для подтверждения несохранённых изменений.',
    color: '#f43f5e'
  },
  {
    icon: '⏳',
    title: 'Prompt-паттерн',
    description: 'await результата прямо из модального окна. Никакого shared state — просто Promise с типами.',
    color: '#a855f7'
  },
  {
    icon: '📡',
    title: 'Event bus',
    description: 'on/emit между модалкой и вызывающим кодом. Типизированные события без лишней связности.',
    color: '#22d3ee'
  },
  {
    icon: '🔒',
    title: 'Type-safe пропсы',
    description: 'ComponentProps<T> generic автоматически выводит типы пропсов компонента. Полная TypeScript поддержка.',
    color: '#fbbf24'
  },
  {
    icon: '📦',
    title: 'Zero dependencies',
    description: 'Только vue как peer dependency. Никаких транзитивных зависимостей — легковесный и предсказуемый.',
    color: '#34d399'
  }
]

const mousePos = ref<Record<string, { x: string; y: string }>>({})

function onMove(e: MouseEvent, key: string) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mousePos.value[key] = {
    x: `${e.clientX - rect.left}px`,
    y: `${e.clientY - rect.top}px`
  }
}

function onLeave(key: string) {
  delete mousePos.value[key]
}
</script>

<template>
  <section aria-label="Возможности" class="py-16 sm:py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl sm:text-4xl font-bold text-white text-center mb-4">Возможности</h2>
      <p class="text-gray-400 text-center mb-10 sm:mb-16 text-sm sm:text-lg">Всё что нужно для профессиональной работы с модальными окнами</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="magic-card group"
          :style="{
            '--accent': feature.color,
            '--mx': mousePos[feature.title]?.x ?? '50%',
            '--my': mousePos[feature.title]?.y ?? '50%',
          }"
          @pointermove="onMove($event, feature.title)"
          @pointerleave="onLeave(feature.title)"
        >
          <!-- Spotlight on hover -->
          <div class="spotlight" />
          <div class="card-content">
            <div class="text-3xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.magic-card {
  position: relative;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  background:
    linear-gradient(rgba(18, 18, 30, 0.95) 0 0) padding-box,
    radial-gradient(
      300px circle at var(--mx) var(--my),
      color-mix(in srgb, var(--accent) 40%, transparent),
      rgba(255, 255, 255, 0.06) 100%
    ) border-box;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  cursor: default;
  transition: box-shadow 0.3s ease;
}

.magic-card:hover {
  box-shadow: 0 0 20px color-mix(in srgb, var(--accent) 8%, transparent);
}

.spotlight {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    350px circle at var(--mx) var(--my),
    color-mix(in srgb, var(--accent) 4%, transparent),
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.magic-card:hover .spotlight {
  opacity: 1;
}

.card-content {
  position: relative;
  padding: 1.5rem;
}
</style>
