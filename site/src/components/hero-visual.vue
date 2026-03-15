<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function update() {
  if (typeof window === 'undefined') return
  progress.value = Math.min(1, window.scrollY / (window.innerHeight * 1.2))
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
})
</script>

<template>
  <div class="w-full max-w-2xl mx-auto mt-20 mb-4 px-4">
    <div class="scene" :style="`--p: ${progress}`">
      <div class="stack">
        <!-- Base layer: browser window -->
        <div class="layer layer-0">
          <div class="browser-header">
            <div class="browser-dots">
              <span class="dot dot-red" />
              <span class="dot dot-yellow" />
              <span class="dot dot-green" />
            </div>
            <div class="browser-url">localhost:5173</div>
          </div>
          <div class="browser-body">
            <div class="page-line w-1/3 h-3 mb-3" />
            <div class="page-line w-2/3 h-2 mb-2" />
            <div class="page-line w-1/2 h-2 mb-4" />
            <div class="page-line w-full h-8 mb-3 rounded-lg" />
            <div class="page-line w-3/4 h-2 mb-2" />
            <div class="page-line w-1/2 h-2" />
          </div>
        </div>

        <!-- Layer 1: backdrop -->
        <div class="layer layer-1 glass-backdrop" />

        <!-- Layer 2: modal 1 -->
        <div class="layer layer-2">
          <div class="glass-modal modal-1">
            <div class="modal-title w-1/2 h-3 mb-3" />
            <div class="modal-text w-3/4 h-2 mb-2" />
            <div class="modal-text w-2/3 h-2 mb-4" />
            <div class="flex gap-2 justify-end">
              <div class="modal-btn-secondary" />
              <div class="modal-btn-primary" />
            </div>
          </div>
        </div>

        <!-- Layer 3: backdrop 2 -->
        <div class="layer layer-3 glass-backdrop" />

        <!-- Layer 4: modal 2 -->
        <div class="layer layer-4">
          <div class="glass-modal modal-2">
            <div class="modal-title w-2/5 h-3 mb-3" />
            <div class="modal-text w-3/5 h-2 mb-4" />
            <div class="flex gap-2 justify-end">
              <div class="modal-btn-primary" />
            </div>
          </div>
        </div>

        <!-- Layer 5: toast -->
        <div class="layer layer-5 toast-layer">
          <div class="glass-toast">
            <div class="toast-icon">✓</div>
            <div class="toast-text-bar w-20 h-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene {
  perspective: 1000px;
  perspective-origin: 50% 40%;
}

.stack {
  transform-style: preserve-3d;
  transform: rotateX(12deg) rotateY(-8deg);
  position: relative;
  will-change: transform;
}

/* All layers stacked via grid */
.layer {
  grid-area: 1 / 1;
}

.stack {
  display: grid;
}

/* Base layer — browser window */
.layer-0 {
  transform: translateZ(0);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Spread along Z + shift down on scroll */
.layer-1 { transform: translateZ(calc(var(--p) * 50px)) translateY(calc(var(--p) * 8px)); }
.layer-2 { transform: translateZ(calc(var(--p) * 55px)) translateY(calc(var(--p) * 10px)); }
.layer-3 { transform: translateZ(calc(var(--p) * 100px)) translateY(calc(var(--p) * 18px)); }
.layer-4 { transform: translateZ(calc(var(--p) * 110px)) translateY(calc(var(--p) * 22px)); }
.layer-5 { transform: translateZ(calc(var(--p) * 160px)) translateY(calc(var(--p) * 30px)); }

/* Browser header */
.browser-header {
  background: rgba(30, 30, 40, 0.95);
  padding: 0.6rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.browser-dots { display: flex; gap: 0.35rem; }
.dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; }
.dot-red { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green { background: #28c840; }
.browser-url {
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 0.375rem;
  padding: 0.2rem 0.6rem;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.35);
  font-family: var(--font-mono);
}

/* Browser body */
.browser-body {
  background: rgba(10, 10, 20, 0.95);
  padding: 1.5rem;
  min-height: 18rem;
}
.page-line {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 0.25rem;
}

/* Glass backdrop */
.glass-backdrop {
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  opacity: calc(0.2 + var(--p) * 0.4);
}

/* Glass modal */
.glass-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.75rem;
  padding: 1.25rem;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.modal-1 {
  width: 70%;
  background: rgba(20, 20, 40, 0.97);
  border: 1px solid rgba(99, 102, 241, 0.3);
}
.modal-2 {
  width: 45%;
  background: rgba(30, 20, 50, 0.97);
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.modal-title { background: rgba(255, 255, 255, 0.15); border-radius: 0.25rem; }
.modal-text { background: rgba(255, 255, 255, 0.07); border-radius: 0.25rem; }

.modal-btn-primary {
  width: 3.5rem; height: 1.5rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
}
.modal-btn-secondary {
  width: 3rem; height: 1.5rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Toast */
.toast-layer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1rem;
}

.glass-toast {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(22, 101, 52, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 0.5rem;
  padding: 0.35rem 0.6rem;
  font-size: 0.65rem;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.toast-icon { color: #4ade80; font-size: 0.6rem; }
.toast-text-bar {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.15rem;
  width: 3rem;
  height: 0.4rem;
}
</style>
