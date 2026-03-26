<script setup lang="ts">
const features = [
  {
    id: 'F-01',
    problem: 'Глобальный стейт для каждой модалки',
    solution: 'NAMESPACE-ОЧЕРЕДИ',
    desc: 'Каждый тип — dialogs, toasts, sidebars — в изолированном стеке. Без конфликтов, без shared state.',
  },
  {
    id: 'F-02',
    problem: 'Пользователь закрыл форму случайно',
    solution: 'GUARD-СИСТЕМА',
    desc: 'Sync/async guards блокируют закрытие. Работает на backdrop, кнопке, программном вызове.',
  },
  {
    id: 'F-03',
    problem: 'Callback hell для получения ответа',
    solution: 'PROMPT-ПАТТЕРН',
    desc: 'await promptDialog<T>() — и получаете типизированный результат. Как window.confirm, только лучше.',
  },
  {
    id: 'F-04',
    problem: 'Пропсы для каждого события',
    solution: 'EVENT BUS',
    desc: 'Типизированный on/emit между модалкой и вызывающим кодом. Без лишней связности.',
  },
  {
    id: 'F-05',
    problem: 'Ручная типизация пропсов',
    solution: 'COMPONENTPROPS<T>',
    desc: 'Автовывод типов пропсов из компонента. Полная TypeScript поддержка из коробки.',
  },
  {
    id: 'F-06',
    problem: 'Лишние зависимости в бандле',
    solution: 'ZERO DEPENDENCIES',
    desc: 'Только Vue как peer dependency. ~3kb gzip. Никаких транзитивных зависимостей.',
  }
]
</script>

<template>
  <section aria-label="Возможности" class="py-20 sm:py-28 px-4 border-t border-border">
    <div class="max-w-[880px] mx-auto">
      <div class="mono-label mb-4 flex items-center gap-3">
        <span class="text-accent">///</span>
        <span>ВОЗМОЖНОСТИ</span>
      </div>
      <h2 class="macro-title text-[clamp(2rem,6vw,3.5rem)] mb-14">
        ПРОБЛЕМЫ,<br>КОТОРЫЕ РЕШЕНЫ
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 border border-border">
        <div
          v-for="(f, i) in features"
          :key="f.solution"
          class="p-5 sm:p-6 border-b border-border"
          :class="{ 'sm:border-r': i % 2 === 0 }"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="mono-label text-accent">{{ f.id }}</span>
          </div>
          <p class="text-muted text-xs font-mono line-through mb-2 uppercase tracking-wide">{{ f.problem }}</p>
          <h3 class="text-white font-mono font-bold text-sm mb-2 tracking-wide">
            {{ f.solution }}
          </h3>
          <p class="text-[#888] text-sm leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
