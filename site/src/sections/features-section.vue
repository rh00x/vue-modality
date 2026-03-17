<script setup lang="ts">
const features = [
  {
    problem: 'Глобальный стейт для каждой модалки',
    solution: 'Namespace-очереди',
    desc: 'Каждый тип — dialogs, toasts, sidebars — в изолированном стеке. Без конфликтов, без shared state.',
  },
  {
    problem: 'Пользователь закрыл форму случайно',
    solution: 'Guard-система',
    desc: 'Sync/async guards блокируют закрытие. Работает на backdrop, кнопке, программном вызове.',
  },
  {
    problem: 'Callback hell для получения ответа',
    solution: 'Prompt-паттерн',
    desc: 'await promptDialog<T>() — и получаете типизированный результат. Как window.confirm, только лучше.',
  },
  {
    problem: 'Пропсы для каждого события',
    solution: 'Event bus',
    desc: 'Типизированный on/emit между модалкой и вызывающим кодом. Без лишней связности.',
  },
  {
    problem: 'Ручная типизация пропсов',
    solution: 'ComponentProps<T>',
    desc: 'Автовывод типов пропсов из компонента. Полная TypeScript поддержка из коробки.',
  },
  {
    problem: 'Лишние зависимости в бандле',
    solution: 'Zero dependencies',
    desc: 'Только Vue как peer dependency. ~3kb gzip. Никаких транзитивных зависимостей.',
  }
]
</script>

<template>
  <section aria-label="Возможности" class="py-20 sm:py-28 px-4 border-t border-black/[0.06]">
    <div class="max-w-[880px] mx-auto">
      <p class="text-accent text-xs uppercase tracking-widest mb-3 font-medium">Возможности</p>
      <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#171717] mb-14 tracking-[-0.03em] leading-tight">
        Проблемы, которые<br>мы решили за вас
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
        <div v-for="f in features" :key="f.solution" class="group">
          <p class="text-[#bbb] text-sm line-through mb-2">{{ f.problem }}</p>
          <h3 class="text-[#171717] font-semibold text-lg mb-2 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {{ f.solution }}
          </h3>
          <p class="text-[#888] text-base leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
