<template>
  <div class="scene">
    <svg class="constellation" viewBox="0 0 400 400" fill="none">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Связи между узлами -->
      <g class="edges">
        <!-- Core → Dialog -->
        <line class="edge e1" x1="200" y1="200" x2="120" y2="80" />
        <!-- Core → Toast -->
        <line class="edge e2" x1="200" y1="200" x2="320" y2="110" />
        <!-- Core → Sidebar -->
        <line class="edge e3" x1="200" y1="200" x2="310" y2="290" />
        <!-- Core → Guard -->
        <line class="edge e4" x1="200" y1="200" x2="90" y2="280" />
        <!-- Core → Prompt -->
        <line class="edge e5" x1="200" y1="200" x2="200" y2="60" />

        <!-- Вторичные связи -->
        <line class="edge-secondary" x1="120" y1="80" x2="200" y2="60" />
        <line class="edge-secondary" x1="200" y1="60" x2="320" y2="110" />
        <line class="edge-secondary" x1="320" y1="110" x2="310" y2="290" />
        <line class="edge-secondary" x1="310" y1="290" x2="90" y2="280" />
        <line class="edge-secondary" x1="90" y1="280" x2="120" y2="80" />

        <!-- Третичные (тонкие) -->
        <line class="edge-tertiary" x1="120" y1="80" x2="310" y2="290" />
        <line class="edge-tertiary" x1="200" y1="60" x2="90" y2="280" />
        <line class="edge-tertiary" x1="320" y1="110" x2="90" y2="280" />
      </g>

      <!-- Пульсирующие частицы на рёбрах -->
      <circle class="particle p1" r="1.5" fill="#818cf8" opacity="0.8">
        <animateMotion dur="4s" repeatCount="indefinite" path="M200,200 L120,80" />
      </circle>
      <circle class="particle p2" r="1.5" fill="#c084fc" opacity="0.8">
        <animateMotion dur="5s" repeatCount="indefinite" path="M200,200 L320,110" />
      </circle>
      <circle class="particle p3" r="1.5" fill="#22d3ee" opacity="0.8">
        <animateMotion dur="4.5s" repeatCount="indefinite" path="M200,200 L310,290" />
      </circle>
      <circle class="particle p4" r="1.5" fill="#f43f5e" opacity="0.7">
        <animateMotion dur="5.5s" repeatCount="indefinite" path="M200,200 L90,280" />
      </circle>
      <circle class="particle p5" r="1.5" fill="#fbbf24" opacity="0.7">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M200,200 L200,60" />
      </circle>

      <!-- Узлы -->
      <g filter="url(#glow)">
        <!-- Core — центральный -->
        <circle class="node core-node" cx="200" cy="200" r="10" />
        <circle class="node-ring" cx="200" cy="200" r="16" />

        <!-- Dialog -->
        <circle class="node node-indigo" cx="120" cy="80" r="6" />
        <!-- Prompt -->
        <circle class="node node-amber" cx="200" cy="60" r="5" />
        <!-- Toast -->
        <circle class="node node-purple" cx="320" cy="110" r="6" />
        <!-- Sidebar -->
        <circle class="node node-cyan" cx="310" cy="290" r="5.5" />
        <!-- Guard -->
        <circle class="node node-rose" cx="90" cy="280" r="5" />
      </g>

      <!-- Мелкие звёзды-фон -->
      <circle cx="50" cy="50" r="0.8" fill="white" opacity="0.15" />
      <circle cx="350" cy="45" r="0.6" fill="white" opacity="0.1" />
      <circle cx="370" cy="200" r="0.7" fill="white" opacity="0.12" />
      <circle cx="30" cy="180" r="0.5" fill="white" opacity="0.08" />
      <circle cx="160" cy="350" r="0.7" fill="white" opacity="0.1" />
      <circle cx="250" cy="370" r="0.6" fill="white" opacity="0.08" />
      <circle cx="60" cy="350" r="0.5" fill="white" opacity="0.06" />
      <circle cx="340" cy="360" r="0.8" fill="white" opacity="0.1" />
      <circle cx="180" cy="150" r="0.4" fill="white" opacity="0.08" />
      <circle cx="280" cy="180" r="0.5" fill="white" opacity="0.07" />
    </svg>

    <!-- Лейблы -->
    <span class="label label-core">core</span>
    <span class="label label-dialog">dialog</span>
    <span class="label label-prompt">prompt</span>
    <span class="label label-toast">toast</span>
    <span class="label label-sidebar">sidebar</span>
    <span class="label label-guard">guard</span>
  </div>
</template>

<style scoped>
.scene {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.constellation {
  width: 100%;
  height: 100%;
}

/* Рёбра */
.edge {
  stroke: rgba(99, 102, 241, 0.2);
  stroke-width: 1;
  animation: edge-pulse 4s ease-in-out infinite;
}
.e1 { animation-delay: 0s; stroke: rgba(129, 140, 248, 0.2); }
.e2 { animation-delay: 0.8s; stroke: rgba(192, 132, 252, 0.2); }
.e3 { animation-delay: 1.6s; stroke: rgba(34, 211, 238, 0.2); }
.e4 { animation-delay: 2.4s; stroke: rgba(244, 63, 94, 0.15); }
.e5 { animation-delay: 0.4s; stroke: rgba(251, 191, 36, 0.18); }

.edge-secondary {
  stroke: rgba(255, 255, 255, 0.04);
  stroke-width: 0.5;
  stroke-dasharray: 4 6;
}

.edge-tertiary {
  stroke: rgba(255, 255, 255, 0.02);
  stroke-width: 0.5;
  stroke-dasharray: 2 8;
}

/* Узлы */
.node {
  animation: node-breathe 3s ease-in-out infinite;
}

.core-node {
  fill: #818cf8;
  animation: core-pulse 3s ease-in-out infinite;
}

.node-ring {
  fill: none;
  stroke: rgba(129, 140, 248, 0.2);
  stroke-width: 1;
  animation: ring-expand 3s ease-in-out infinite;
}

.node-indigo { fill: #818cf8; animation-delay: 0.2s; }
.node-purple { fill: #c084fc; animation-delay: 0.6s; }
.node-cyan { fill: #22d3ee; animation-delay: 1.0s; }
.node-amber { fill: #fbbf24; animation-delay: 0.4s; }
.node-rose { fill: #fb7185; animation-delay: 0.8s; }

/* Лейблы */
.label {
  position: absolute;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.05em;
  opacity: 0.35;
  pointer-events: none;
}

.label-core { top: 52%; left: 52%; color: #a5b4fc; opacity: 0.5; }
.label-dialog { top: 16%; left: 22%; color: #a5b4fc; }
.label-prompt { top: 10%; left: 48%; color: #fde68a; }
.label-toast { top: 23%; right: 14%; color: #e9d5ff; }
.label-sidebar { bottom: 24%; right: 16%; color: #a5f3fc; }
.label-guard { bottom: 26%; left: 15%; color: #fda4af; }

/* Animations */
@keyframes edge-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes node-breathe {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

@keyframes core-pulse {
  0%, 100% { r: 10; opacity: 1; }
  50% { r: 12; opacity: 0.85; }
}

@keyframes ring-expand {
  0%, 100% { r: 16; opacity: 0.2; }
  50% { r: 22; opacity: 0.05; }
}
</style>
